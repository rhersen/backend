const compact = require('lodash/compact');
const fromPairs = require('lodash/frompairs');
const map = require('lodash/map');
const split = require('lodash/split');

const query = require('./query');

function parse(queryString) {
  return fromPairs(
    map(compact(map(split(queryString, '&'), s => /(\w+)=(.*)/.exec(s))), m => [
      m[1],
      m[2],
    ])
  );
}

module.exports = url => {
  let match;

  if ((match = /current\?(.*)/.exec(url))) {
    const params = parse(match[1]);
    return query.current(params.direction);
  }

  if (/current/.test(url)) return query.current();

  if (/ingela/.test(url))
    return query.trains(['Tul', 'Åbe', 'Sub'], '1:30', '1:30');

  if ((match = /departures\?(.*)/.exec(url))) {
    const params = parse(match[1]);

    if (params.locations)
      return query.departures(
        split(params.locations, ','),
        params.since,
        params.until,
        params.direction
      );
  }

  if ((match = /trains\?(.*)/.exec(url))) {
    const params = parse(match[1]);

    if (params.locations)
      return query.trains(
        split(params.locations, ','),
        params.since,
        params.until,
        params.direction
      );
  }

  if ((match = /train.(\d+)/.exec(url))) return query.train(match[1]);
};
