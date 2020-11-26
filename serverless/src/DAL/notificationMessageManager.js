const AWS = require("aws-sdk");
const { errorHandler, Logger } = require("@kaercher/commonlambdahelper");

const { createMissingParameterTemplate } = errorHandler;

const missingParamError = createMissingParameterTemplate({
  code: 500,
  message: "Missing parameter/parameters",
  actor: "NotificationMessageManager",
});

/**
 *
 * @param {logger} logger
 * @param {AWS.DynamoDB.DocumentClient} docClient
 */
const notificationMessageManagerFactory = (logger, docClient) => class NotificationMessageManager {
  /**
   * @param {String} config.tableName Table's name
   */
  constructor(config) {
    const { tableName } = config;
    if (!tableName) {
      throw missingParamError(new Error(""));
    }
    this.tableName = tableName;
    logger.debug(
      "constructor NotificationTriggerConfigManager initialized correctly",
    );
  }

  /**
     * Get a list of notification messages
     * @returns {Promise<Array>} List of notification messages
     */
  getNotificationMessages(nextTokens, limit = 50) {
    let ExclusiveStartKey;
    if (nextTokens) {
      const [messageId, language] = nextTokens.split(",");
      ExclusiveStartKey = { messageId, language };
    }
    return docClient
      .scan({
        TableName: this.tableName,
        Limit: limit,
        ExclusiveStartKey,
      })
      .promise();
  }

  /**
     * Get a specific notification messages
     * by messageId and language
     * @param {string} messageId - Hash key
     * @param {string} language - Range key
     * @returns A notification message
     */
  getNotificationMessage(messageId, language) {
    logger.debug(
      "Notification message manager: get with param",
      language,
      messageId,
    );
    return docClient
      .get({
        TableName: this.tableName,
        Key: {
          messageId,
          language,
        },
      })
      .promise();
  }

  /**
     * Create notification message
     * @param {string} notificationMessage.messageId Hash key
     * @param {string} notificationMessage.language Range key
     * @param {string} notificationMessage.message Notification's message
     * @param {string} notificationMessage.title Notification's title
     * @param {string} notificationMessage.type Notification's type
     * @param {boolean} notificationMessage.push Notification should push or not
     */
  async createNotificationMessage(notificationMessage) {
    logger.debug(
      "Notification message manager: create with param",
      notificationMessage,
    );
    const { language, messageId } = notificationMessage;

    try {
      return await docClient
        .put({
          TableName: this.tableName,
          Item: notificationMessage,
          ConditionExpression: "#lang <> :language AND #msgId <> :messageId",
          ExpressionAttributeNames: {
            "#lang": "language",
            "#msgId": "messageId",
          },
          ExpressionAttributeValues: {
            ":language": language,
            ":messageId": messageId,
          },
        })
        .promise();
    } catch (error) {
      if (error.code === "ConditionalCheckFailedException") {
        throw errorHandler.createConflictErrorTemplate({
          // eslint-disable-next-line max-len
          message: `Notification message with messageId: ${messageId} and language: ${language} already exists`,
          code: 25002,
          actor: "createNotificationMessage",
        })(error);
      }
      throw error;
    }
  }

  /**
     * Update notification message which
     * has messageId & language
     * @param {string} notificationMessage.messageId - Hash key
     * @param {string} notificationMessage.language - Range key
     * ---------------------------------------------
     * @param {string} notificationMessage.message
     * @param {string} notificationMessage.title
     * @param {string} notificationMessage.type
     * @param {boolean} notificationMessage.push
     */
  async updateNotificationMessage(notificationMessage) {
    logger.debug(
      "Notification message manager: update with param",
      notificationMessage,
    );
    const {
      language,
      message,
      messageId,
      push,
      title,
      type,
    } = notificationMessage;

    try {
      return await docClient
        .update({
          TableName: this.tableName,
          Key: {
            messageId,
            language,
          },
          ConditionExpression: "#msgId = :msgId AND #lang = :lang",
          UpdateExpression:
              "SET title = :title, message = :message, push = :push, #type = :type",
          ExpressionAttributeNames: {
            "#msgId": "messageId",
            "#lang": "language",
            "#type": "type",
          },
          ExpressionAttributeValues: {
            ":msgId": messageId,
            ":lang": language,
            ":title": title,
            ":message": message,
            ":push": push,
            ":type": type,
          },
        })
        .promise();
    } catch (error) {
      if (error.code === "ConditionalCheckFailedException") {
        throw errorHandler.createConflictErrorTemplate({
          message: `Notification message with messageId: ${messageId} and language: ${language} already exists`,
          code: 25002,
          actor: "updateNotificationMessage",
        })(error);
      }
      throw error;
    }
  }

  /**
     * Delete notification message
     * @param {string} messageId - Hash key
     * @param {string} language - Range key
     */
  async deleteNotificationMessage(messageId, language) {
    logger.debug(
      "Notification message manager: delete with param",
      messageId,
      language,
    );

    try {
      return await docClient
        .delete({
          TableName: this.tableName,
          Key: {
            messageId,
            language,
          },
        })
        .promise();
    } catch (error) {
      if (error.code === "ConditionalCheckFailedException") {
        throw errorHandler.createNotFoundTemplate({
          message: `Notification message with messageId: ${messageId} and language: ${language} not found`,
          code: 25003,
          actor: "deleteNotificationMessage",
        })(error);
      }
      throw error;
    }
  }
};

const localOptions = {
  region: "localhost",
  endpoint: "http://localhost:8042",
};

const documentClient = new AWS.DynamoDB.DocumentClient(localOptions);
const logger = new Logger();
module.exports = {
  notificationMessageManagerFactory,
  NotificationMessageManager: notificationMessageManagerFactory(
    logger,
    documentClient,
  ),
};
