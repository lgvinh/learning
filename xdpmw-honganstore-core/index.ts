import express from "express";
import bodyParser from "body-parser";
// import cors from "cors";

// Set the dotenv
require("dotenv").config();

// Start the express
const app = express();

// Port
const port = process.env.PORT || 5000;

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set CORS
// app.use(cors());

// Set routes
import router from "./Api/Routes/Main";
app.use(router);

app.get("/", (req, res) => {
	res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});

// Set port for local
app.listen(port, () => console.log(`API is running at port ${port}`));