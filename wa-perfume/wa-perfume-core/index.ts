import express from "express";
import cors from "cors";

// Set the dotenv
require("dotenv").config();

// Start the express
const app = express();

// Port
const port = process.env.PORT || 5000;

// Only accept requests json type
app.use(express.json({limit: "50mb"}));

// Set CORS
app.use(cors());

// Set routes
import router from "./Api/Routes/Main";
app.use(router);

app.get("/", (req, res) => {
	res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});

// Set port for local
app.listen(port, () => console.log(`API is running at port ${port}`));