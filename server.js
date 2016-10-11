const atob = require('atob')

const css = require('./css')
const stations = require('./stations')
const train = require('./train')

function requestListener(incomingRequest, outgoingResponse) {
    const url = decodeURIComponent(incomingRequest.url)

    if (/favicon.ico/.test(url))
        favicon(outgoingResponse)
    else
        train(outgoingResponse)
}

function favicon(response) {
    response.writeHead(200, {'Content-Type': 'image/x-icon'})
    response.end(atob('iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T'))
}

require('http').createServer(requestListener).listen(1339, '127.0.0.1')
