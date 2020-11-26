const { errorHandler, Logger } = require("@kaercher/commonlambdahelper");

const missingParameterError = errorHandler.createMissingParameterTemplate({
  message: "Error initializing Notification Trigger Config Manager",
  code: 25001,
  actor: "constructorNotificationTriggerConfigManager",
})(new Error(""));

const createNotFoundTemplate = errorHandler.createNotFoundTemplate({
  message: "NotificationTriggerConfig with deviceType and mv not found",
  code: 25003,
  actor: "deleteNotificationTriggerConfig",
  apiResponseStatusCode: 400,
});

const createConflictErrorTemplateWhenCreate = errorHandler.createConflictErrorTemplate(
  {
    message: "NotificationTriggerConfig with deviceType and mv already exists",
    code: 25002,
    actor: "createNotificationTriggerConfig",
    apiResponseStatusCode: 400,
  },
);

const createConflictErrorTemplateWhenUpdate = errorHandler.createConflictErrorTemplate(
  {
    message: "NotificationTriggerConfig with deviceType and mv already exists",
    code: 25002,
    actor: "updateNotificationTriggerConfig",
    apiResponseStatusCode: 400,
  },
);

const NotificationTriggerConfigManagerFactory = (logger, documentClient) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  class NotificationTriggerConfigManager {
    constructor(config) {
      const { ntfTriggerConfigTable } = config;
      if (!ntfTriggerConfigTable) {
        throw missingParameterError;
      }
      this.ntfTriggerConfigTable = ntfTriggerConfigTable;
      logger.debug(
        "constructor NotificationTriggerConfigManager initialize correctly",
      );
    }

    getAll(nextTokens, limit = 50) {
      logger.debug(
        "Notification trigger config manager: getAll with param",
        nextTokens,
      );
      let ExclusiveStartKey;
      if (nextTokens) {
        const [deviceType, mv] = nextTokens.split(",");
        ExclusiveStartKey = { deviceType, mv: +mv };
      }
      const params = {
        TableName: this.ntfTriggerConfigTable,
        ExclusiveStartKey,
        Limit: limit,
      };
      return documentClient.scan(params).promise();
    }

    async get(deviceType, mv) {
      logger.debug(
        "Notification trigger config manager: get with param",
        deviceType,
        mv,
      );
      const params = {
        TableName: this.ntfTriggerConfigTable,
        Key: {
          deviceType,
          mv,
        },
      };
      logger.trace("get params: ", params);
      const { Item } = await documentClient.get(params).promise();
      logger.debug("get result: ", Item);
      return Item;
    }

    async delete(deviceType, mv) {
      logger.debug(
        "Notification trigger config manager: delete with param",
        deviceType,
        mv,
      );
      const params = {
        TableName: this.ntfTriggerConfigTable,
        Key: {
          deviceType,
          mv,
        },
        ConditionExpression:
          "#deviceTypeAlias = :deviceType and #mvAlias = :mv",
        ExpressionAttributeValues: {
          ":deviceType": deviceType,
          ":mv": mv,
        },
        ExpressionAttributeNames: {
          "#deviceTypeAlias": "deviceType",
          "#mvAlias": "mv",
        },
      };
      try {
        logger.trace("delete params: ", params);
        return await documentClient.delete(params).promise();
      } catch (error) {
        if (error.code === "ConditionalCheckFailedException") {
          throw createNotFoundTemplate(error);
        }
        throw error;
      }
    }

    async update(notificationTriggerConfig) {
      logger.debug(
        "Notification trigger config manager: update with param",
        notificationTriggerConfig,
      );
      const { deviceType, mv, config } = notificationTriggerConfig;
      const params = {
        TableName: this.ntfTriggerConfigTable,
        Key: {
          deviceType,
          mv,
        },
        ConditionExpression:
          "#deviceTypeAlias = :deviceType and #mvAlias = :mv",
        UpdateExpression: "set config = :config",
        ExpressionAttributeValues: {
          ":deviceType": deviceType,
          ":mv": mv,
          ":config": config,
        },
        ExpressionAttributeNames: {
          "#deviceTypeAlias": "deviceType",
          "#mvAlias": "mv",
        },
      };
      try {
        logger.trace("update params: ", params);
        return await documentClient.update(params).promise();
      } catch (error) {
        if (error.code === "ConditionalCheckFailedException") {
          throw createConflictErrorTemplateWhenUpdate(error);
        }
        throw error;
      }
    }

    async create(notificationTriggerConfig) {
      logger.debug(
        "Notification trigger config manager: create with param",
        notificationTriggerConfig,
      );
      const { deviceType, mv } = notificationTriggerConfig;
      const params = {
        TableName: this.ntfTriggerConfigTable,
        Item: notificationTriggerConfig,
        ConditionExpression:
          "#deviceTypeAlias <> :deviceType and #mvAlias <> :mv",
        ExpressionAttributeValues: {
          ":deviceType": deviceType,
          ":mv": mv,
        },
        ExpressionAttributeNames: {
          "#deviceTypeAlias": "deviceType",
          "#mvAlias": "mv",
        },
      };
      try {
        logger.trace("create params: ", params);
        return await documentClient.put(params).promise();
      } catch (error) {
        if (error.code === "ConditionalCheckFailedException") {
          throw createConflictErrorTemplateWhenCreate(error);
        }
        throw error;
      }
    }

    static parseConfigToArray(ntfTriggerConfig) {
      const { deviceType, mv, config } = ntfTriggerConfig;
      const parsedData = {
        deviceType,
        mv,
        config: [],
      };
      Object.entries(config).forEach(configItem => {
        const [name, configDetail] = configItem;
        parsedData.config.push({
          name,
          ...configDetail,
        });
      });
      return parsedData;
    }
  };

const AWS = require("aws-sdk");

const region = process.env.REGION || "eu-west-1";
AWS.config.update({
  region,
});

const logger = new Logger();
logger.setLevel(process.env.LOG_LEVEL);

const documentClient = new AWS.DynamoDB.DocumentClient();
module.exports = {
  NotificationTriggerConfigManagerFactory,
  NotificationTriggerConfigManager: NotificationTriggerConfigManagerFactory(
    logger,
    documentClient,
  ),
};
