import express from "express";
import Config from "../../../../Config/Config";
import AuthMiddleware from "../../../Middleware/AuthMiddleware";
const { isAuthAsAdmin } = AuthMiddleware;
const router = express.Router();
const { createConnection } = Config;
import Query from "../../../Helper/query.helper";
const { get, insert, update, del } = Query;
import { Perfume } from "../../../Interface";
import { v4 as uuid4 } from "uuid";

// Get pagination
// example: localhost:5000/api/perfume?skip=...&limit=...
router.get("/", (req, res) => {
  const { query } = req;
  let limit: any = query.limit ? query.limit : 10,
      skip: any = query.skip ? query.skip : 0;
  const queryString = get("perfume", "*", "", "", limit, skip);

  createConnection.query(queryString, (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.json({
        status: 404,
        message: "error"
      });
    } else {
      res.json({
        status: 200,
        pagination : {
          limit,
          skip,
          total: result.length
        },
        result
      });
    }
  });
});

// Get all
// example: localhost:5000/api/perfume/all
router.get("/all", isAuthAsAdmin, (req, res) => {
  const queryString = get("perfume", "*", "", "", 0, 0);

  createConnection.query(queryString, (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.json({
        status: 404,
        message: "error"
      });
    } else {
      res.json({
        status: 200,
        result
      });
    }
  });
});

// Get perfume by perfume id
// example: localhost:5000/api/perfume/find-id/:id
router.get("/find-id/:id", (req, res) => {
  const { id } = req.params,
        queryString = get("perfume", "*", `where perfume.id = '${id}'`, "", 0, 0);

  createConnection.query(queryString, (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.json({
        status: 404,
        message: "error"
      });
    } else {
      res.json({
        status: 200,
        result: result[0]
      });
    }
  });
});

router.post("/add", isAuthAsAdmin, (req, res) => {
  const queryString = insert("perfume"),
        perfume: Perfume = {
          ...req.body,
          id: uuid4(),
          // price: 
        },
        queryStringGet = get("perfume", "*", `where perfume.sizeId = '${perfume.sizeId}' and perfume.perfumeDetailId = '${perfume.perfumeDetailId}' and perfume.producerId = '${perfume.producerId}'`);
  createConnection.query(queryStringGet, (err, result, field) => {
    if ( err ){
      console.log(err);
      res.json({
        status: 404,
        message: "error"
      });
    } else {
      if ( result.length > 0 ) {
        res.json({
          status: 400,
          message: `Duplicate sizeId: ${perfume.sizeId}, perfumeDetailId: ${perfume.perfumeDetailId}, producerId: ${perfume.producerId} on perfume: ${result[0].id}`
        });
      } else {
        createConnection.query(queryString, perfume, (err, result, field) => {
          if ( err ) {
            console.log(err);
            res.json({
              status: 404,
              message: "error"
            });
          } else {
            if ( result.affectedRows > 0 ) {
              res.json({
                status: 200,
                message: `Insert successfully on: ${perfume.id}`
              });
            } else {
              res.json({
                status: 404,
                message: `Insert fail on: ${perfume.id}`
              });
            }
          }
        });
      }
    }
  });
});

router.put("/update", isAuthAsAdmin, (req, res) => {
  const perfume: Perfume = {
    ...req.body
  };
  const query = update("perfume", `where id = '${[perfume.id]}'`);
  createConnection.query(query, perfume, (err, result, field) => {
    if (err) {
      console.log(err);
      res.json({
        status: 404,
        message: "error while query"
      });
    } else {
      if ( result.affectedRows > 0 ) {
        res.json({
          status: 200,
          message: `Updated successfully on id: ${perfume.id}`
        });
      } else {
        res.json({
          status: 404,
          message: `Updated failed, cannot find id: ${perfume.id}`
        });
      }
    }
  });
});

router.delete("/delete", isAuthAsAdmin, (req, res) => {
  const { id } = req.body,
        query = del("perfume", `where perfume.id = ${id}`);

  createConnection.query(query, (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.json({
        status: 404,
        message: "error"
      });
    } else {
     if ( result.affectedRows > 0 ) {
       res.json({
         status: 200,
         message: `Deleted successfully on id: ${id}`
       });
     } else {
      res.json({
        status: 404,
        message: `Deleted failed, cannot find id: ${id}`
      });
     }
    }
  });
});

import join from "./Join";
router.use("/join", join);

export default router;
