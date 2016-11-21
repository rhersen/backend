const key = require('./key')

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

function current() {
    return announcementQuery(`
        <GT name='TimeAtLocation' value='$dateadd(-0:12:00)' />
        <LT name='TimeAtLocation' value='$dateadd(0:12:00)' />`)
}
function ingela() {
    return announcementQuery(`
        <OR>
          <EQ name='LocationSignature' value='Tul' />
          <EQ name='LocationSignature' value='Åbe' />
          <EQ name='LocationSignature' value='Sub' />
        </OR>
        <GT name='AdvertisedTimeAtLocation' value='$dateadd(-0:28:00)' />
        <LT name='AdvertisedTimeAtLocation' value='$dateadd(0:28:00)' />`
    )
}

module.exports = {
    current: current,
    ingela: ingela
}