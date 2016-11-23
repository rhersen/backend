const atob = require('atob')

const sendRequest = require('./sendRequest')
const stations = require('./stations')
const query = require('./query')

function requestListener(incomingRequest, outgoingResponse) {
    let match
    const url = decodeURIComponent(incomingRequest.url)

    if (/current/.test(url))
        sendRequest(query.current(), outgoingResponse)
    else if (/ingela/.test(url))
        sendRequest(query.ingela(), outgoingResponse)
    else if (match = /train.(\d\d\d\d)/.exec(url))
        sendRequest(query.train(match[1]), outgoingResponse)
    else if (/stations/.test(url))
        stations.json(outgoingResponse)
    else
        favicon(outgoingResponse)
}

function favicon(response) {
    response.writeHead(200, {'Content-Type': 'image/x-icon'})
    response.end(atob('iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T'))
}

require('http').createServer(requestListener).listen(1337, '127.0.0.1')
