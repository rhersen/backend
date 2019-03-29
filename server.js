const atob = require('atob');

const sl = require('./sl');
const sendRequest = require('./sendRequest');
const pendel = require('./pendel');
const stations = require('./stations');
const getQuery = require('./getQuery');

function requestListener(incomingRequest, outgoingResponse) {
  const url = decodeURIComponent(incomingRequest.url);
  const q = getQuery(url);
  const { origin } = incomingRequest.headers;

  const allowOrigin = /http:..\w+.hersen.net/.test(origin)
    ? { 'Access-Control-Allow-Origin': origin }
    : {};

  const head = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-cache',
    ...allowOrigin,
  };

  if (q) {
    sendRequest(q, outgoingResponse, head);
  } else if (/pendel/.test(url)) pendel.json(outgoingResponse, head);
  else if (/stations/.test(url)) stations.json(outgoingResponse, head);
  else if (sl.query(url)) sl.json(sl.query(url), outgoingResponse, head);
  else favicon(outgoingResponse);
}

function favicon(response) {
  response.writeHead(200, { 'Content-Type': 'image/x-icon' });
  response.end(atob('iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T'));
}

require('http')
  .createServer(requestListener)
  .listen(process.env.PORT || '3000');
