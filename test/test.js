const expect = require('chai').expect

const getQuery = require('../getQuery')
const sl = require('../sl')

describe('getQuery', () => {
    it('no url', () => {
        const query = getQuery()
        expect(query).to.be.undefined
    })

    it('ingela', () => {
        const query = getQuery('/ingela')
        expect(query).to.match(/name='AdvertisedTimeAtLocation'/)
        expect(query).to.match(/<EQ name='LocationSignature' value='Tul' .>/)
        expect(query).to.match(/<GT name='TimeAtLocation' value='.dateadd.-1:30:00.' .>/)
        expect(query).to.match(/<LT name='TimeAtLocation' value='.dateadd.1:30:00.' .>/)
        expect(query).to.not.match(/<LIKE name='AdvertisedTrainIdent' value='..13579/)
    })

    describe('current', () => {
        it('without direction', () => {
            const query = getQuery('/current')
            expect(query).to.match(/<LT name='TimeAtLocation' value='.dateadd.0:12:00.' .>/)
            expect(query).to.not.match(/name='AdvertisedTrainIdent'/)
        })

        it('with direction', () => {
            const query = getQuery('/current?direction=n')
            expect(query).to.match(/<LT name='TimeAtLocation' value='.dateadd.0:12:00.' .>/)
            expect(query).to.match(/<LIKE name='AdvertisedTrainIdent' value='..02468/)
        })
    })

    it('train', () => {
        const query = getQuery('/train/1234')
        expect(query).to.match(/<EQ name='AdvertisedTrainIdent' value='1234' .>/)
    })

    describe('trains', () => {
        it('northbound', () => {
            const query = getQuery('/trains?direction=n&locations=Bkb,Rön')
            expect(query).to.match(/<LIKE name='AdvertisedTrainIdent' value='..02468/)
            expect(query).to.match(/<EQ name='LocationSignature' value='Bkb' .>/)
            expect(query).to.match(/<EQ name='LocationSignature' value='Rön' .>/)
        })

        it('southbound', () => {
            const query = getQuery('/trains?direction=s&locations=Bkb,Jkb&since=0:15&until=1:00')
            expect(query).to.match(/<LIKE name='AdvertisedTrainIdent' value='..13579/)
            expect(query).to.match(/<GT name='TimeAtLocation' value='.dateadd.-0:15:00.' .>/)
            expect(query).to.match(/<LT name='TimeAtLocation' value='.dateadd.1:00:00.' .>/)
        })

        it('both directions', () => {
            const query = getQuery('/trains?locations=Bkb,Rön')
            expect(query).to.not.match(/<LIKE name='AdvertisedTrainIdent' value='..02468/)
            expect(query).to.not.match(/<LIKE name='AdvertisedTrainIdent' value='..13579/)
            expect(query).to.match(/<EQ name='LocationSignature' value='Bkb' .>/)
            expect(query).to.match(/<EQ name='LocationSignature' value='Rön' .>/)
        })
    })

    describe('departures', () => {
        it('both directions', () => {
            const query = getQuery('/departures?locations=Bkb,Rön')
            expect(query).to.match(/<EQ name='ActivityType' value='Avgang' .>/)
            expect(query).to.match(/<EQ name='LocationSignature' value='Bkb' .>/)
            expect(query).to.match(/<EQ name='LocationSignature' value='Rön' .>/)
        })
    })
})

describe('sl', () => {
    it('query', () => {
        expect(sl.query('/sl?locations=9001')).to.match(/api2.realtimedeparturesV4.json\?key=.+&siteid=9001&timewindow=60/)
        expect(sl.query('/sl')).to.be.undefined
    })
})
