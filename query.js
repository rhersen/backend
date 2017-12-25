const constant = require('lodash/fp/constant');
const map = require('lodash/fp/map');
const key = require('./key').trafikverket;

const includes = [
  'LocationSignature',
  'AdvertisedTrainIdent',
  'AdvertisedTimeAtLocation',
  'Deviation',
  'EstimatedTimeAtLocation',
  'ProductInformation',
  'TimeAtLocation',
  'TrackAtLocation',
  'ToLocation',
  'ViaToLocation',
  'ActivityType',
];

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
      ${map(xml, includes).join('\n')}
     </QUERY>
    </REQUEST>`;

  function xml(include) {
    return `<INCLUDE>${include}</INCLUDE>`;
  }
}

function directionFilter(direction) {
  return `<LIKE name='AdvertisedTrainIdent' value='/[${direction === 'n'
    ? '02468'
    : '13579'}]$/' />`;
}

const departureFilter = constant("<EQ name='ActivityType' value='Avgang' />");

function locationFilter(locations) {
  return `<OR> ${map(equalsLocationSignature, locations).join(' ')} </OR>`;

  function equalsLocationSignature(location) {
    return `<EQ name='LocationSignature' value='${location}' />`;
  }
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
            </OR>`;
}

module.exports = {
  current: direction =>
    direction
      ? announcementQuery([
          directionFilter(direction),
          timeFilter('0:12', '0:12'),
        ])
      : announcementQuery([timeFilter('0:12', '0:12')]),

  trains: (locations, since, until, direction) =>
    direction
      ? announcementQuery([
          directionFilter(direction),
          locationFilter(locations),
          timeFilter(since, until),
        ])
      : announcementQuery([
          locationFilter(locations),
          timeFilter(since, until),
        ]),

  departures: (locations, since, until, direction) =>
    direction
      ? announcementQuery([
          directionFilter(direction),
          locationFilter(locations),
          departureFilter(),
          timeFilter(since, until),
        ])
      : announcementQuery([
          locationFilter(locations),
          departureFilter(),
          timeFilter(since, until),
        ]),

  train: id =>
    announcementQuery([
      `<EQ name='AdvertisedTrainIdent' value='${id}' />`,
      "<GT name='AdvertisedTimeAtLocation' value='$dateadd(-6:00:00)' />",
      "<LT name='AdvertisedTimeAtLocation' value='$dateadd(6:00:00)' />",
    ]),
};
