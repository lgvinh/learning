import mysql from "mysql";

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true
});

function getConnection(): void {
  con.connect( err => {
    if (err) { throw err; }
    else { console.log("connected"); }
  });
}

export default {
  createConnection: con,
  getConnection
};