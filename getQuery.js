const compact = require('lodash/fp/compact');
const find = require('lodash/fp/find');
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

const currentDirection = {
  regExp: /current\?(.*)/,
  getQuery: function(url) {
    return query.current(parse(this.regExp.exec(url)[1]).direction);
  },
};

const current = {
  regExp: /current/,
  getQuery: () => query.current(),
};

const ingela = {
  regExp: /ingela/,
  getQuery: () => query.trains(['Tul', 'Åbe', 'Sub'], '1:30', '1:30'),
};

const departures = {
  regExp: /departures\?(.*)/,
  getQuery: function(url) {
    const params = parse(this.regExp.exec(url)[1]);

    return query.departures(
      split(',', params.locations),
      params.since,
      params.until,
      params.type,
      params.direction
    );
  },
};

const trains = {
  regExp: /trains\?(.*)/,
  getQuery: function(url) {
    const params = parse(this.regExp.exec(url)[1]);

    return query.trains(
      split(',', params.locations),
      params.since,
      params.until,
      params.direction
    );
  },
};

const train = {
  regExp: /train.(\d+)/,
  getQuery: function(url) {
    return query.train(this.regExp.exec(url)[1]);
  },
};

function getQuery(url) {
  const objs = [currentDirection, current, ingela, departures, trains, train];
  const found = find(obj => obj.regExp.test(url), objs);

  return found && found.getQuery(url);
}

module.exports = getQuery;
