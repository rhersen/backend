const expect = require('chai').expect;

const getQuery = require('../getQuery');
const filterPendel = require('../filterPendel');

describe('getQuery', () => {
  it('no url', () => {
    const query = getQuery();
    expect(query).to.be.undefined;
  });

  it('ingela', () => {
    const query = getQuery('/ingela');
    expect(query).to.match(/name='AdvertisedTimeAtLocation'/);
    expect(query).to.match(/<EQ name='LocationSignature' value='Tul' .>/);
    expect(query).to.match(
      /<GT name='TimeAtLocation' value='.dateadd.-1:30:00.' .>/
    );
    expect(query).to.match(
      /<LT name='TimeAtLocation' value='.dateadd.1:30:00.' .>/
    );
    expect(query).to.not.match(
      /<LIKE name='AdvertisedTrainIdent' value='..13579/
    );
  });

  describe('current', () => {
    it('without direction', () => {
      const query = getQuery('/current');
      expect(query).to.match(
        /<LT name='TimeAtLocation' value='.dateadd.0:12:00.' .>/
      );
      expect(query).to.not.match(/name='AdvertisedTrainIdent'/);
    });

    it('with direction', () => {
      const query = getQuery('/current?direction=n');
      expect(query).to.match(
        /<LT name='TimeAtLocation' value='.dateadd.0:12:00.' .>/
      );
      expect(query).to.match(
        /<LIKE name='AdvertisedTrainIdent' value='..02468/
      );
    });
  });

  it('train', () => {
    const query = getQuery('/train/1234');
    expect(query).to.match(/<EQ name='AdvertisedTrainIdent' value='1234' .>/);
  });

  describe('trains', () => {
    it('northbound', () => {
      const query = getQuery('/trains?direction=n&locations=Bkb,Rön');
      expect(query).to.match(
        /<LIKE name='AdvertisedTrainIdent' value='..02468/
      );
      expect(query).to.match(/<EQ name='LocationSignature' value='Bkb' .>/);
      expect(query).to.match(/<EQ name='LocationSignature' value='Rön' .>/);
    });

    it('southbound', () => {
      const query = getQuery(
        '/trains?direction=s&locations=Bkb,Jkb&since=0:15&until=1:00'
      );
      expect(query).to.match(
        /<LIKE name='AdvertisedTrainIdent' value='..13579/
      );
      expect(query).to.match(
        /<GT name='TimeAtLocation' value='.dateadd.-0:15:00.' .>/
      );
      expect(query).to.match(
        /<LT name='TimeAtLocation' value='.dateadd.1:00:00.' .>/
      );
    });

    it('both directions', () => {
      const query = getQuery('/trains?locations=Bkb,Rön');
      expect(query).to.not.match(
        /<LIKE name='AdvertisedTrainIdent' value='..02468/
      );
      expect(query).to.not.match(
        /<LIKE name='AdvertisedTrainIdent' value='..13579/
      );
      expect(query).to.match(/<EQ name='LocationSignature' value='Bkb' .>/);
      expect(query).to.match(/<EQ name='LocationSignature' value='Rön' .>/);
    });
  });

  describe('departures', () => {
    it('both directions', () => {
      const query = getQuery('/departures?locations=Bkb,Rön');
      expect(query).to.match(/<EQ name='ActivityType' value='Avgang' .>/);
      expect(query).to.match(/<EQ name='LocationSignature' value='Bkb' .>/);
      expect(query).to.match(/<EQ name='LocationSignature' value='Rön' .>/);
    });
  });
});

describe('pendel', () => {
  it('query', () => {
    const trains = {
      RESPONSE: {
        RESULT: [
          {
            TrainAnnouncement: [
              { LocationSignature: 'Flb' },
              { LocationSignature: 'Tu' },
              { LocationSignature: 'Sod' },
              { LocationSignature: 'Ts' },
              { LocationSignature: 'Sci' },
              { LocationSignature: 'Sol' },
              { LocationSignature: 'Äs' },
            ],
          },
        ],
      },
    };
    const stations = {
      RESPONSE: {
        RESULT: [
          {
            TrainStation: [
              {
                AdvertisedShortLocationName: 'Farsta strand',
                CountyNo: [2, 1],
                Geometry: {
                  SWEREF99TM: 'POINT (677073 6570533)',
                  WGS84: 'POINT (18.1041371217327 59.2367049603428)',
                },
                LocationSignature: 'Fas',
              },
              {
                AdvertisedShortLocationName: 'Flemingsberg',
                CountyNo: [2, 1],
                Geometry: {
                  SWEREF99TM: 'POINT (668892 6532535)',
                  WGS84: 'POINT (17.9317290389689 58.8992532022516)',
                },
                LocationSignature: 'Flb',
              },
              {
                AdvertisedShortLocationName: 'Frösunda',
                CountyNo: [2, 1],
                Geometry: {
                  SWEREF99TM: 'POINT (671076 6584623)',
                  WGS84: 'POINT (18.0103300208132 59.3655259341312)',
                },
                LocationSignature: 'Fsu',
              },
            ],
          },
        ],
      },
    };

    const actual = filterPendel(trains, stations);
    const flb = actual[0];
    expect(flb.LocationSignature).to.equal('Flb');
    expect(flb.AdvertisedShortLocationName).to.equal('Flemingsberg');
    expect(flb.east).to.equal('17.931729038968');
    expect(flb.north).to.equal('58.8992532022516');
  });
});
