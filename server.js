const atob = require('atob')

const sl = require('./sl')
const sendRequest = require('./sendRequest')
const stations = require('./stations')
const getQuery = require('./getQuery')

function requestListener(incomingRequest, outgoingResponse) {
    const url = decodeURIComponent(incomingRequest.url)
    const q = getQuery(url)

    if (q)
        sendRequest(q, outgoingResponse)
    else if (/stations/.test(url))
        stations.json(outgoingResponse)
    else if (sl.query(url))
        sl.json(sl.query(url), outgoingResponse)
    else
        favicon(outgoingResponse)
}

function favicon(response) {
    response.writeHead(200, {'Content-Type': 'image/x-icon'})
    response.end(atob('iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T'))
}

require('http').createServer(requestListener).listen(1337, '127.0.0.1')
