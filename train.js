const http = require('http')

const foreach = require('lodash.foreach')
const groupby = require('lodash.groupby')
const map = require('lodash.map')
const maxby = require('lodash.maxby')

const announcementQuery = require('./announcementQuery')
const css = require('./css')
const formatLatestAnnouncement = require('./formatLatestAnnouncement')
const position = require('./position')
const stations = require('./stations')

let stationNames = false

function train(outgoingResponse) {
    if (!stationNames)
        stations(data => stationNames = data)

    const postData = announcementQuery(`
        <GT name='TimeAtLocation' value='$dateadd(-0:12:00)' />
        <LT name='TimeAtLocation' value='$dateadd(0:12:00)' />`)

    const options = {
        hostname: 'api.trafikinfo.trafikverket.se',
        port: 80,
        path: '/v1.1/data.json',
        method: 'POST',
        headers: {
            'Content-Length': Buffer.byteLength(postData)
        }
    }

    const outgoingRequest = http.request(options, handleResponse)
    outgoingRequest.on('error', handleError)
    outgoingRequest.write(postData)

    outgoingRequest.end()

    function handleResponse(incomingResponse) {
        let body = ''
        incomingResponse.setEncoding('utf8')
        incomingResponse.on('data', chunk => body += chunk)
        incomingResponse.on('end', done)

        function done() {
            const announcements = JSON.parse(body).RESPONSE.RESULT[0].TrainAnnouncement
            outgoingResponse.writeHead(200, {'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache'})
            outgoingResponse.write('<!DOCTYPE html>')
            outgoingResponse.write('<meta name="viewport" content="width=device-width, initial-scale=1.0" />')
            outgoingResponse.write('<title>Pendeltåg</title>')
            outgoingResponse.write(`<style>${css()}</style>`)

            const latest = map(groupby(announcements, 'AdvertisedTrainIdent'), v => maxby(v, 'TimeAtLocation'))

            foreach(groupby(latest, direction), (trains, dir) => {
                outgoingResponse.write(`<h1>${dir}</h1>`)

                trains.sort((a, b) => position.y(a.LocationSignature) - position.y(b.LocationSignature))

                foreach(trains, announcement => {
                    const s = formatLatestAnnouncement(announcement, stationNames)
                    outgoingResponse.write(`<div class=${position.x(announcement.LocationSignature)}>${s}</div>`)
                })
            })

            outgoingResponse.end()
        }
    }

    function direction(t) {
        return /[13579]$/.test(t.AdvertisedTrainIdent) ? 'söderut' : 'norrut'
    }

    function handleError(e) {
        outgoingResponse.writeHead(500, {'Content-Type': 'text/plain'})
        outgoingResponse.end(`problem with request: ${e.message}`)
    }
}

module.exports = train
