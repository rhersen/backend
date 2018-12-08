const compact = require('lodash/fp/compact');
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
  const dir = direction === 'n' ? '02468' : '13579';
  return `<LIKE name='AdvertisedTrainIdent' value='/[${dir}]$/' />`;
}

const departureFilter = constant("<EQ name='ActivityType' value='Avgang' />");

function pendelFilter(value = 'Pendeltåg') {
  return `<IN name='ProductInformation' value='${value}' />`;
}

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
    announcementQuery(
      compact([
        pendelFilter(),
        direction && directionFilter(direction),
        timeFilter('0:12', '0:12'),
      ])
    ),

  trains: (locations, since, until, direction) =>
    announcementQuery(
      compact([
        pendelFilter(),
        direction && directionFilter(direction),
        locationFilter(locations),
        timeFilter(since, until),
      ])
    ),

  departures: (locations, since, until, type, direction) =>
    announcementQuery(
      compact([
        pendelFilter(type),
        direction && directionFilter(direction),
        locationFilter(locations),
        departureFilter(),
        timeFilter(since, until),
      ])
    ),

  train: id =>
    announcementQuery([
      `<EQ name='AdvertisedTrainIdent' value='${id}' />`,
      "<GT name='AdvertisedTimeAtLocation' value='$dateadd(-6:00:00)' />",
      "<LT name='AdvertisedTimeAtLocation' value='$dateadd(6:00:00)' />",
    ]),
};
