const expect = require('chai').expect

const position = require('../position')

describe('position', function () {
    it('x', function () {
        expect(position.x('Cst')).to.equal('central')
        expect(position.x('Sst')).to.equal('central')
        expect(position.x('Nvk')).to.equal('east')
        expect(position.x('Flb')).to.equal('west')
        expect(position.x('Tu')).to.equal('west')
        expect(position.x('Söc')).to.equal('west')
        expect(position.x('Mö')).to.equal('west')
        expect(position.x('Hu')).to.equal('west')
        expect(position.x('Sub')).to.equal('west')
    })

    it('y', function () {
        expect(position.y('Cst')).to.equal(0)
        expect(position.y('Ke')).to.equal(-1)
        expect(position.y('So')).to.equal(-2)
        expect(position.y('Sub')).to.equal(-3)
        expect(position.y('Spå')).to.equal(-5)
        expect(position.y('Mr')).to.equal(-20)
        expect(position.y('Arnc')).to.equal(-22)
        expect(position.y('Äs')).to.equal(3)
        expect(position.y('Sta')).to.equal(4)
        expect(position.y('Fas')).to.equal(5)
        expect(position.y('Hu')).to.equal(6)
    })
})
