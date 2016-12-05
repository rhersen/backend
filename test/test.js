const expect = require('chai').expect

const getQuery = require('../getQuery')

describe('getQuery', function () {
    it('no url', function () {
        expect(getQuery()).to.be.undefined
    })

    it('ingela', function () {
        expect(getQuery('/ingela')).to.match(/name='AdvertisedTimeAtLocation'/)
    })

    it('current', function () {
        expect(getQuery('/current')).to.match(/<LT name='TimeAtLocation' value='.dateadd.0:12:00.' .>/)
        expect(getQuery('/current')).to.not.match(/name='AdvertisedTrainIdent'/)
    })

    it('train', function () {
        expect(getQuery('/train/1234')).to.match(/<EQ name='AdvertisedTrainIdent' value='1234' .>/)
    })
})
