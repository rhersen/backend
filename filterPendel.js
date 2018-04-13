const filter = require('lodash/fp/filter');
const includes = require('lodash/fp/includes');
const flow = require('lodash/fp/flow');
const map = require('lodash/fp/map');
const uniq = require('lodash/fp/uniq');

module.exports = (trains, stations) => {
  const locations = flow(map('LocationSignature'), uniq)(
    get(trains, 'TrainAnnouncement')
  );

  return flow(
    filter(station => includes(station.LocationSignature, locations)),
    map(eastNorth)
  )(get(stations, 'TrainStation'));

  function eastNorth(station) {
    const match = /POINT \(([\d\\.]+) ([\d\\.]+)\)/.exec(
      station.Geometry.WGS84
    );
    return { ...station, east: match[1], north: match[2] };
  }
};

function get(trafikinfo, field) {
  return trafikinfo.RESPONSE.RESULT[0][field];
}
