const includes = require('lodash.includes');
const map = require('lodash.map');
const uniq = require('lodash.uniq');

module.exports = (trains, stations) => {
  const locations = uniq(
    map(get(trains, 'TrainAnnouncement'), 'LocationSignature')
  );

  return get(stations, 'TrainStation')
    .filter(station => includes(locations, station.LocationSignature))
    .map(station => {
      const match = /POINT \(([\d\.]+) ([\d\.]+)\)/.exec(
        station.Geometry.WGS84
      );
      return { ...station, east: match[1], north: match[2] };
    });
};

function get(trafikinfo, field) {
  return trafikinfo.RESPONSE.RESULT[0][field];
}
