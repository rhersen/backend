/* eslint-disable no-console */
const filterPendel = require('./filterPendel');
const cache = require('./cache');

module.exports = {
  json: async function(outgoingResponse) {
    try {
      respond(
        JSON.stringify(
          filterPendel(
            await cache.getTrains(),
            await cache.getStations(),
            await cache.getLineData()
          )
        ),
        outgoingResponse
      );
    } catch (e) {
      console.log(e);
      outgoingResponse.writeHead(500, { 'Content-Type': 'text/plain' });
      outgoingResponse.end(`problem with request: ${e.message}`);
    }

    function respond(body) {
      outgoingResponse.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': 'http://localhost:1234',
      });
      outgoingResponse.write(body);
      outgoingResponse.end();
    }
  },
};
