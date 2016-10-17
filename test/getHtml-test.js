const expect = require('chai').expect

const getHtml = require('../getHtml')

describe('getHtml', function () {
    it('shows title', function () {
        expect(getHtml()).to.match(/<title>Pendeltåg<.title>/)
    })

    const announcements = [{
        'ActivityType': 'Ankomst',
        'AdvertisedTimeAtLocation': '2016-06-28T21:52:00',
        'AdvertisedTrainIdent': '2769',
        'LocationSignature': 'Åbe',
        'ToLocation': [{'LocationName': 'Söc', 'Priority': 1, 'Order': 0}],
        'TimeAtLocation': '2016-06-28T21:57:00'
    }, {
        'ActivityType': 'Ankomst',
        'AdvertisedTimeAtLocation': '2016-06-28T22:19:00',
        'AdvertisedTrainIdent': '2870',
        'LocationSignature': 'Åbe',
        'ToLocation': [{'LocationName': 'Spå', 'Priority': 1, 'Order': 0}],
        'TimeAtLocation': '2016-06-28T22:20:00'
    }, {
        'ActivityType': 'Ankomst',
        'AdvertisedTimeAtLocation': '2016-06-28T22:10:00',
        'AdvertisedTrainIdent': '2868',
        'LocationSignature': 'Spå',
        'ToLocation': [{'LocationName': 'Spå', 'Priority': 1, 'Order': 0}],
        'TimeAtLocation': '2016-06-28T22:08:00'
    }, {
        'ActivityType': 'Ankomst',
        'AdvertisedTimeAtLocation': '2016-06-28T22:10:00',
        'AdvertisedTrainIdent': '2866',
        'LocationSignature': 'Spå',
        'ToLocation': [{'LocationName': 'Spå', 'Priority': 1, 'Order': 0}],
        'TimeAtLocation': '2016-06-28T22:09:00'
    }, {
        'ActivityType': 'Avgang',
        'AdvertisedTimeAtLocation': '2016-06-28T22:06:00',
        'AdvertisedTrainIdent': '2864',
        'LocationSignature': 'Sub',
        'ToLocation': [{'LocationName': 'Spå', 'Priority': 1, 'Order': 0}],
        'TimeAtLocation': '2016-06-28T22:06:00'
    }]

    it('arrival three minutes late', function () {
        expect(getHtml(announcements)).to.match(/Tåg 2769 mot Söc ankom till Åbe 5 minuter försenat klockan 21:57/)
    })

    it('departure one minute late', function () {
        expect(getHtml(announcements)).to.match(/Tåg 2870 mot Spå ankom till Åbe nästan i tid klockan 22:20/)
    })

    it('early arrival', function () {
        expect(getHtml(announcements)).to.match(/Tåg 2868 mot Spå ankom till Spå i god tid klockan 22:08/)
    })

    it('one minute is not really early arrival', function () {
        expect(getHtml(announcements)).to.match(/Tåg 2866 mot Spå ankom till Spå i tid klockan 22:09/)
    })

    it('departure on time', function () {
        expect(getHtml(announcements)).to.match(/Tåg 2864 mot Spå avgick från Sub i tid klockan 22:06/)
    })
})
