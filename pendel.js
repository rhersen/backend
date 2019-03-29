/* eslint-disable no-console */
const filterPendel = require('./filterPendel');
const cache = require('./cache');

module.exports = {
  json: async function(outgoingResponse, head) {
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
      outgoingResponse.writeHead(200, head);
      outgoingResponse.write(body);
      outgoingResponse.end();
    }
  },
};
