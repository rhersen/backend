const filter = require('lodash/fp/filter');
const includes = require('lodash/fp/includes');
const map = require('lodash/fp/map');
const uniq = require('lodash/fp/uniq');

module.exports = (trains, stations) => {
  const locations = uniq(
    map('LocationSignature', get(trains, 'TrainAnnouncement'))
  );

  return map(
    parseGeometry,
    filter(includesLocation, get(stations, 'TrainStation'))
  );

  function parseGeometry(station) {
    const match = /POINT \(([\d\\.]+) ([\d\\.]+)\)/.exec(
      station.Geometry.WGS84
    );
    return { ...station, east: match[1], north: match[2] };
  }

  function includesLocation(station) {
    return includes(station.LocationSignature, locations);
  }
};

function get(trafikinfo, field) {
  return trafikinfo.RESPONSE.RESULT[0][field];
}
