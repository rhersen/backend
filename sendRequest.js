const request = require('superagent');

module.exports = async (postData, outgoingResponse) => {
  try {
    const response = await request
      .post('http://api.trafikinfo.trafikverket.se/v1.2/data.json')
      .type('xml')
      .send(postData);

    const head = {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-cache'
    };

    outgoingResponse.writeHead(200, head);
    outgoingResponse.write(response.text);
    outgoingResponse.end();
  } catch (e) {
    outgoingResponse.writeHead(500, { 'Content-Type': 'text/plain' });
    outgoingResponse.end(`problem with request: ${e.message}`);
  }
};
