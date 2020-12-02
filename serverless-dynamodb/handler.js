'use strict';
const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient({
  region: "localhost",
  endpoint: "http://localhost:8042",
});

module.exports.hello = async (event, context) => {
  const test = await docClient.scan({
    TableName: "petShop",
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        test,
      },
      null,
      2
    ),
  };
};
