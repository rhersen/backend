const key = require('./key')

function announcementQuery(filters) {
    return `<REQUEST>
     <LOGIN authenticationkey='${key}' />
     <QUERY objecttype='TrainAnnouncement' lastmodified='true' orderby='AdvertisedTimeAtLocation'>
      <FILTER>
       <AND>
        <IN name='ProductInformation' value='Pendeltåg' />
        <NE name='Canceled' value='true' />
        ${filters.join('\n')}
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

function directionFilter(direction) {
    return `<LIKE name='AdvertisedTrainIdent' value='/[${direction === 'n' ? '02468' : '13579'}]$/' />`
}

function departureFilter() {
    return "<EQ name='ActivityType' value='Avgang' />"
}

function locationFilter(locations) {
    return `<OR> ${locations.map(location => `<EQ name='LocationSignature' value='${location}' />`).join(' ')} </OR>`
}

function timeFilter(since, until) {
    return `<OR>
             <AND>
              <GT name='AdvertisedTimeAtLocation' value='$dateadd(-${since}:00)' />
              <LT name='AdvertisedTimeAtLocation' value='$dateadd(${until}:00)' />
             </AND>
             <AND>
              <GT name='EstimatedTimeAtLocation' value='$dateadd(-${since}:00)' />
              <LT name='EstimatedTimeAtLocation' value='$dateadd(${until}:00)' />
             </AND>
             <AND>
              <GT name='TimeAtLocation' value='$dateadd(-${since}:00)' />
              <LT name='TimeAtLocation' value='$dateadd(${until}:00)' />
             </AND>
            </OR>`
}

module.exports = {
    current: () => announcementQuery([
        "<GT name='TimeAtLocation' value='$dateadd(-0:12:00)' />",
        "<LT name='TimeAtLocation' value='$dateadd(0:12:00)' />"]),

    trains: (locations, since, until, direction) =>
        direction ?
            announcementQuery([directionFilter(direction), locationFilter(locations), timeFilter(since, until)]) :
            announcementQuery([locationFilter(locations), timeFilter(since, until)]),

    departures: (locations, since, until, direction) =>
        direction ?
            announcementQuery([
                directionFilter(direction),
                locationFilter(locations),
                departureFilter(),
                timeFilter(since, until)]) :
            announcementQuery([
                locationFilter(locations),
                departureFilter(),
                timeFilter(since, until)]),

    train: id => announcementQuery([
        `<EQ name='AdvertisedTrainIdent' value='${id}' />`,
        "<GT name='AdvertisedTimeAtLocation' value='$dateadd(-6:00:00)' />",
        "<LT name='AdvertisedTimeAtLocation' value='$dateadd(6:00:00)' />"])
}
