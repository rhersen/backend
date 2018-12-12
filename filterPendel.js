const filter = require('lodash/fp/filter');
const flow = require('lodash/fp/flow');
const get = require('lodash/fp/get');
const map = require('lodash/fp/map');
const max = require('lodash/fp/max');
const reduce = require('lodash/fp/reduce');
const replace = require('lodash/fp/replace');

module.exports = (stations, lineData) => {
  return map(eastNorth, result(stations, 'TrainStation'));

  function eastNorth(station) {
    const match = /POINT \(([\d\\.]+) ([\d\\.]+)\)/.exec(
      station.Geometry.WGS84
    );

    return {
      ...station,
      east: match[1],
      north: match[2],
      siteId: siteId(get('ResponseData.Result', lineData)),
    };

    function siteId(allSites) {
      if (!allSites) {
        return;
      }

      const sites = reduce(
        (found, name) => {
          if (found) {
            return found;
          }
          const matches = filter(
            site => site.SiteName === name(station),
            allSites
          );
          if (matches.length) {
            return matches;
          }
        },
        undefined,
        [
          stn => stn.AdvertisedShortLocationName,
          stn => replace(/ C$/, ' central', stn.AdvertisedLocationName),
          stn => replace(/ C$/, ' centralstation', stn.AdvertisedLocationName),
        ]
      );

      return flow(
        map(site => {
          const id = site.SiteId;
          return id.length > 4 ? id.substr(id.length - 4) : id;
        }),
        max
      )(sites);
    }
  }
};

function result(trafikinfo, field) {
  return trafikinfo.RESPONSE.RESULT[0][field];
}
