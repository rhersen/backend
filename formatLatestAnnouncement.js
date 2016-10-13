const moment = require('moment')

function formatLatestAnnouncement(a, stationNames) {
    if (!a)
        return 'Aktuell information saknas'

    const s = a.TimeAtLocation.substring(11, 16)

    return `Tåg ${a.AdvertisedTrainIdent} mot ${to(a)} ${activity(a)} ${location(a)} ${precision(a)} klockan ${ s}`

    function location() {
        return stationNames ? stationNames[a.LocationSignature] : a.LocationSignature
    }

    function to() {
        return a.ToLocation.map(l => stationNames ? stationNames[l.LocationName] : l.LocationName)
    }
}

function activity(a) {
    return a.ActivityType === 'Ankomst' ? 'ankom till' : 'avgick från'
}

function precision(a) {
    const delay = moment(a.TimeAtLocation).diff(moment(a.AdvertisedTimeAtLocation), 'minutes')

    if (delay === 1) return 'nästan i tid'
    if (delay > 0) return `${delay} minuter försenat`
    if (delay < -1) return 'i god tid'

    return 'i tid'
}

module.exports = formatLatestAnnouncement
