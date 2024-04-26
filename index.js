require('dotenv').config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const { connectToMongoDB } = require("./connect");

const URL = require("./models/url");

const app = express();
const PORT = process.env.PORT || 5000;

const captureDeviceInfo = require('./middlewares/url');
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");

app.use(captureDeviceInfo);
app.use(cookieParser());

connectToMongoDB(process.env.ONLINEDB_URL).then(() =>
    console.log("Mongodb connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);
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
        console.log(req.socket.remoteAddress);
        // console.log(req);
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
