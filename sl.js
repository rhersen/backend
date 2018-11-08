const request = require('superagent');

const key = require('./key').slRealtime;

module.exports = {
  query: url => {
    const match = /locations=(\d+)/.exec(url);
    if (match)
      return (
        '/api2/realtimedeparturesV4.json' +
        `?key=${key}&siteid=${match[1]}&timewindow=60`
      );
  },
  json: async (query, outgoingResponse) => {
    try {
      const res = await request.get(`http://api.sl.se/v1.2/data.json/${query}`);

      outgoingResponse.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache',
      });

      outgoingResponse.write(res.text);
      outgoingResponse.end();
    } catch (e) {
      outgoingResponse.writeHead(500, { 'Content-Type': 'text/plain' });
      outgoingResponse.end(`problem with request: ${e.message}`);
    }
  },
};
