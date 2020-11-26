import express from "express";
import Config from "../../../../Config/Config";
import AuthMiddleware from "../../../Middleware/AuthMiddleware";
import query from "../../../Helper/query.helper";

const { isAuthAsAdmin } = AuthMiddleware;
const { get, insert, del, update } = query;
const router = express.Router();
const { createConnection } = Config;

// Get pagination
// localhost:5000/api/size?limit=...&skip=&
router.get("/", (req, res) => {
  const { limit, skip } = req.query;
  let query = get(
    "size",
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
        message: "error"
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

// Get size by id
// localhost:5000/api/size/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  let query = get(
    "size",
    "*",
    "",
    `where id = '${id}'`
  );
  createConnection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        status: 404,
        message: "error"
      });
    } else {
      if ( result.length > 0 )
        res.json({
          status: 200,
          result: result[0]
        });
      else
        res.json({
          status: 404,
          message: `Cannot find size ${id}`
        });
    }
  });
});

// Add size
// localhost:5000/api/size - POST
router.post("/", isAuthAsAdmin, (req, res) => {
  let query = insert("size");
  const { id } = req.body;
  if ( id ) {
    createConnection.query(query, {id}, (err, result) => {
      if (err) {
        console.log(err);
        res.json({
          status: 400,
          message: "error while query to db"
        });
      } else {
        res.json({
          status: 200,
          message: "Create size: " + id + " success"
        });
      }
    });
  }
});

// Delete a size
// localhost:5000/api/size - Put
router.put("/:id", isAuthAsAdmin, (req, res) => {
  const { id } = req.params,
        { id: newId } = req.body;
  let query = update("size", `where id = '${id}'`);

  createConnection.query(query, {id: newId}, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        status: 400,
        message: "error while query to db"
      });
    } else {
      if ( result.affectedRows > 0 ) {
        res.json({
          status: 200,
          message: "Update size: " + id + " success"
        });
      } else {
        res.json({
          status: 404,
          message: "Update size: " + id + " fail"
        });
      }
    }
  });
});

// Delete a size
// localhost:5000/api/size - Delete
router.delete("/:id", isAuthAsAdmin, (req, res) => {
  const { id } = req.params;
  let query = del("size", `where id = '${id}'`);

  createConnection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        status: 400,
        message: "error while query to db"
      });
    } else {
      if ( result.affectedRows > 0 ) {
        res.json({
          status: 200,
          message: "Delete size: " + id + " success"
        });
      } else {
        res.json({
          status: 404,
          message: "Delete size: " + id + " fail"
        });
      }
    }
  });
});

export default router;