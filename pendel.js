const request = require('superagent');
const filterPendel = require('./filterPendel');
const key = require('./key').trafikverket;

let cache = false;

module.exports = {
  json: async function(outgoingResponse) {
    if (cache) {
      respond(cache, outgoingResponse);
      return;
    }

    try {
      const stations = await request
        .post('http://api.trafikinfo.trafikverket.se/v1.2/data.json')
        .type('xml')
        .send(stationQuery());

      const trains = await request
        .post('http://api.trafikinfo.trafikverket.se/v1.2/data.json')
        .type('xml')
        .send(trainQuery());

      respond(
        (cache = JSON.stringify(
          filterPendel(JSON.parse(trains.text), JSON.parse(stations.text))
        )),
        outgoingResponse
      );
    } catch (e) {
      outgoingResponse.writeHead(500, { 'Content-Type': 'text/plain' });
      outgoingResponse.end(`problem with request: ${e.message}`);
    }

    function respond(body) {
      outgoingResponse.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache'
      });
      outgoingResponse.write(body);
      outgoingResponse.end();
    }
  }
};

function stationQuery() {
  return `<REQUEST>
     <LOGIN authenticationkey='${key}' />
     <QUERY objecttype='TrainStation'>
      <FILTER>
       <OR>
         <IN name='CountyNo' value='1' />
         <IN name='CountyNo' value='2' />
         <IN name='CountyNo' value='3' />
         <IN name='CountyNo' value='4' />
       </OR>
      </FILTER>
      <INCLUDE>LocationSignature</INCLUDE>
      <INCLUDE>AdvertisedShortLocationName</INCLUDE>
      <INCLUDE>CountyNo</INCLUDE>
     </QUERY>
    </REQUEST>`;
}

function trainQuery() {
  return `<REQUEST>
     <LOGIN authenticationkey='${key}' />
     <QUERY objecttype='TrainAnnouncement' lastmodified='true' orderby='AdvertisedTimeAtLocation'>
      <FILTER>
       <AND>
        <IN name='ProductInformation' value='Pendeltåg' />
        <EQ name='ActivityType' value='Avgang' />
        <GT name='AdvertisedTimeAtLocation' value='$dateadd(0:00:00)' />
        <LT name='AdvertisedTimeAtLocation' value='$dateadd(0:59:00)' />
       </AND>
      </FILTER>
      <INCLUDE>LocationSignature</INCLUDE>
     </QUERY>
    </REQUEST>`;
}
