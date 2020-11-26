/* eslint-disable */
const AWS = require("aws-sdk");

const localOptions = {
  region: "localhost",
  endpoint: "http://localhost:8042",
};

const dynamo = new AWS.DynamoDB(localOptions);

const documentClient = new AWS.DynamoDB.DocumentClient(localOptions);

const defaultTableName = "regulation-service";

const secondaryIndexName = {
  typeIndex: "typeIndex"
};

/**
 * Regulation factory contains createTable and CRUD methods
 * @param {AWS.DynamoDB.DocumentClient} docClient 
 * @param {AWS.DynamoDB} dynamoDB
 * @param {string} TableName - Name of dynamo table
 * @returns class RegulationManager manager 
 */
const RegulationFactory = (docClient = documentClient, dynamoDB = dynamo, TableName = defaultTableName) =>
  /**
   * Schema:
   * 
   * ```
   *  {
   *    id: string,
   *    type: string
   *    name: string
   *    required: boolean
   *    created: number
   *    country: string
   *    version: string
   *    links: {
   *      lang: string,
   *      uri: string
   *    }[],
   *  };
   * ```
   * ```
   * Primary key = {
   *  HASH: id
   * }
   * ```
   * ```
   * Secondary key = [
   *  {
   *    typeIndex: {
   *      HASH: type
   *    }
   *  }
   * ]
   * ```
   */
  class RegulationManager {
    constructor() {
      // this.id = id;
      // this.name = name;
      // this.required = required;
      // this.created = created;
      // this.version = version;
      // this.country = country;
      // this.links = links;
    }

    static createTable() {
      return dynamoDB.createTable({
        TableName,
        SSESpecification: {
          Enabled: true
        },
        AttributeDefinitions: [
          {
            AttributeName: "id",
            AttributeType: "S"
          },
          {
            AttributeName: "type",
            AttributeType: "S"
          },
        ],
        KeySchema: [
          {
            AttributeName: "id",
            KeyType: "HASH"
          }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        },
        GlobalSecondaryIndexes: [
          {
            IndexName: secondaryIndexName.typeIndex,
            KeySchema: [
              {
                AttributeName: "type",
                KeyType: "HASH"
              }
            ],
            Projection: {
              ProjectionType: "ALL"
            },
            ProvisionedThroughput: {
              ReadCapacityUnits: 3,
              WriteCapacityUnits: 3
            }
          }
        ],
      }).promise();
    }

    getAllByType(type = "REGULATION") {
      console.log("-----------------------------------------------------------------------------------------");
      console.log("");
      console.log("running getAllByType in query method with parameter type as", `"${type}"`);
      console.log("");
      console.log("-----------------------------------------------------------------------------------------");
      console.log("===================== RESULT ======================");
      return docClient.query({
        TableName,
        IndexName: secondaryIndexName.typeIndex,
        KeyConditionExpression: "#typeAtt = :type",
        // FilterExpression: "#typeAtt = :type",
        ExpressionAttributeNames: {
          "#typeAtt": "type"
        },
        ExpressionAttributeValues: {
          ":type": type
        }
      }).promise();
    }

    static _scan() {
      console.log("-----------------------------------------------------------------------------------------");
      console.log("");
      console.log("running scan method");
      console.log("");
      console.log("-----------------------------------------------------------------------------------------");
      console.log("===================== RESULT ======================");
      return docClient.scan({
        TableName
      }).promise();
    }

    /**
     * Object's properties
     * @param {object} objectProperties
     * @param {string} objectProperties.id
     * @param {string} objectProperties.type
     * @param {string} objectProperties.name
     * @param {boolean} objectProperties.required
     * @param {number} objectProperties.created
     * @param {string} objectProperties.country
     * @param {string} objectProperties.version
     * @param {{
      *  lang: string,
      *  uri: string
      * }[]} objectProperties.links
      */
    createRegulation(objectProperties) {
      console.log('objectProperties :>> ', objectProperties);
      if (!objectProperties) {
        throw new Error("object cannot be null")
      }

      const {
        id,
        name,
        required,
        created,
        version,
        country,
        links,
        type
      } = objectProperties;

      if (!id || !name || !required || !created || !version || !country || !links || !type) {
        throw new Error("object's properties cannot be null")
      }

      return docClient.put({
        TableName,
        Item: {
          id,
          name,
          required,
          created,
          version,
          country,
          links,
          type
        },
      }).promise();
    }
  }

const regulationMng = RegulationFactory();
module.exports = {
  RegulationFactory,
  regulationMng
}
        
// async create() {
//   logger.trace('Regulation - create - call start');
//   Regulation._validateConfig(this._config);
//   const params = {
//       TableName: this._config.tableName,
//       Item: {
//           id: this.id,
//           type: this.type,
//           name: this.name,
//           required: this.required,
//           created: this.created,
//           version: this.version,
//           country: this.country,
//           links: this.links,
//       },
//   };

//   logger.debug('Regulation - create - client put params', params);
//   const response = await this._client.put(params).promise();
//   logger.debug('Regulation - create - client put response', response);

//   logger.trace('Regulation - create - call end');
// }