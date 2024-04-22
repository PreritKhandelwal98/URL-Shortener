const useragent = require('useragent');
const geoip = require('geoip-lite');
const requestIp = require('request-ip');

// Middleware to capture geolocation and device type
const captureDeviceInfo = (req, res, next) => {
    try {
        const userAgentString = req.headers['user-agent'];
        const clientIp = requestIp.getClientIp(req);



        if (!userAgentString || !clientIp) {
            throw new Error("User-Agent header or IP address not found");
        }

        const userAgent = useragent.parse(userAgentString);
        const geo = geoip.lookup(clientIp);



        req.deviceType = userAgent.device.toString();
        req.geolocation = geo ? `${geo.city}, ${geo.region}, ${geo.country}` : 'Unknown';



        next();
    } catch (error) {
        console.error("Error in captureDeviceInfo middleware:", error);
        // Proceed without setting req.geolocation and req.deviceType
        req.deviceType = 'Unknown';
        req.geolocation = 'Unknown';
        next();
    }
};

module.exports = captureDeviceInfo;
