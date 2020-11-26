import express from "express";
const router = express.Router();
import Config from "../../../../Config/Config";
const { createConnection } = Config;

import Join from "./Join/index";

router.use("/", Join);

router.get("/single/:id", (req, res) => {
  createConnection.query(`select * from variant where cloth_id = ${req.params.id}`, (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.json({
        status: 404,
        message: "Error while query to database"
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