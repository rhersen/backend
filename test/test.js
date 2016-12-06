const expect = require('chai').expect

const getQuery = require('../getQuery')

describe('getQuery', function () {
    it('no url', function () {
        const query = getQuery()
        expect(query).to.be.undefined
    })

    it('ingela', function () {
        const query = getQuery('/ingela')
        expect(query).to.match(/name='AdvertisedTimeAtLocation'/)
        expect(query).to.match(/<EQ name='LocationSignature' value='Tul' .>/)
        expect(query).to.not.match(/<LIKE name='AdvertisedTrainIdent' value='..13579/)
    })

    it('current', function () {
        const query = getQuery('/current')
        expect(query).to.match(/<LT name='TimeAtLocation' value='.dateadd.0:12:00.' .>/)
        expect(query).to.not.match(/name='AdvertisedTrainIdent'/)
    })

    it('train', function () {
        const query = getQuery('/train/1234')
        expect(query).to.match(/<EQ name='AdvertisedTrainIdent' value='1234' .>/)
    })

    it('trains northbound', function () {
        const query = getQuery('/trains/n?Bkb,Rön')
        expect(query).to.match(/<LIKE name='AdvertisedTrainIdent' value='..02468/)
        expect(query).to.match(/<EQ name='LocationSignature' value='Bkb' .>/)
        expect(query).to.match(/<EQ name='LocationSignature' value='Rön' .>/)
    })

    it('trains southbound', function () {
        const query = getQuery('/trains/s?Bkb,Jkb')
        expect(query).to.match(/<LIKE name='AdvertisedTrainIdent' value='..13579/)
        expect(query).to.match(/<LT name='TimeAtLocation' value='.dateadd.1:00:00.' .>/)
    })
})
