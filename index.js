const express = require('express');
const PORT = 8100;

const app = express();
const { connectToMongoDB } = require('./connect')
const urlRoute = require('./routes/url')

app.use(express.json());

const URL = require('./models/url')

connectToMongoDB("mongodb://localhost:27017/short-url").then(() => {
    console.log("DB Connected Successfully")
})
app.use('/url', urlRoute)
app.use('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    })

    res.redirect(entry.redirectURL);
})

app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`)
})