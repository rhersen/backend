const filter = require('lodash/fp/filter');
const includes = require('lodash/fp/includes');
const pipe = require('lodash/fp/pipe');
const map = require('lodash/fp/map');
const uniq = require('lodash/fp/uniq');

module.exports = (trains, stations) => {
  const locations = pipe(map('LocationSignature'), uniq)(
    get(trains, 'TrainAnnouncement')
  );

  return pipe(
    filter(station => includes(station.LocationSignature, locations)),
    map(station => {
      const match = /POINT \(([\d\\.]+) ([\d\\.]+)\)/.exec(
        station.Geometry.WGS84
      );
      return { ...station, east: match[1], north: match[2] };
    })
  )(get(stations, 'TrainStation'));
};

function get(trafikinfo, field) {
  return trafikinfo.RESPONSE.RESULT[0][field];
}
