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
function ingela(time, locations) {
    return announcementQuery(`
        <OR> ${locations.map(location => `<EQ name='LocationSignature' value='${location}' />`).join(' ')} </OR>
        <OR>
         <AND>
          <GT name='AdvertisedTimeAtLocation' value='$dateadd(-${time})' />
          <LT name='AdvertisedTimeAtLocation' value='$dateadd(${time})' />
         </AND>
         <AND>
          <GT name='EstimatedTimeAtLocation' value='$dateadd(-${time})' />
          <LT name='EstimatedTimeAtLocation' value='$dateadd(${time})' />
         </AND>
         <AND>
          <GT name='TimeAtLocation' value='$dateadd(-${time})' />
          <LT name='TimeAtLocation' value='$dateadd(${time})' />
         </AND>
        </OR>`
    )
}

function train(id) {
    return announcementQuery(`
        <EQ name='AdvertisedTrainIdent' value='${id}' />
        <GT name='TimeAtLocation' value='$dateadd(-0:12:00)' />
        <LT name='TimeAtLocation' value='$dateadd(0:12:00)' />`
    )
}

module.exports = {
    current: current,
    ingela: ingela,
    train: train
}