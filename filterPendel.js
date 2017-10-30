const includes = require('lodash.includes');
const map = require('lodash.map');
const uniq = require('lodash.uniq');

module.exports = (trains, stations) => {
  const locations = uniq(
    map(get(trains, 'TrainAnnouncement'), 'LocationSignature')
  );

  return get(stations, 'TrainStation').filter(station =>
    includes(locations, station.LocationSignature)
  );
};

function get(trafikinfo, field) {
  return trafikinfo.RESPONSE.RESULT[0][field];
}
