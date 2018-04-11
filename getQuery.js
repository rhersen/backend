const compact = require('lodash/fp/compact');
const fromPairs = require('lodash/fp/fromPairs');
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

function currentDirection(url) {
  const match = /current\?(.*)/.exec(url);

  if (match) return query.current(parse(match[1]).direction);
}

function current(url) {
  if (/current/.test(url)) return query.current();
}

function ingela(url) {
  if (/ingela/.test(url))
    return query.trains(['Tul', 'Åbe', 'Sub'], '1:30', '1:30');
}

function departures(url) {
  const match = /departures\?(.*)/.exec(url);

  if (match) {
    const params = parse(match[1]);

    if (params.locations)
      return query.departures(
        split(',', params.locations),
        params.since,
        params.until,
        params.direction
      );
  }
}

function trains(url) {
  const match = /trains\?(.*)/.exec(url);

  if (match) {
    const params = parse(match[1]);

    if (params.locations)
      return query.trains(
        split(',', params.locations),
        params.since,
        params.until,
        params.direction
      );
  }
}

function train(url) {
  const match = /train.(\d+)/.exec(url);

  if (match) return query.train(match[1]);
}

function getQuery(url) {
  const fs = [currentDirection, current, ingela, departures, trains, train];
  for (let i = 0; i < fs.length; i++) {
    const q = fs[i](url);
    if (q) return q;
  }
}

module.exports = getQuery;
