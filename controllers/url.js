const shortid = require('shortid')
const URL = require('../models/url')
async function handelGenerateNewShortUrl(req, res) {
    const shortID = shortid(8);
    await URL.create({
        shortId: shortID,
    }
    )
}