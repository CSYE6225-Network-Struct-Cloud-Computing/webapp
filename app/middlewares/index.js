const { error } = require("console");
const db = require("../models/index.js");

async function CheckDbConnectionAndCacheControlAndPayloadCheck(req, res, next) {
    res.setHeader("Cache-Control", "no-cache");

    if (req.method === "GET") {
        if (req.get("content-length") >= 1 || req._parsedUrl.search != null) {
            console.log("Get has payload");
            res.status(400).end();
            return;
        }
    }
    try {
        await db.sequelize.authenticate();
    } catch {
        res.status(503).end();
        return;
    }

    next();
}

module.exports = {
    CheckDbConnectionAndCacheControlAndPayloadCheck,
};
