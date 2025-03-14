const logger = require("../logs-app/index");
const {PubSub} = require('@google-cloud/pubsub');

const projectId = process.env.PROJECT_ID;
const pubSubClient = new PubSub({projectId});

async function publishMessage(topicNameOrId, data) {
  try {
    const dataBuffer = Buffer.from(JSON.stringify(data));
    const topic = pubSubClient.topic(topicNameOrId);
    const messageId = await topic.publishMessage({data: dataBuffer});
    logger.info(`Message ${messageId} published.`);
  } catch (error) {
    logger.error(`Received error while publishing ${JSON.stringify(data)}: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { publishMessage };
