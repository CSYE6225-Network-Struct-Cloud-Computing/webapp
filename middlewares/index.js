const { error } = require("console");
const db = require("../models/index.js");

async function CheckDbConnectionAndCacheControl(req, res, next) {
    res.setHeader("Cache-Control", "no-cache");
    try {
        await db.sequelize.authenticate();
    } catch {
        res.status(503).end();
    }
    next();
}

module.exports = {
    CheckDbConnectionAndCacheControl,
};
