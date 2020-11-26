import express from "express";
import Config from "../../../../Config/Config";
import AuthMiddleware from "../../../Middleware/AuthMiddleware";
const { isAuth, isAuthAsUser, isAuthAsAdmin } = AuthMiddleware;
const router = express.Router();
const { createConnection } = Config;
import Query from "../../../Helper/query.helper";
const { get, insert, update, del } = Query;
import moment from "moment";
import { v4 as uuid4 } from "uuid";

router.get("/", (req, res) => {
  const { limit, skip } = req.query;
  let query = get(
    "discount",
    "*",
    "", "",
    limit || 10, skip || 0
  );

  createConnection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        staatus: 400,
        message: "error while query to db"
      });
    } else {
      res.json({
        status: 200,
        pagination: {
          skip: skip || 10,
          limit: limit || 0,
          total: result.length
        },
        result
      });
    }
  });
});

export default router;