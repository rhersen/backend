const compact = require('lodash/fp/compact');
const fromPairs = require('lodash/fp/frompairs');
const map = require('lodash/fp/map');
const split = require('lodash/fp/split');

const query = require('./query');

function parse(queryString) {
  return fromPairs(
    map(pair, compact(map(matchParam, split('&', queryString))))
  );

  function pair(m) {
    return m.slice(1);
  }

  function matchParam(s) {
    return /(\w+)=(.*)/.exec(s);
  }
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
        split(',', params.locations),
        params.since,
        params.until,
        params.direction
      );
  }

  if ((match = /trains\?(.*)/.exec(url))) {
    const params = parse(match[1]);

    if (params.locations)
      return query.trains(
        split(',', params.locations),
        params.since,
        params.until,
        params.direction
      );
  }

  if ((match = /train.(\d+)/.exec(url))) return query.train(match[1]);
};
