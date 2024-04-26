const USER = require("../models/user");
const { v4: uuidv4 } = require('uuid');
const { setUser } = require("../service/auth");

async function handelUserSignup(req, res) {
    const { name, email, password } = req.body
    await USER.create({
        name,
        email,
        password
    });

    return res.redirect("/")
}

async function handelUserLogin(req, res) {
    const { email, password } = req.body
    const user = await USER.findOne({ email, password });
    if (!user) {
        return res.render("login", {
            error: "Invalid Username or Password"
        });
    }

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect("/");
}


module.exports = {
    handelUserSignup,
    handelUserLogin
}