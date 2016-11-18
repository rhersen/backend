const atob = require('atob')

const sendRequest = require('./sendRequest')
const key = require('./key')
const stations = require('./stations')

function announcementQuery(filters) {
    return `<REQUEST>
     <LOGIN authenticationkey='${key}' />
     <QUERY objecttype='TrainAnnouncement' lastmodified='true' orderBy='AdvertisedTimeAtLocation'>
      <FILTER>
       <AND>
        <IN name='ProductInformation' value='Pendeltåg' />
        <NE name='Canceled' value='true' />
        ${filters}
       </AND>
      </FILTER>
      <INCLUDE>LocationSignature</INCLUDE>
      <INCLUDE>AdvertisedTrainIdent</INCLUDE>
      <INCLUDE>AdvertisedTimeAtLocation</INCLUDE>
      <INCLUDE>EstimatedTimeAtLocation</INCLUDE>
      <INCLUDE>TimeAtLocation</INCLUDE>
      <INCLUDE>ToLocation</INCLUDE>
      <INCLUDE>ActivityType</INCLUDE>
     </QUERY>
    </REQUEST>`
}

function requestListener(incomingRequest, outgoingResponse) {
    const url = decodeURIComponent(incomingRequest.url)

    if (/current/.test(url))
        sendRequest(announcementQuery(`
        <GT name='TimeAtLocation' value='$dateadd(-0:12:00)' />
        <LT name='TimeAtLocation' value='$dateadd(0:12:00)' />`), outgoingResponse)
    else if (/ingela/.test(url))
        sendRequest(announcementQuery(`
        <OR>
          <EQ name='LocationSignature' value='Tul' />
          <EQ name='LocationSignature' value='Åbe' />
          <EQ name='LocationSignature' value='Sub' />
        </OR>
        <GT name='AdvertisedTimeAtLocation' value='$dateadd(-0:28:00)' />
        <LT name='AdvertisedTimeAtLocation' value='$dateadd(0:28:00)' />`
        ), outgoingResponse)
    else if (/stations/.test(url))
        stations.json(outgoingResponse)
    else
        favicon(outgoingResponse)
}

function favicon(response) {
    response.writeHead(200, {'Content-Type': 'image/x-icon'})
    response.end(atob('iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T'))
}

require('http').createServer(requestListener).listen(1339, '127.0.0.1')
