const { notificationMessageManagerFactory } = require('../DAL/notificationMessageManager');

const mockData = require("./__mock__/data.json");

const docClientMockFunctions = {
  get: jest.fn(() => ({
    promise: jest.fn(() => Promise.resolve({})),
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

const loggerMockFunctions = {
  debug: jest.fn(),
};

const tableName = "test";

describe('notificationMessageManagerFactory', () => {
  let notificationMessageManager;

  beforeAll(() => {
    const NotificationMessageManager = notificationMessageManagerFactory(loggerMockFunctions, docClientMockFunctions);
    notificationMessageManager = new NotificationMessageManager({
      tableName,
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
    let NotificationMessageManager;

    beforeAll(() => {
      NotificationMessageManager = notificationMessageManagerFactory(loggerMockFunctions, docClientMockFunctions);
    });

    it('initialize successfully with tableName', () => {
      // arrange & action
      // assert
      expect(() => new NotificationMessageManager({
        tableName: "test",
      })).not.toThrow();
    });

    it('initialize unsuccessfully without tableName', () => {
      // arrange & action
      // assert
      expect(
        () => new NotificationMessageManager({
          uselessProperty: "test",
        }),
      ).toThrow();
    });
  });

  describe('getNotificationMessages', () => {
    it('getNotificationMessages successfully', async () => {
      const nextTokens = "nextTokens, 1";
      const result = await notificationMessageManager.getNotificationMessages(nextTokens, 10);

      expect(docClientMockFunctions.scan).toBeCalledTimes(1);
      expect(docClientMockFunctions.scan).toBeCalledTimes(1);
      expect(docClientMockFunctions.scan).toBeCalledWith({
        TableName: tableName,
        Limit: 10,
        ExclusiveStartKey: {
          deviceType: "nextTokens",
          mv: 1,
        },
      });
      expect(result).toEqual([]);
    });
  });

  describe('getNotificationMessage', () => {
    it('getNotificationMessage successfully', async () => {
      const result = await notificationMessageManager.getNotificationMessage("test", "vn");

      expect(docClientMockFunctions.get).toBeCalledTimes(1);
      expect(docClientMockFunctions.get).toBeCalledWith({
        TableName: tableName,
        Key: {
          language: "vn",
          messageId: "test",
        },
      });
      expect(result).toEqual({});
    });
  });

  describe('createNotificationMessage', () => {
    it('createNotificationMessage successfully', async () => {
      const result = await notificationMessageManager.createNotificationMessage(mockData[0]);

      expect(docClientMockFunctions.put).toBeCalledTimes(1);
      expect(docClientMockFunctions.put).toHaveBeenCalledWith({
        TableName: tableName,
        Item: mockData[0],
        ConditionExpression: "#lang <> :language AND #msgId <> :messageId",
        ExpressionAttributeNames: {
          "#lang": "language",
          "#msgId": "messageId",
        },
        ExpressionAttributeValues: {
          ":language": mockData[0].language,
          ":messageId": mockData[0].messageId,
        },
      });
      expect(result).toEqual({});
    });

    it('createNotificationMessage unsuccessfully throw createConflictErrorTemplate', async () => {
      docClientMockFunctions.put = jest.fn(() => ({
        promise: jest.fn(() => Promise.reject({
          code: "ConditionalCheckFailedException",
        })),
      }));

      try {
        await notificationMessageManager.createNotificationMessage(mockData[0]);
      } catch (error) {
        expect(error.code).toEqual(25002);
      }

      expect(docClientMockFunctions.put).toBeCalledTimes(1);
      expect(docClientMockFunctions.put).toHaveBeenCalledWith({
        TableName: tableName,
        Item: mockData[0],
        ConditionExpression: "#lang <> :language AND #msgId <> :messageId",
        ExpressionAttributeNames: {
          "#lang": "language",
          "#msgId": "messageId",
        },
        ExpressionAttributeValues: {
          ":language": mockData[0].language,
          ":messageId": mockData[0].messageId,
        },
      });
    });

    it('createNotificationMessage unsuccessfully throw error', async () => {
      docClientMockFunctions.put = jest.fn(() => ({
        promise: jest.fn(() => Promise.reject(new Error(""))),
      }));

      try {
        await notificationMessageManager.createNotificationMessage(mockData[0]);
      } catch (error) {
        expect(error.message).toEqual("");
      }

      expect(docClientMockFunctions.put).toBeCalledTimes(1);
      expect(docClientMockFunctions.put).toHaveBeenCalledWith({
        TableName: tableName,
        Item: mockData[0],
        ConditionExpression: "#lang <> :language AND #msgId <> :messageId",
        ExpressionAttributeNames: {
          "#lang": "language",
          "#msgId": "messageId",
        },
        ExpressionAttributeValues: {
          ":language": mockData[0].language,
          ":messageId": mockData[0].messageId,
        },
      });
    });
  });

  describe('updateNotificationMessage', () => {
    it('updateNotificationMessage successfully', async () => {
      const result = await notificationMessageManager.updateNotificationMessage(mockData[0]);

      expect(docClientMockFunctions.update).toBeCalledTimes(1);
      expect(docClientMockFunctions.update).toHaveBeenCalledWith({
        TableName: tableName,
        Key: {
          messageId: mockData[0].messageId,
          language: mockData[0].language,
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
          ":msgId": mockData[0].messageId,
          ":lang": mockData[0].language,
          ":title": mockData[0].title,
          ":message": mockData[0].message,
          ":push": mockData[0].push,
          ":type": mockData[0].type,
        },
      });
      expect(result).toEqual({});
    });

    it('updateNotificationMessage unsuccessfully throw createConflictErrorTemplate', async () => {
      docClientMockFunctions.update = jest.fn(() => ({
        promise: jest.fn(() => Promise.reject({
          code: "ConditionalCheckFailedException",
        })),
      }));

      try {
        await notificationMessageManager.updateNotificationMessage(mockData[0]);
      } catch (error) {
        expect(error.code).toEqual(25002);
      }

      expect(docClientMockFunctions.update).toBeCalledTimes(1);
      expect(docClientMockFunctions.update).toHaveBeenCalledWith({
        TableName: tableName,
        Key: {
          messageId: mockData[0].messageId,
          language: mockData[0].language,
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
          ":msgId": mockData[0].messageId,
          ":lang": mockData[0].language,
          ":title": mockData[0].title,
          ":message": mockData[0].message,
          ":push": mockData[0].push,
          ":type": mockData[0].type,
        },
      });
    });

    it('updateNotificationMessage unsuccessfully throw error', async () => {
      docClientMockFunctions.update = jest.fn(() => ({
        promise: jest.fn(() => Promise.reject(new Error(""))),
      }));

      try {
        await notificationMessageManager.updateNotificationMessage(mockData[0]);
      } catch (error) {
        expect(error.message).toEqual("");
      }

      expect(docClientMockFunctions.update).toBeCalledTimes(1);
      expect(docClientMockFunctions.update).toHaveBeenCalledWith({
        TableName: tableName,
        Key: {
          messageId: mockData[0].messageId,
          language: mockData[0].language,
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
          ":msgId": mockData[0].messageId,
          ":lang": mockData[0].language,
          ":title": mockData[0].title,
          ":message": mockData[0].message,
          ":push": mockData[0].push,
          ":type": mockData[0].type,
        },
      });
    });
  });

  describe('deleteNotificationMessage', () => {
    it('deleteNotificationMessage successfully', async () => {
      const result = await notificationMessageManager
        .deleteNotificationMessage(
          mockData[0].messageId,
          mockData[0].language,
        );

      expect(docClientMockFunctions.delete).toBeCalledTimes(1);
      expect(docClientMockFunctions.delete).toHaveBeenCalledWith({
        TableName: tableName,
        Key: {
          messageId: mockData[0].messageId,
          language: mockData[0].language,
        },
      });
      expect(result).toEqual({});
    });

    it('deleteNotificationMessage unsuccessfully throw createConflictErrorTemplate', async () => {
      docClientMockFunctions.delete = jest.fn(() => ({
        promise: jest.fn(() => Promise.reject({
          code: "ConditionalCheckFailedException",
        })),
      }));

      try {
        await notificationMessageManager.deleteNotificationMessage(mockData[0].messageId, mockData[0].language);
      } catch (error) {
        expect(error.code).toEqual(25003);
      }

      expect(docClientMockFunctions.delete).toBeCalledTimes(1);
      expect(docClientMockFunctions.delete).toHaveBeenCalledWith({
        TableName: tableName,
        Key: {
          messageId: mockData[0].messageId,
          language: mockData[0].language,
        },
      });
    });

    it('deleteNotificationMessage unsuccessfully throw error', async () => {
      docClientMockFunctions.delete = jest.fn(() => ({
        promise: jest.fn(() => Promise.reject(new Error(""))),
      }));

      try {
        await notificationMessageManager.deleteNotificationMessage(mockData[0].messageId, mockData[0].language);
      } catch (error) {
        expect(error.message).toEqual("");
      }

      expect(docClientMockFunctions.delete).toBeCalledTimes(1);
      expect(docClientMockFunctions.delete).toHaveBeenCalledWith({
        TableName: tableName,
        Key: {
          messageId: mockData[0].messageId,
          language: mockData[0].language,
        },
      });
    });
  });
});
