const expect = require('chai').expect

const formatLatestAnnouncement = require('../formatLatestAnnouncement')
const result = [{
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T07:29:00',
    'AdvertisedTrainIdent': '2211',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Tu', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:29:00'
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T07:29:00',
    'AdvertisedTrainIdent': '2211',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Tu', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:30:00'
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T07:29:00',
    'AdvertisedTrainIdent': '12312',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'Khä', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:28:00'
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T07:29:00',
    'AdvertisedTrainIdent': '12312',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'Khä', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:29:00'
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T07:30:00',
    'AdvertisedTrainIdent': '2212',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'U', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:30:00'
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T07:30:00',
    'AdvertisedTrainIdent': '2212',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'U', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:29:00'
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T07:33:00',
    'AdvertisedTrainIdent': '2311',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Äs', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:33:00'
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T07:33:00',
    'AdvertisedTrainIdent': '2311',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Äs', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:32:00'
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T07:34:00',
    'AdvertisedTrainIdent': '2909',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'Tu', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:33:00'
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T07:34:00',
    'AdvertisedTrainIdent': '2909',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'Tu', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:34:00'
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T07:34:00',
    'AdvertisedTrainIdent': '2512',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Kän', 'Priority': 1, 'Order': 0}],
    'EstimatedTimeAtLocation': '2016-08-11T07:34:00',
    'TimeAtLocation': '2016-08-11T07:34:00'
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T07:34:00',
    'AdvertisedTrainIdent': '2512',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Kän', 'Priority': 1, 'Order': 0}],
    'EstimatedTimeAtLocation': '2016-08-11T07:35:00',
    'TimeAtLocation': '2016-08-11T07:35:00'
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T07:36:00',
    'AdvertisedTrainIdent': '2810',
    'LocationSignature': 'Sub',
    'ToLocation': [{'LocationName': 'Bål', 'Priority': 1, 'Order': 0}],
    'EstimatedTimeAtLocation': '2016-08-11T07:40:00',
    'TimeAtLocation': '2016-08-11T07:40:00'
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T07:36:00',
    'AdvertisedTrainIdent': '2810',
    'LocationSignature': 'Sub',
    'ToLocation': [{'LocationName': 'Bål', 'Priority': 1, 'Order': 0}],
    'EstimatedTimeAtLocation': '2016-08-11T07:41:00',
    'TimeAtLocation': '2016-08-11T07:41:00'
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T07:37:00',
    'AdvertisedTrainIdent': '2611',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Söc', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:38:00'
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T07:37:00',
    'AdvertisedTrainIdent': '2611',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Söc', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:36:00'
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T07:37:00',
    'AdvertisedTrainIdent': '2712',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Mr', 'Priority': 1, 'Order': 0}],
    'EstimatedTimeAtLocation': '2016-08-11T07:38:00',
    'TimeAtLocation': '2016-08-11T07:39:00'
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T07:37:00',
    'AdvertisedTrainIdent': '2712',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Mr', 'Priority': 1, 'Order': 0}],
    'EstimatedTimeAtLocation': '2016-08-11T07:38:00',
    'TimeAtLocation': '2016-08-11T07:38:00'
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T07:37:00',
    'AdvertisedTrainIdent': '2612',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'Mr', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:37:00'
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T07:37:00',
    'AdvertisedTrainIdent': '2612',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'Mr', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:35:00'
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T07:38:00',
    'AdvertisedTrainIdent': '2711',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'Söc', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:38:00'
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T07:38:00',
    'AdvertisedTrainIdent': '2711',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'Söc', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:38:00'
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T07:39:00',
    'AdvertisedTrainIdent': '2513',
    'LocationSignature': 'Sub',
    'ToLocation': [{'LocationName': 'Vhe', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:37:00'
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T07:39:00',
    'AdvertisedTrainIdent': '2513',
    'LocationSignature': 'Sub',
    'ToLocation': [{'LocationName': 'Vhe', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:38:00'
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T07:40:00',
    'AdvertisedTrainIdent': '2811',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Nyh', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:40:00'
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T07:40:00',
    'AdvertisedTrainIdent': '2811',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Nyh', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:41:00'
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T07:42:00',
    'AdvertisedTrainIdent': '12312',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Khä', 'Priority': 1, 'Order': 0}],
    'EstimatedTimeAtLocation': '2016-08-11T07:42:00',
    'TimeAtLocation': '2016-08-11T07:43:00'
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T07:42:00',
    'AdvertisedTrainIdent': '12312',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Khä', 'Priority': 1, 'Order': 0}],
    'EstimatedTimeAtLocation': '2016-08-11T07:43:00',
    'TimeAtLocation': '2016-08-11T07:43:00'
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T07:45:00',
    'AdvertisedTrainIdent': '2211',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'Tu', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:44:00'
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T07:45:00',
    'AdvertisedTrainIdent': '2211',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'Tu', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:45:00'
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T07:45:00',
    'AdvertisedTrainIdent': '2214',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'U', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:44:00'
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T07:45:00',
    'AdvertisedTrainIdent': '2214',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'U', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:45:00'
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T07:47:00',
    'AdvertisedTrainIdent': '2313',
    'LocationSignature': 'Sub',
    'ToLocation': [{'LocationName': 'Äs', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:47:00'
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T07:47:00',
    'AdvertisedTrainIdent': '2313',
    'LocationSignature': 'Sub',
    'ToLocation': [{'LocationName': 'Äs', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:48:00'
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T07:49:00',
    'AdvertisedTrainIdent': '2812',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Bål', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:48:00'
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T07:49:00',
    'AdvertisedTrainIdent': '2812',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Bål', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:49:00'
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T07:51:00',
    'AdvertisedTrainIdent': '2512',
    'LocationSignature': 'Sub',
    'ToLocation': [{'LocationName': 'Kän', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:51:00'
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T07:51:00',
    'AdvertisedTrainIdent': '2512',
    'LocationSignature': 'Sub',
    'ToLocation': [{'LocationName': 'Kän', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:50:00'
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T07:52:00',
    'AdvertisedTrainIdent': '2713',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Söc', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:51:00'
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T07:52:00',
    'AdvertisedTrainIdent': '2713',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Söc', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:53:00'
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T07:52:00',
    'AdvertisedTrainIdent': '2612',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Mr', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:52:00'
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T07:52:00',
    'AdvertisedTrainIdent': '2612',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Mr', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:51:00'
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T07:52:00',
    'AdvertisedTrainIdent': '2714',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'Mr', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:51:00'
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T07:52:00',
    'AdvertisedTrainIdent': '2714',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'Mr', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:52:00'
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T07:53:00',
    'AdvertisedTrainIdent': '2611',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'Söc', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:53:00'
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T07:53:00',
    'AdvertisedTrainIdent': '2611',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'Söc', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:52:00'
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T07:54:00',
    'AdvertisedTrainIdent': '2813',
    'LocationSignature': 'Sub',
    'ToLocation': [{'LocationName': 'Nyh', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:53:00'
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T07:54:00',
    'AdvertisedTrainIdent': '2813',
    'LocationSignature': 'Sub',
    'ToLocation': [{'LocationName': 'Nyh', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:54:00'
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T07:55:00',
    'AdvertisedTrainIdent': '2513',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Vhe', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T07:55:00',
    'AdvertisedTrainIdent': '2513',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Vhe', 'Priority': 1, 'Order': 0}],
    'TimeAtLocation': '2016-08-11T07:54:00'
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T07:57:00',
    'AdvertisedTrainIdent': '12312',
    'LocationSignature': 'Sub',
    'ToLocation': [{'LocationName': 'Khä', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T07:57:00',
    'AdvertisedTrainIdent': '12312',
    'LocationSignature': 'Sub',
    'ToLocation': [{'LocationName': 'Khä', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T07:59:00',
    'AdvertisedTrainIdent': '2213',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Tu', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T07:59:00',
    'AdvertisedTrainIdent': '2213',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Tu', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T08:00:00',
    'AdvertisedTrainIdent': '2214',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'U', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T08:00:00',
    'AdvertisedTrainIdent': '2214',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'U', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T08:00:00',
    'AdvertisedTrainIdent': '12314',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'Khä', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T08:00:00',
    'AdvertisedTrainIdent': '12314',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'Khä', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T08:03:00',
    'AdvertisedTrainIdent': '2313',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Äs', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T08:03:00',
    'AdvertisedTrainIdent': '2313',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Äs', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T08:04:00',
    'AdvertisedTrainIdent': '2514',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Kän', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T08:04:00',
    'AdvertisedTrainIdent': '2514',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Kän', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T08:06:00',
    'AdvertisedTrainIdent': '2812',
    'LocationSignature': 'Sub',
    'ToLocation': [{'LocationName': 'Bål', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T08:06:00',
    'AdvertisedTrainIdent': '2812',
    'LocationSignature': 'Sub',
    'ToLocation': [{'LocationName': 'Bål', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T08:07:00',
    'AdvertisedTrainIdent': '2613',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Söc', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T08:07:00',
    'AdvertisedTrainIdent': '2613',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Söc', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T08:07:00',
    'AdvertisedTrainIdent': '2714',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Mr', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T08:07:00',
    'AdvertisedTrainIdent': '2714',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Mr', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T08:07:00',
    'AdvertisedTrainIdent': '2614',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'Mr', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T08:07:00',
    'AdvertisedTrainIdent': '2614',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'Mr', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T08:08:00',
    'AdvertisedTrainIdent': '2713',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'Söc', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T08:08:00',
    'AdvertisedTrainIdent': '2713',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'Söc', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T08:09:00',
    'AdvertisedTrainIdent': '2515',
    'LocationSignature': 'Sub',
    'ToLocation': [{'LocationName': 'Vhe', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T08:09:00',
    'AdvertisedTrainIdent': '2515',
    'LocationSignature': 'Sub',
    'ToLocation': [{'LocationName': 'Vhe', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T08:10:00',
    'AdvertisedTrainIdent': '2813',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Nyh', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T08:10:00',
    'AdvertisedTrainIdent': '2813',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Nyh', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T08:15:00',
    'AdvertisedTrainIdent': '2213',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'Tu', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T08:15:00',
    'AdvertisedTrainIdent': '2213',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'Tu', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T08:15:00',
    'AdvertisedTrainIdent': '12314',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Khä', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T08:15:00',
    'AdvertisedTrainIdent': '12314',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Khä', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T08:15:00',
    'AdvertisedTrainIdent': '2216',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'U', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T08:15:00',
    'AdvertisedTrainIdent': '2216',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'U', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T08:19:00',
    'AdvertisedTrainIdent': '2814',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Bål', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T08:19:00',
    'AdvertisedTrainIdent': '2814',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Bål', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T08:21:00',
    'AdvertisedTrainIdent': '2514',
    'LocationSignature': 'Sub',
    'ToLocation': [{'LocationName': 'Kän', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T08:21:00',
    'AdvertisedTrainIdent': '2514',
    'LocationSignature': 'Sub',
    'ToLocation': [{'LocationName': 'Kän', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T08:22:00',
    'AdvertisedTrainIdent': '2715',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Söc', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T08:22:00',
    'AdvertisedTrainIdent': '2715',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Söc', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T08:22:00',
    'AdvertisedTrainIdent': '2614',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Mr', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T08:22:00',
    'AdvertisedTrainIdent': '2614',
    'LocationSignature': 'Åbe',
    'ToLocation': [{'LocationName': 'Mr', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T08:22:00',
    'AdvertisedTrainIdent': '2716',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'Mr', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T08:22:00',
    'AdvertisedTrainIdent': '2716',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'Mr', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Ankomst',
    'AdvertisedTimeAtLocation': '2016-08-11T08:23:00',
    'AdvertisedTrainIdent': '2613',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'Söc', 'Priority': 1, 'Order': 0}]
}, {
    'ActivityType': 'Avgang',
    'AdvertisedTimeAtLocation': '2016-08-11T08:23:00',
    'AdvertisedTrainIdent': '2613',
    'LocationSignature': 'Tul',
    'ToLocation': [{'LocationName': 'Söc', 'Priority': 1, 'Order': 0}]
}]

function id(activity) {
    return activity.AdvertisedTrainIdent
}
function advertised(activity) {
    return activity.AdvertisedTimeAtLocation
}
describe('MatchingTrains', function () {
    describe('getNorthbound', function () {
        it('new algorithm', function () {
            expect(result.length).to.equal(94)
            const tul = result.filter(a => a.LocationSignature === 'Tul')
            expect(tul.length).to.equal(30)

            const sub = result.filter(a => a.LocationSignature === 'Sub')
            expect(sub.length).to.equal(18)

            const abe = result.filter(a => a.LocationSignature === 'Åbe')
            expect(abe.length).to.equal(46)

            const r = []

            let ank = abe
                .filter(a => a.ActivityType === 'Ankomst')
                .filter(a => tul.some(t => id(a) === id(t) && advertised(a) > advertised(t)))
            console.log('ankomster från Tul till Åbe', ank.map(time))

            let avg = abe
                .filter(a => a.ActivityType === 'Avgang')
                .filter(a => sub.some(s => id(a) === id(s) && advertised(a) < advertised(s)))
            console.log('avgångar från Åbe till Sub', avg.map(time))

            let connection

            while (connection = match()) {
                r.push(connection)
                update()
            }

            expect(r.length).to.equal(2)

            expect(id(r[0].ankomst)).to.equal('12312')
            expect(id(r[0].avgang)).to.equal('12312')
            expect(id(r[1].ankomst)).to.equal('2612')
            expect(id(r[1].avgang)).to.equal('2514')

            function match() {
                let ankomst = ank[0]
                let mtc = avg.filter(a => advertised(a) >= ankomst.AdvertisedTimeAtLocation)
                let avgang = mtc[0]
                console.log('avgångar som matchar', time(ankomst), mtc.map(time))
                if (!avgang)
                    return
                console.log('avgång som bäst matchar', id(ankomst), id(avgang))
                return {ankomst, avgang}
            }

            function update() {
                ank = ank.filter(a => advertised(a) > advertised(connection.avgang))
                console.log('ankomster från Tul till Åbe', ank.map(time))

                avg = avg.filter(a => advertised(a) > advertised(connection.avgang))
                console.log('avgångar från Åbe till Sub', avg.map(time))
            }
        })

        function time(a) {
            return a.AdvertisedTimeAtLocation.substr(11, 5)
        }
    })
})
