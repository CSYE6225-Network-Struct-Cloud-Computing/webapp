const logger = require('../logs-app/index');

function otherMethodsNotAllowed(req, res, next) {
    res.setHeader("Cache-Control", "no-cache");
    res.status(405).end();
}

function healthCheck(req, res, next) {
    res.setHeader("Cache-Control", "no-cache");

    logger.error('error healthCheck api called');
    logger.warn('warn healthCheck api called');
    logger.info('info healthCheck api called');
    logger.http('http healthCheck api called');
    logger.verbose('verbose healthCheck api called');
    logger.debug('debug healthCheck api called');
    logger.silly('silly healthCheck api called');
    // console.log(JSON.stringify(req.body) == JSON.stringify({}));
    // console.log(req.get("content-length") >= 1);
    // console.log(req._parsedUrl.search != null);

    // If Payload
    if (req.get("content-length") >= 1 || req._parsedUrl.search != null) {
        res.status(400).end();
    }
    res.status(200).end();
}

module.exports = {
    otherMethodsNotAllowed,
    healthCheck,
};
