const moment = require('moment')

const foreach = require('lodash.foreach')
const groupby = require('lodash.groupby')
const map = require('lodash.map')
const maxby = require('lodash.maxby')

const css = require('./css')
const formatLatestAnnouncement = require('./formatLatestAnnouncement')
const position = require('./position')

function getHtml(announcements, stationNames) {
    var s = '<!DOCTYPE html>'
    s += (s)
    s += ('<meta name="viewport" content="width=device-width, initial-scale=1.0" />')
    s += ('<title>OBSOLETE</title>')
    s += (`<style>${css()}</style>`)

    const latest = map(groupby(announcements, 'AdvertisedTrainIdent'), v => maxby(v, 'TimeAtLocation'))

    s += (`<h1>OBSOLETE</h1>`)

    foreach(groupby(latest, direction), (trains, dir) => {
        s += (`<h1>${dir}</h1>`)

        trains.sort((a, b) => position.y(a.LocationSignature) - position.y(b.LocationSignature))

        foreach(trains, a => {
            s += (`<div class="${position.x(a.LocationSignature)} ${delay(a)}">${formatLatestAnnouncement(a, stationNames)}</div>`)
        })
    })
    return s
}

function delay(a) {
    var minutes = moment(a.TimeAtLocation).diff(moment(a.AdvertisedTimeAtLocation), 'minutes')
    if (minutes < 1) return 'delay0'
    if (minutes < 2) return 'delay1'
    if (minutes < 4) return 'delay2'
    if (minutes < 8) return 'delay4'
    return 'delay8'
}

function direction(t) {
    return /[13579]$/.test(t.AdvertisedTrainIdent) ? 'söderut' : 'norrut'
}

module.exports = getHtml
