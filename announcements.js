const http = require('http')

const key = require('./key')

function sendRequest(postData) {
    return outgoingResponse => {
        const options = {
            hostname: 'api.trafikinfo.trafikverket.se',
            port: 80,
            path: '/v1.1/data.json',
            method: 'POST',
            headers: {
                'Content-Length': Buffer.byteLength(postData)
            }
        }

        const outgoingRequest = http.request(options, handleResponse)
        outgoingRequest.on('error', handleError)
        outgoingRequest.write(postData)
        outgoingRequest.end()

        function handleResponse(incomingResponse) {
            let body = ''
            incomingResponse.setEncoding('utf8')
            incomingResponse.on('data', chunk => body += chunk)
            incomingResponse.on('end', () => respond(body))
        }

        function handleError(e) {
            outgoingResponse.writeHead(500, {'Content-Type': 'text/plain'})
            outgoingResponse.end(`problem with request: ${e.message}`)
        }

        function respond(body) {
            const head = {
                'Content-Type': 'application/json; charset=utf-8',
                'Cache-Control': 'no-cache'
            }

            outgoingResponse.writeHead(200, head)
            outgoingResponse.write(body)
            outgoingResponse.end()
        }
    }
}

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

module.exports = {
    current: sendRequest(announcementQuery(`
        <GT name='TimeAtLocation' value='$dateadd(-0:12:00)' />
        <LT name='TimeAtLocation' value='$dateadd(0:12:00)' />`)),

    ingela: sendRequest(announcementQuery(`
        <OR>
          <EQ name='LocationSignature' value='Tul' />
          <EQ name='LocationSignature' value='Åbe' />
          <EQ name='LocationSignature' value='Sub' />
        </OR>
        <GT name='AdvertisedTimeAtLocation' value='$dateadd(-0:28:00)' />
        <LT name='AdvertisedTimeAtLocation' value='$dateadd(0:28:00)' />`
    ))
}
