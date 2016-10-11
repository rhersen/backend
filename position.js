const includes = require('lodash.includes')

const nw = ['Sub', 'Spå', 'Bkb', 'Jkb', 'Khä', 'Kän', 'Bro', 'Bål']
const ne = ['So', 'Udl', 'Hel', 'Sol', 'Hgv', 'Nvk', 'R', 'Upv', 'Rs', 'Mr', 'Arnc', 'Kn', 'U']
const centrals = ['Äs', 'Åbe', 'Sst', 'Cst', 'Ke']
const sw = ['Sta', 'Hu', 'Flb', 'Tul', 'Tu', 'Rön', 'Öte', 'Söd', 'Söc', 'Söu', 'Jn', 'Mö', 'Gn']
const se = ['Fas', 'Tåd', 'Skg', 'Hnd', 'Jbo', 'Vhe', 'Kda', 'Ts', 'Hfa', 'Ssä', 'Öso', 'Ngd', 'Gdv', 'Nyh']

function x(location) {
    if (includes(sw, location)) return 'west'
    if (includes(nw, location)) return 'west'
    if (includes(centrals, location)) return 'central'
    return 'east'
}

function y(location) {
    let number = centrals.indexOf(location)
    if (number != -1) return 3 - number

    number = nw.indexOf(location)
    if (number != -1) return -3 - 2 * number

    number = ne.indexOf(location)
    if (number != -1) return -2 - 2 * number

    number = sw.indexOf(location)
    if (number != -1) return 4 + 2 * number

    number = se.indexOf(location)
    if (number != -1) return 5 + 2 * number
}

module.exports = {
    x: x,
    y: y
}

