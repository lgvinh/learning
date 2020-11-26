const { NotificationTriggerConfigManagerFactory } = require('../DAL/notificationTriggerConfigManager');

const docClientMockFunctions = {
  get: jest.fn(() => ({
    promise: jest.fn(() => Promise.resolve({
      Item: {},
    })),
  })),
  put: jest.fn(() => ({
    promise: jest.fn(() => Promise.resolve({})),
  })),
  update: jest.fn(() => ({
    promise: jest.fn(() => Promise.resolve({})),
  })),
  delete: jest.fn(() => ({
    promise: jest.fn(() => Promise.resolve({})),
  })),
  query: jest.fn(() => ({
    promise: jest.fn(() => Promise.resolve([])),
  })),
  scan: jest.fn(() => ({
    promise: jest.fn(() => Promise.resolve([])),
  })),
};

const notificationTriggerConfig = {
  deviceType: "deviceType",
  mv: 1,
  config: "config",
};

const loggerMockFunctions = {
  debug: jest.fn(),
  trace: jest.fn(),
};

const tableName = "test";

const nextTokens = "nextTokens, 1";

describe('NotificationTriggerConfigManager', () => {
  let notificationTriggerConfigManager;

  beforeAll(() => {
    const NotificationTriggerConfigManager = NotificationTriggerConfigManagerFactory(
      loggerMockFunctions,
      docClientMockFunctions,
    );
    notificationTriggerConfigManager = new NotificationTriggerConfigManager({
      ntfTriggerConfigTable: "test",
    });
  });

  afterEach(() => {
    docClientMockFunctions.delete.mockClear();
    docClientMockFunctions.get.mockClear();
    docClientMockFunctions.put.mockClear();
    docClientMockFunctions.query.mockClear();
    docClientMockFunctions.scan.mockClear();
    docClientMockFunctions.update.mockClear();
  });

  describe('initialize', () => {
    let NotificationTriggerConfigManager;
    beforeAll(() => {
      NotificationTriggerConfigManager = NotificationTriggerConfigManagerFactory(
        loggerMockFunctions,
        docClientMockFunctions,
      );
    });

    it('initialize successfully', () => {
      expect(
        () => new NotificationTriggerConfigManager({
          ntfTriggerConfigTable: "test",
        }),
      ).not.toThrow();
    });

    it('initialize unsuccessfully without ntfTriggerConfigTable', () => {
      expect(
        () => new NotificationTriggerConfigManager({
          uselessProperty: "test",
        }),
      ).toThrow();
    });
  });

  describe('get all', () => {
    it('get all successfully', async () => {
      const result = await notificationTriggerConfigManager.getAll(nextTokens, 10);

      expect(docClientMockFunctions.scan).toHaveBeenCalledTimes(1);
      expect(docClientMockFunctions.scan).toBeCalledWith({
        TableName: tableName,
        ExclusiveStartKey: {
          deviceType: "nextTokens",
          mv: 1,
        },
        Limit: 10,
      });
      expect(result).toEqual([]);
    });
  });

  describe('get one', () => {
    it('get one successfully', async () => {
      const result = await notificationTriggerConfigManager
        .get(notificationTriggerConfig.deviceType, notificationTriggerConfig.mv);

      expect(docClientMockFunctions.get).toBeCalledTimes(1);
      expect(docClientMockFunctions.get).toBeCalledWith({
        TableName: tableName,
        Key: {
          deviceType: notificationTriggerConfig.deviceType,
          mv: notificationTriggerConfig.mv,
        },
      });
      expect(result).toEqual({});
    });
  });

  describe('delete', () => {
    it('delete successfully', async () => {
      const result = await notificationTriggerConfigManager
        .delete(notificationTriggerConfig.deviceType, notificationTriggerConfig.mv);

      expect(docClientMockFunctions.delete).toBeCalledTimes(1);
      expect(docClientMockFunctions.delete).toBeCalledWith({
        TableName: tableName,
        Key: {
          deviceType: notificationTriggerConfig.deviceType,
          mv: notificationTriggerConfig.mv,
        },
        ConditionExpression:
          "#deviceTypeAlias = :deviceType and #mvAlias = :mv",
        ExpressionAttributeValues: {
          ":deviceType": notificationTriggerConfig.deviceType,
          ":mv": notificationTriggerConfig.mv,
        },
        ExpressionAttributeNames: {
          "#deviceTypeAlias": "deviceType",
          "#mvAlias": "mv",
        },
      });
      expect(result).toEqual({});
    });

    it('delete unsuccessfully throw createNotFoundTemplate', async () => {
      docClientMockFunctions.delete = jest.fn(() => ({
        promise: jest.fn(() => Promise.reject({
          code: "ConditionalCheckFailedException",
        })),
      }));

      try {
        await notificationTriggerConfigManager
          .delete(notificationTriggerConfig.deviceType, notificationTriggerConfig.mv);
      } catch (error) {
        expect(error.code).toEqual(25003);
      }

      expect(docClientMockFunctions.delete).toBeCalledTimes(1);
      expect(docClientMockFunctions.delete).toBeCalledWith({
        TableName: tableName,
        Key: {
          deviceType: notificationTriggerConfig.deviceType,
          mv: notificationTriggerConfig.mv,
        },
        ConditionExpression:
          "#deviceTypeAlias = :deviceType and #mvAlias = :mv",
        ExpressionAttributeValues: {
          ":deviceType": notificationTriggerConfig.deviceType,
          ":mv": notificationTriggerConfig.mv,
        },
        ExpressionAttributeNames: {
          "#deviceTypeAlias": "deviceType",
          "#mvAlias": "mv",
        },
      });
    });

    it('delete unsuccessfully throw error', async () => {
      docClientMockFunctions.delete = jest.fn(() => ({
        promise: jest.fn(() => Promise.reject(new Error(""))),
      }));

      try {
        await notificationTriggerConfigManager
          .delete(notificationTriggerConfig.deviceType, notificationTriggerConfig.mv);
      } catch (error) {
        expect(error.message).toEqual("");
      }

      expect(docClientMockFunctions.delete).toBeCalledTimes(1);
      expect(docClientMockFunctions.delete).toBeCalledWith({
        TableName: tableName,
        Key: {
          deviceType: notificationTriggerConfig.deviceType,
          mv: notificationTriggerConfig.mv,
        },
        ConditionExpression:
          "#deviceTypeAlias = :deviceType and #mvAlias = :mv",
        ExpressionAttributeValues: {
          ":deviceType": notificationTriggerConfig.deviceType,
          ":mv": notificationTriggerConfig.mv,
        },
        ExpressionAttributeNames: {
          "#deviceTypeAlias": "deviceType",
          "#mvAlias": "mv",
        },
      });
    });
  });

  describe('update', () => {
    it('update successfully', async () => {
      const result = await notificationTriggerConfigManager
        .update(notificationTriggerConfig);

      expect(docClientMockFunctions.update).toBeCalledTimes(1);
      expect(docClientMockFunctions.update).toBeCalledWith({
        TableName: tableName,
        Key: {
          deviceType: notificationTriggerConfig.deviceType,
          mv: notificationTriggerConfig.mv,
        },
        ConditionExpression: "#deviceTypeAlias = :deviceType and #mvAlias = :mv",
        UpdateExpression: "set config = :config",
        ExpressionAttributeValues: {
          ":deviceType": notificationTriggerConfig.deviceType,
          ":mv": notificationTriggerConfig.mv,
          ":config": notificationTriggerConfig.config,
        },
        ExpressionAttributeNames: {
          "#deviceTypeAlias": "deviceType",
          "#mvAlias": "mv",
        },
      });
      expect(result).toEqual({});
    });

    it('update unsuccessfully throw createNotFoundTemplate', async () => {
      docClientMockFunctions.update = jest.fn(() => ({
        promise: jest.fn(() => Promise.reject({
          code: "ConditionalCheckFailedException",
        })),
      }));

      try {
        await notificationTriggerConfigManager
          .update(notificationTriggerConfig);
      } catch (error) {
        expect(error.code).toEqual(25002);
      }

      expect(docClientMockFunctions.update).toBeCalledTimes(1);
      expect(docClientMockFunctions.update).toBeCalledWith({
        TableName: tableName,
        Key: {
          deviceType: notificationTriggerConfig.deviceType,
          mv: notificationTriggerConfig.mv,
        },
        ConditionExpression: "#deviceTypeAlias = :deviceType and #mvAlias = :mv",
        UpdateExpression: "set config = :config",
        ExpressionAttributeValues: {
          ":deviceType": notificationTriggerConfig.deviceType,
          ":mv": notificationTriggerConfig.mv,
          ":config": notificationTriggerConfig.config,
        },
        ExpressionAttributeNames: {
          "#deviceTypeAlias": "deviceType",
          "#mvAlias": "mv",
        },
      });
    });

    it('update unsuccessfully throw error', async () => {
      docClientMockFunctions.update = jest.fn(() => ({
        promise: jest.fn(() => Promise.reject(new Error(""))),
      }));

      try {
        await notificationTriggerConfigManager
          .update(notificationTriggerConfig);
      } catch (error) {
        expect(error.message).toEqual("");
      }

      expect(docClientMockFunctions.update).toBeCalledTimes(1);
      expect(docClientMockFunctions.update).toBeCalledWith({
        TableName: tableName,
        Key: {
          deviceType: notificationTriggerConfig.deviceType,
          mv: notificationTriggerConfig.mv,
        },
        ConditionExpression: "#deviceTypeAlias = :deviceType and #mvAlias = :mv",
        UpdateExpression: "set config = :config",
        ExpressionAttributeValues: {
          ":deviceType": notificationTriggerConfig.deviceType,
          ":mv": notificationTriggerConfig.mv,
          ":config": notificationTriggerConfig.config,
        },
        ExpressionAttributeNames: {
          "#deviceTypeAlias": "deviceType",
          "#mvAlias": "mv",
        },
      });
    });
  });

  describe('create', () => {
    it('create successfully', async () => {
      const result = await notificationTriggerConfigManager
        .create(notificationTriggerConfig);

      expect(docClientMockFunctions.put).toBeCalledTimes(1);
      expect(docClientMockFunctions.put).toBeCalledWith({
        TableName: tableName,
        Item: notificationTriggerConfig,
        ConditionExpression:
          "#deviceTypeAlias <> :deviceType and #mvAlias <> :mv",
        ExpressionAttributeValues: {
          ":deviceType": notificationTriggerConfig.deviceType,
          ":mv": notificationTriggerConfig.mv,
        },
        ExpressionAttributeNames: {
          "#deviceTypeAlias": "deviceType",
          "#mvAlias": "mv",
        },
      });
      expect(result).toEqual({});
    });

    it('create unsuccessfully throw createNotFoundTemplate', async () => {
      docClientMockFunctions.put = jest.fn(() => ({
        promise: jest.fn(() => Promise.reject({
          code: "ConditionalCheckFailedException",
        })),
      }));

      try {
        await notificationTriggerConfigManager
          .create(notificationTriggerConfig);
      } catch (error) {
        expect(error.code).toEqual(25002);
      }

      expect(docClientMockFunctions.put).toBeCalledTimes(1);
      expect(docClientMockFunctions.put).toBeCalledWith({
        TableName: tableName,
        Item: notificationTriggerConfig,
        ConditionExpression:
          "#deviceTypeAlias <> :deviceType and #mvAlias <> :mv",
        ExpressionAttributeValues: {
          ":deviceType": notificationTriggerConfig.deviceType,
          ":mv": notificationTriggerConfig.mv,
        },
        ExpressionAttributeNames: {
          "#deviceTypeAlias": "deviceType",
          "#mvAlias": "mv",
        },
      });
    });

    it('create unsuccessfully throw error', async () => {
      docClientMockFunctions.put = jest.fn(() => ({
        promise: jest.fn(() => Promise.reject(new Error(""))),
      }));

      try {
        await notificationTriggerConfigManager
          .create(notificationTriggerConfig);
      } catch (error) {
        expect(error.message).toEqual("");
      }

      expect(docClientMockFunctions.put).toBeCalledTimes(1);
      expect(docClientMockFunctions.put).toBeCalledWith({
        TableName: tableName,
        Item: notificationTriggerConfig,
        ConditionExpression:
          "#deviceTypeAlias <> :deviceType and #mvAlias <> :mv",
        ExpressionAttributeValues: {
          ":deviceType": notificationTriggerConfig.deviceType,
          ":mv": notificationTriggerConfig.mv,
        },
        ExpressionAttributeNames: {
          "#deviceTypeAlias": "deviceType",
          "#mvAlias": "mv",
        },
      });
    });
  });

  describe('parseConfigToArray', () => {
    it('parseConfigToArray successfully', () => {
      const result = NotificationTriggerConfigManagerFactory(loggerMockFunctions, docClientMockFunctions)
        .parseConfigToArray(notificationTriggerConfig);

      expect(result.mv).toEqual(1);
    });
  });
});
