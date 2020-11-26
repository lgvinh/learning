/* eslint-disable */
const {
  getMessage,
  getMessages,
  createMessage,
  updateMessage,
  deleteMessage,
} = require('./BLL/notificationMessage');

const {
  createWeatherDataV2Table,
  insertWeatherDataV2,
  getByThingId,
  getAllByType,
  createWeatherDataV3Table
} = require('./DAL/weatherApp');

const {
  regulationMng
} = require("./DAL/regulationManager");

const mockEvent = require('./__test__/__mock__/event.json');

const RegulationMng = new regulationMng();

const regulationCreateParams = {
  id: "RegulationId",
  type: "REGULATION",
  country: "es",
  created: 1602588615387,
  links: [
    {
      lang: "es",
      uri: "https://www.kaercher.com/int/condiciones-de-uso-home-garden.html"
     }
  ],
  name: "termsAndConditions",
  required: true,
  version: "2020-09-30"
};

const app = async event => {
  try {
    const result = await RegulationMng.getAllByType();
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.log('error :>> ', error); 
  }
};

app(mockEvent);

// const AWS = require("aws-sdk");
// const dynamoDB = new AWS.DynamoDB({
//   region: "localhost",
//   endpoint: "http://localhost:8042",
// });

// const app = async () => {
//   await dynamoDB.createTable({
//     TableName: "myfirstserverless-dev",
//     AttributeDefinitions: [
//       {
//         AttributeName: "messageId",
//         AttributeType: "S",
//       },
//       {
//         AttributeName: "language",
//         AttributeType: "S",
//       },
//     ],
//     KeySchema: [
//       {
//         AttributeName: "messageId",
//         KeyType: "HASH",
//       },
//       {
//         AttributeName: "language",
//         KeyType: "RANGE",
//       },
//     ],
//     ProvisionedThroughput: {
//       ReadCapacityUnits: 5,
//       WriteCapacityUnits: 5,
//     },
//   }).promise();
// };

// app();
