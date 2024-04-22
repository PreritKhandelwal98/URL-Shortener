require('dotenv').config();
const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = process.env.PORT || 5000;

const captureDeviceInfo = require('./middleware/url');
app.use(captureDeviceInfo);

connectToMongoDB(process.env.ONLINEDB_URL).then(() =>
    console.log("Mongodb connected")
);

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
    try {
        const shortId = req.params.shortId;
        console.log(shortId);
        const entry = await URL.findOneAndUpdate(
            {
                shortId
            },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                        geolocation: req.geolocation,
                        deviceType: req.deviceType
                    },
                },
            }
        );

        if (!entry) {
            return res.status(404).send("URL not found");
        }

        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
