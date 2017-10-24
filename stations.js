const request = require('superagent');

const key = require('./key').trafikverket;

let cache = false;

function stations(respond, handleError) {
  if (cache) {
    respond(cache);
    return;
  }

  const postData = query();

  request
    .post('http://api.trafikinfo.trafikverket.se/v1.2/data.json')
    .type('xml')
    .send(postData)
    .end(
      (err, res) =>
        err
          ? handleError(err)
          : respond(
              (cache = res.text.replace(
                /"POINT \((\d+\.\d+) (\d+\.\d+)\)"/g,
                '{"east":$1,"north":$2}'
              ))
            )
    );
}

function query() {
  return `<REQUEST>
     <LOGIN authenticationkey='${key}' />
     <QUERY objecttype='TrainStation'>
      <FILTER>
       <OR>
         <IN name='CountyNo' value='1' />
         <EQ name='LocationSignature' value='U' />
         <EQ name='LocationSignature' value='Kn' />
         <EQ name='LocationSignature' value='Gn' />
         <EQ name='LocationSignature' value='Bål' />
       </OR>
      </FILTER>
      <INCLUDE>LocationSignature</INCLUDE>
      <INCLUDE>AdvertisedShortLocationName</INCLUDE>
      <INCLUDE>Geometry</INCLUDE>
     </QUERY>
    </REQUEST>`;
}

module.exports = {
  json: outgoingResponse =>
    stations(
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
