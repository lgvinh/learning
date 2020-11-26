import express from "express";
import Config from "../../../../Config/Config";
import e from "express";
const router = express.Router();
const { createConnection } = Config;

// Get all cloth
// example: localhost:5000/api/cloth/all
router.get("/all", (req, res) => {
  createConnection.query("select * from cloth", (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.json({
        status: 404,
        message: "error while query to database"
      });
    } else {
      res.json({
        status: 200,
        total: result.length,
        result
      });
    }
  });
});

// Get single cloth by id
// example: localhost:5000/api/cloth/single/1
router.get("/single/:id", (req, res) => {
  createConnection.query(`select * from cloth where cloth_id =  ${req.params.id}`, (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.json({
        status: 404,
        message: "error while query to database"
      });
    } else {
      res.json({
        status: 200,
        result
      });
    }
  });
});

// Get pagination cloth
// example: localhost:5000/api/cloth?skip=0&limit=10&key=""
router.get("/", (req, res) => {
  let skip = req.query.skip ? req.query.skip : 0,
      limit = req.query.limit ? req.query.limit : 10,
      key = req.query.key ? req.query.key : "";
  createConnection.query(`select * from cloth where cloth.cloth_name like '%${key}%' limit ${limit} offset ${skip} `, (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.json({
        status: 404,
        message: "error while query to database"
      });
    } else {
      res.json({
        status: 200,
        result
      });
    }
  });
});

router.get("/cate/:id", (req, res) => {
  createConnection.query(`select * from cloth where cate_id = ${req.params.id}`, (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.json({
        status: 404,
        message: "Error while query to database"
      });
    } else {
      res.json({
        status: 202,
        result
      });
    }
  });
});

export default router;