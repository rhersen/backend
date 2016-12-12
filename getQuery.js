const query = require('./query')

module.exports = url => {
    let match

    if (/current/.test(url))
        return query.current()

    if (/ingela/.test(url))
        return query.trains('1:30:00', ['Tul', 'Åbe', 'Sub'])

    if (match = /trains\?locations=([a-zA-ZåäöÅÄÖ,]+)/.exec(url))
        return query.trains('1:00:00', match[1].split(','))

    if (match = /trains\?direction=([ns])&locations=([a-zA-ZåäöÅÄÖ,]+)/.exec(url))
        return query.trains('1:00:00', match[2].split(','), match[1])

    if (match = /trains.?([ns]?)\?([a-zA-ZåäöÅÄÖ,]+)/.exec(url))
        return query.trains('1:00:00', match[2].split(','), match[1])

    if (match = /train.(\d\d\d\d)/.exec(url))
        return query.train(match[1])
}
