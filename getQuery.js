const query = require('./query')

module.exports = url => {
    let q
    let match

    if (/current/.test(url))
        q = query.current()
    else if (/ingela/.test(url))
        q = query.trains('1:30:00', ['Tul', 'Åbe', 'Sub'])
    else if (match = /train.(\d\d\d\d)/.exec(url))
        q = query.train(match[1])
    return q
}
