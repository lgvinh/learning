import mysql from "mysql";

let { NODE_ENV, DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_AZURE_HOST, DB_AZURE_USER, DB_AZURE_PASS, DB_AZURE_NAME } = process.env;

let host = NODE_ENV.trim() === 'development' ? DB_HOST : DB_AZURE_HOST,
    user = NODE_ENV.trim() === "development" ? DB_USER : DB_AZURE_USER,
    password = NODE_ENV.trim() === "development" ? DB_PASS : DB_AZURE_PASS,
    database = NODE_ENV.trim() === "development" ? DB_NAME : DB_AZURE_NAME;

const con = mysql.createConnection({
  host,
  user,
  password,
  database,
  // port: 3306,
  multipleStatements: true
});


function getConnection(): void {
  con.connect( err => {
    if (err) { throw err; }
    else {
      console.log("Running in:", NODE_ENV ? NODE_ENV : "production" );
      console.log("At host:", host);
     }
  });
}

export default {
  createConnection: con,
  getConnection
};