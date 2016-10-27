const http = require('http')

const key = require('./key')
const css = require('./css')

let cache = false

function stations(respond, handleError) {
    if (cache) {
        console.log('cache response')
        respond(cache)
        return
    }

    const postData = query()
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
        console.log('ajax response')
        let body = ''
        incomingResponse.setEncoding('utf8')
        incomingResponse.on('data', chunk => body += chunk)
        incomingResponse.on('end', () => respond(cache = body))
    }
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
     </QUERY>
    </REQUEST>`
}

module.exports = {
    obj: callback => stations(
        body => {
            const trainStations = JSON.parse(body).RESPONSE.RESULT[0].TrainStation
            let obj = {}
            trainStations.forEach(entry => obj[entry.LocationSignature] = entry.AdvertisedShortLocationName)
            callback(obj)
        },
        function handleError(e) {
            callback(e)
        }
    ),
    json: outgoingResponse => stations(
        body => {
            outgoingResponse.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8',
                'Cache-Control': 'no-cache'
            })
            outgoingResponse.write(body)
            outgoingResponse.end()
        },
        function handleError(e) {
            outgoingResponse.writeHead(500, {'Content-Type': 'text/plain'})
            outgoingResponse.end(`problem with request: ${e.message}`)
        }
    )
}
