// https://jasonwatmore.com/post/2018/09/24/nodejs-basic-authentication-tutorial-with-example-api

const bcrypt = require("bcrypt");
const { User } = require("../models");
async function basicAuth(req, res, next) {
    if (req.path === "/users/authenticate") {
        return next();
    }

    if (
        !req.headers.authorization ||
        req.headers.authorization.indexOf("Basic ") === -1
    ) {
        return res.status(400).end();
    }

    const base64Credentials = req.headers.authorization.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
        "ascii"
    );
    const [username, password] = credentials.split(":");
    console.log(username);
    console.log(password);

    try {
        const user = await User.findOne({
            where: { username: username },
            attributes: ["id", "username", "password", "firstName", "lastName"],
        });

        if (!user) {
            return res.status(400).end();
        }
        // console.log("User", user);
        // console.log("password ", user.password);
        const passwordMatch = await bcrypt.compare(password, user.password);
        // console.log("password match ", passwordMatch);

        if (!passwordMatch) {
            return res.status(400).end();
        }

        req.user = {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
        };
        console.log("Auth Done");

        next();
    } catch (error) {
        return res.status(400).end();
    }
}

module.exports = basicAuth;
