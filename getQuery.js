const compact = require('lodash/fp/compact');
const fromPairs = require('lodash/fp/frompairs');
const map = require('lodash/fp/map');
const pipe = require('lodash/fp/pipe');
const split = require('lodash/fp/split');

const query = require('./query');

const parse = pipe(
  split('&'),
  map(s => /(\w+)=(.*)/.exec(s)),
  compact,
  map(m => m.slice(1)),
  fromPairs
);

module.exports = url => {
  let match;

  if ((match = /current\?(.*)/.exec(url)))
    return query.current(parse(match[1]).direction);

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
