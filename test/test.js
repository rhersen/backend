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
              {
                LocationSignature: 'Flb',
                ModifiedTime: '2017-10-27T15:05:48.496Z'
              },
              {
                LocationSignature: 'Tu',
                ModifiedTime: '2017-10-26T23:14:18.697Z'
              },
              {
                LocationSignature: 'Sod',
                ModifiedTime: '2017-10-26T23:14:38.014Z'
              },
              {
                LocationSignature: 'Ts',
                ModifiedTime: '2017-10-26T23:14:39.465Z'
              },
              {
                LocationSignature: 'Sci',
                ModifiedTime: '2017-10-27T13:33:55.559Z'
              },
              {
                LocationSignature: 'Sol',
                ModifiedTime: '2017-10-26T23:14:40.604Z'
              },
              {
                LocationSignature: 'Äs',
                ModifiedTime: '2017-10-27T13:29:27.544Z'
              }
            ],
            INFO: {
              LASTMODIFIED: {
                '@datetime': '2017-10-27T15:05:48.496Z'
              }
            }
          }
        ]
      }
    };
    const stations = {
      RESPONSE: {
        RESULT: [
          {
            TrainStation: [
              {
                AdvertisedShortLocationName: 'Farsta strand',
                CountyNo: [2, 1],
                LocationSignature: 'Fas'
              },
              {
                AdvertisedShortLocationName: 'Flemingsberg',
                CountyNo: [2, 1],
                LocationSignature: 'Flb'
              },
              {
                AdvertisedShortLocationName: 'Frösunda',
                CountyNo: [2, 1],
                LocationSignature: 'Fsu'
              }
            ]
          }
        ]
      }
    };

    const expected = [
      {
        AdvertisedShortLocationName: 'Flemingsberg',
        CountyNo: [2, 1],
        LocationSignature: 'Flb'
      }
    ];
    const actual = filterPendel(trains, stations);
    expect(actual).to.deep.equal(expected);
    expect(actual[0]).to.deep.equal(expected[0]);
  });
});
