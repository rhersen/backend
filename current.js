const http = require('http')

const announcementQuery = require('./announcementQuery')
const getHtml = require('./getHtml')
const stations = require('./stations')

let stationNames = false

function current(outgoingResponse, respond) {
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
        incomingResponse.on('end', () => respond(body))
    }

    function handleError(e) {
        outgoingResponse.writeHead(500, {'Content-Type': 'text/plain'})
        outgoingResponse.end(`problem with request: ${e.message}`)
    }
}

module.exports = {
    html: outgoingResponse => current(outgoingResponse, body => {
        const announcements = JSON.parse(body).RESPONSE.RESULT[0].TrainAnnouncement
        outgoingResponse.writeHead(200, {'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache'})
        outgoingResponse.write(getHtml(announcements, stationNames))
        outgoingResponse.end()
    }),
    json: outgoingResponse => current(outgoingResponse, body => {
        outgoingResponse.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-cache'
        })
        outgoingResponse.write(body)
        outgoingResponse.end()
    })
}
