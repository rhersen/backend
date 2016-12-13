const fromPairs = require('lodash.frompairs')

const query = require('./query')

function parse(queryString) {
    return fromPairs(queryString
        .split('&')
        .map(s => /(\w+)=(.*)/.exec(s))
        .map(m => [m[1], m[2]]))
}

module.exports = url => {
    let match

    if (/current/.test(url))
        return query.current()

    if (/ingela/.test(url))
        return query.trains('1:30:00', ['Tul', 'Åbe', 'Sub'])

    if (match = /trains\?(.*)/.exec(url)) {
        const params = parse(match[1])
        return query.trains('1:00:00', params.locations.split(','), params.direction)
    }

    if (match = /train.(\d\d\d\d)/.exec(url))
        return query.train(match[1])
}
