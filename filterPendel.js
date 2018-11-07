const filter = require('lodash/fp/filter');
const includes = require('lodash/fp/includes');
const flow = require('lodash/fp/flow');
const map = require('lodash/fp/map');
const max = require('lodash/fp/max');
const reduce = require('lodash/fp/reduce');
const replace = require('lodash/fp/replace');
const uniq = require('lodash/fp/uniq');

const lineData = require('./LineData');

module.exports = (trains, stations) => {
  const locations = flow(
    map('LocationSignature'),
    uniq
  )(get(trains, 'TrainAnnouncement'));

  return flow(
    filter(station => includes(station.LocationSignature, locations)),
    map(eastNorth)
  )(get(stations, 'TrainStation'));

  function eastNorth(station) {
    const sites = reduce(
      (found, name) => {
        if (found) {
          return found;
        }
        const matches = filter(
          site => site.SiteName === name(station),
          lineData.ResponseData.Result
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

    const siteId = flow(
      map(site => {
        const id = site.SiteId;
        return id.length > 4 ? id.substr(id.length - 4) : id;
      }),
      max
    )(sites);

    const match = /POINT \(([\d\\.]+) ([\d\\.]+)\)/.exec(
      station.Geometry.WGS84
    );
    return { ...station, east: match[1], north: match[2], siteId };
  }
};

function get(trafikinfo, field) {
  return trafikinfo.RESPONSE.RESULT[0][field];
}
