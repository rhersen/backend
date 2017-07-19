const http = require('http')

const key = require('./key').sl

function send(query, respond, handleError) {
    const options = {
        hostname: 'api.sl.se',
        port: 80,
        path: query,
        method: 'GET'
    }

    const outgoingRequest = http.request(options, handleResponse)
    outgoingRequest.on('error', handleError)

    outgoingRequest.end()

    function handleResponse(incomingResponse) {
        let body = ''
        incomingResponse.setEncoding('utf8')
        incomingResponse.on('data', chunk => body += chunk)
        incomingResponse.on(
            'end',
            () => respond(body)
        )
    }
}

module.exports = {
    query: (url) => {
        let match = /locations=(\d+)/.exec(url)
        if (match)
            return `/api2/realtimedeparturesV4.json?key=${key}&siteid=${match[1]}&timewindow=60`
    },
    json: (query, outgoingResponse) => send(
        query,
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
