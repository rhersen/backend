const fromPairs = require('lodash.frompairs')

const query = require('./query')

function parse(queryString) {
    return fromPairs(queryString
        .split('&')
        .map(s => /(\w+)=(.*)/.exec(s))
        .filter(m => m)
        .map(m => [m[1], m[2]]))
}

module.exports = url => {
    let match

    if (match = /current\?(.*)/.exec(url)) {
        const params = parse(match[1])
        return query.current(params.direction)
    }

    if (/current/.test(url))
        return query.current()

    if (/ingela/.test(url))
        return query.trains(['Tul', 'Åbe', 'Sub'], '1:30', '1:30')

    if (match = /departures\?(.*)/.exec(url)) {
        const params = parse(match[1])

        if (params.locations)
            return query.departures(params.locations.split(','), params.since, params.until, params.direction)
    }

    if (match = /trains\?(.*)/.exec(url)) {
        const params = parse(match[1])

        if (params.locations)
            return query.trains(params.locations.split(','), params.since, params.until, params.direction)
    }

    if (match = /train.(\d+)/.exec(url))
        return query.train(match[1])
}
