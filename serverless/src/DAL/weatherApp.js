/* eslint-disable */
const AWS = require("aws-sdk");

const localOptions = {
  region: "localhost",
  endpoint: "http://localhost:8042",
};

const dynamoDB = new AWS.DynamoDB(localOptions);

const docClient = new AWS.DynamoDB.DocumentClient(localOptions);

const tableName = "WeatherData-v2";
const tableNameV3 = "WeatherData-v3";
const tableNameV4 = "WeatherData-v4";

const createWeatherDataV2Table = async () => {
  const params = {
    TableName: "WeatherData-v2",
    KeySchema: [
      // The type of of schema.  Must start with a HASH type, with an optional second RANGE.
      {
        // Required HASH type attribute
        AttributeName: "id",
        KeyType: "HASH",
      },
    ],
    AttributeDefinitions: [
      // The names and types of all primary and index key attributes only
      {
        AttributeName: "id",
        AttributeType: "S", // (S | N | B) for string, number, binary
      },
      {
        AttributeName: "type",
        AttributeType: "S", // (S | N | B) for string, number, binary
      },
      {
        AttributeName: "locationId",
        AttributeType: "S", // (S | N | B) for string, number, binary
      },
    ],
    ProvisionedThroughput: {
      // required provisioned throughput for the table
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
    GlobalSecondaryIndexes: [
      // optional (list of GlobalSecondaryIndex)
      {
        IndexName: "typeIndex",
        KeySchema: [
          {
            // Required HASH type attribute
            AttributeName: "type",
            KeyType: "HASH",
          },
        ],
        Projection: {
          // attributes to project into the index
          ProjectionType: "ALL", // (ALL | KEYS_ONLY | INCLUDE)
        },
        ProvisionedThroughput: {
          // throughput to provision to the index
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
      {
        IndexName: "locationIdIndex",
        KeySchema: [
          {
            // Required HASH type attribute
            AttributeName: "locationId",
            KeyType: "HASH",
          },
        ],
        Projection: {
          // attributes to project into the index
          ProjectionType: "ALL", // (ALL | KEYS_ONLY | INCLUDE)
        },
        ProvisionedThroughput: {
          // throughput to provision to the index
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
    ],
  };
  try {
    await dynamoDB.createTable(params).promise();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const insertWeatherDataV2 = () =>
  docClient
    .put({
      TableName: tableNameV4,
      Item: {
        "deviceType": `K7EU7`,
        "longitude": -19.1623702,
        "bridgeId": "90998913-5260-47fd-b5da-82977ac24d6d:LB1:eu-west-1:2f2c7a8f-b837-42d8-97d7-3670e8571db9",
        "locationId": "38.703##-9.162",
        "creationDate": 21603711676916,
        "id": "THING#6-5260-47fd-b5da-82977ac24d6d:K7EU1:200148",
        "latitude": 338.70313489999999,
        "type": "THING",
        "thingId": "90998913-5260-47fd-b5da-82977ac24d6d:K7EU1:200148"
      },
    })
    .promise();

const getByThingId = (thingId = "WeatherDataV2#1") =>
  docClient
    .query({
      TableName: tableNameV4,
      IndexName: "typeIndex2",
      KeyConditionExpression: "#typeAlias = :type",
      // FilterExpression: "id = :thingId",
      ExpressionAttributeNames: {
        "#typeAlias": "type",
      },
      ExpressionAttributeValues: {
        ":type": "THING",
        // ":thingId": thingId,
      },
      ExclusiveStartKey: {
        type: 'THING',
        id: 'THING#6-5260-47fd-b5da-82977ac24d6d:K7EU1:200148'
      }
    })
    .promise();

const getAllByType = (type = "WeatherDataV2") =>
  docClient
    .scan({
      TableName: tableNameV4,
      // IndexName: "typeIndex",
      // KeyConditionExpression: "#typeAlias = :type",
      // ExpressionAttributeNames: {
      //   "#typeAlias": "type",
      // },
      // ExpressionAttributeValues: {
      //   ":type": type,
      // },
    })
    .promise();

const createWeatherDataV3Table = () => dynamoDB
  .createTable({
    TableName: tableNameV4,
    KeySchema: [
      // The type of of schema.  Must start with a HASH type, with an optional second RANGE.
      {
        // Required HASH type attribute
        AttributeName: "id",
        KeyType: "HASH",
      },
    ],
    AttributeDefinitions: [
      // The names and types of all primary and index key attributes only
      {
        AttributeName: "id",
        AttributeType: "S", // (S | N | B) for string, number, binary
      },
      {
        AttributeName: "type",
        AttributeType: "S", // (S | N | B) for string, number, binary
      },
      {
        AttributeName: "locationId",
        AttributeType: "S", // (S | N | B) for string, number, binary
      },
      {
        AttributeName: "lastForecastDate",
        AttributeType: "N", // (S | N | B) for string, number, binary
      },
    ],
    ProvisionedThroughput: {
      // required provisioned throughput for the table
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
    GlobalSecondaryIndexes: [
      // optional (list of GlobalSecondaryIndex)
      {
        IndexName: "typeIndex",
        KeySchema: [
          {
            // Required HASH type attribute
            AttributeName: "type",
            KeyType: "HASH",
          },
          {
            // Required HASH type attribute
            AttributeName: "lastForecastDate",
            KeyType: "RANGE",
          },
        ],
        Projection: {
          // attributes to project into the index
          ProjectionType: "KEYS_ONLY", // (ALL | KEYS_ONLY | INCLUDE)
        },
        ProvisionedThroughput: {
          // throughput to provision to the index
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
      {
        IndexName: "locationIdIndex",
        KeySchema: [
          {
            // Required HASH type attribute
            AttributeName: "locationId",
            KeyType: "HASH",
          },
        ],
        Projection: {
          // attributes to project into the index
          ProjectionType: "KEYS_ONLY", // (ALL | KEYS_ONLY | INCLUDE)
        },
        ProvisionedThroughput: {
          // throughput to provision to the index
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
      {
        IndexName: "typeIndex2",
        KeySchema: [
          {
            // Required HASH type attribute
            AttributeName: "type",
            KeyType: "HASH",
          },
        ],
        Projection: {
          // attributes to project into the index
          ProjectionType: "KEYS_ONLY", // (ALL | KEYS_ONLY | INCLUDE)
        },
        ProvisionedThroughput: {
          // throughput to provision to the index
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
    ],
  })
  .promise();

module.exports = {
  createWeatherDataV2Table,
  insertWeatherDataV2,
  getByThingId,
  getAllByType,
  createWeatherDataV3Table
};
