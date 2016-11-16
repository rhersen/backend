const atob = require('atob')

const stations = require('./stations')
const announcements = require('./announcements')

function requestListener(incomingRequest, outgoingResponse) {
    const url = decodeURIComponent(incomingRequest.url)

    if (/current/.test(url))
        announcements.current(outgoingResponse)
    else if (/ingela/.test(url))
        announcements.ingela(outgoingResponse)
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
