const request = require('superagent');

const key = require('./key').sl;

function send(query, respond, handleError) {
  request
    .get('http://api.sl.se/v1.2/data.json/' + query)
    .end((err, res) => (err ? handleError(err) : respond(res.text)));
}

module.exports = {
  query: url => {
    let match = /locations=(\d+)/.exec(url);
    if (match)
      return (
        '/api2/realtimedeparturesV4.json' +
        `?key=${key}&siteid=${match[1]}&timewindow=60`
      );
  },
  json: (query, outgoingResponse) =>
    send(
      query,
      body => {
        outgoingResponse.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-cache'
        });
        outgoingResponse.write(body);
        outgoingResponse.end();
      },
      function handleError(e) {
        outgoingResponse.writeHead(500, { 'Content-Type': 'text/plain' });
        outgoingResponse.end(`problem with request: ${e.message}`);
      }
    )
};
