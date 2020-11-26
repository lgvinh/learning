import express from "express";
import Config from "../../../../Config/Config";
import { v4 as uuid4 } from "uuid";
import AuthMiddleware from "../../../Middleware/AuthMiddleware";
import query from "../../../Helper/query.helper";

const { isAuthAsAdmin } = AuthMiddleware;
const { get, insert, del, update } = query;
const router = express.Router();
const { createConnection } = Config;

router.get("/", isAuthAsAdmin, (req, res) => {
  const { skip, limit } = req.query;
  let query = get(
    "transaction",
    "*",
    "",
    "",
    limit || 10, skip || 0
  );
  
  createConnection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        status: 404,
        message: "Error while query to db"
      });
    } else {
      res.json({
        status: 200,
        result
      });
    }
  });
});


export default router;