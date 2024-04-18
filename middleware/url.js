const useragent = require('useragent');
const geoip = require('geoip-lite');

// Middleware to capture geolocation and device type
const captureDeviceInfo = (req, res, next) => {
    const userAgent = useragent.parse(req.headers['user-agent']);
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const geo = geoip.lookup(ip);

    req.deviceType = userAgent.device.toString();
    req.geolocation = geo ? `${geo.city}, ${geo.region}, ${geo.country}` : 'Unknown';

    next();
};

module.exports = captureDeviceInfo;
