/* eslint-disable no-console */
import express from "express";
import { createConnection } from "typeorm";
import cors from "cors";
// import cors from "cors";

// Set the dotenv
require("dotenv").config();

// Start the express
const app = express();

// Port
const port = process.env.PORT || 5000;

// bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set CORS
app.use(cors({
  origin: "*",
  methods: ["get", "post", "put", "delete"],
}));

// // Set routes
// app.use(router);

app.get("/", (req, res) => {
	res.json("worked!!");
});

console.log('\n\nStarting project \x1b[32m' + (process.env.PROJECT_NAME || "ExpressTypeORM") + '\x1b[0m with \x1b[32m' + (process.env.NODE_ENV || "development") + '\x1b[0m mode....\n');
createConnection().then(() => {
  app.listen(port, () => {
    console.log('Http server is ready', '\x1b[32m', 'http://localhost:5000' + '\x1b[0m');
  });
}).catch(error => console.log('\x1b[31m', error.message, '\x1b[0m'));
