/* eslint-disable no-console */
const request = require('superagent');
const filterPendel = require('./filterPendel');
const key = require('./key');

const cache = {
  trains: false,
  stations: false,
  lineData: false,
};

async function getStations() {
  try {
    if (!cache.stations) {
      const stations = await request
        .post('http://api.trafikinfo.trafikverket.se/v1.2/data.json')
        .type('xml')
        .send(stationQuery());
      cache.stations = JSON.parse(stations.text);
    }
  } catch (e) {
    console.log(e);
    cache.stations = false;
  }

  return cache.stations;

  function stationQuery() {
    return `<REQUEST>
     <LOGIN authenticationkey='${key.trafikverket}' />
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
      <INCLUDE>AdvertisedLocationName</INCLUDE>
      <INCLUDE>AdvertisedShortLocationName</INCLUDE>
      <INCLUDE>Geometry</INCLUDE>
     </QUERY>
    </REQUEST>`;
  }
}

async function getTrains() {
  try {
    if (!cache.trains) {
      const trains = await request
        .post('http://api.trafikinfo.trafikverket.se/v1.2/data.json')
        .type('xml')
        .send(trainQuery());
      cache.trains = JSON.parse(trains.text);
    }
  } catch (e) {
    console.log(e);
    cache.trains = false;
  }

  return cache.trains;

  function trainQuery() {
    return `<REQUEST>
     <LOGIN authenticationkey='${key.trafikverket}' />
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
}

async function getLineData() {
  try {
    if (!cache.lineData) {
      const lineData = await request.get(
        `https://api.sl.se/api2/LineData.json?model=site&key=${
          key.slSites
        }&DefaultTransportModeCode=TRAIN`
      );
      cache.lineData = JSON.parse(lineData.text);
    }
  } catch (e) {
    console.log(e);
    cache.lineData = false;
  }

  return cache.lineData;
}

module.exports = {
  json: async function(outgoingResponse) {
    try {
      respond(
        JSON.stringify(
          filterPendel(
            await getTrains(),
            await getStations(),
            await getLineData()
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
