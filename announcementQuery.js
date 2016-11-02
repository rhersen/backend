const key = require('./key')

function announcementQuery(filters) {
    return `<REQUEST>
     <LOGIN authenticationkey='${key}' />
     <QUERY objecttype='TrainAnnouncement' lastmodified='true'>
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

module.exports = announcementQuery
