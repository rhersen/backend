const query = require('./query')

module.exports = url => {
    let match

    if (/current/.test(url))
        return query.current()

    if (/ingela/.test(url))
        return query.trains('1:30:00', ['Tul', 'Åbe', 'Sub'])

    if (match = /train.(\d\d\d\d)/.exec(url))
        return query.train(match[1])
}
