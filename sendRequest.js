const http = require('http')

module.exports = function (postData, outgoingResponse) {
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
