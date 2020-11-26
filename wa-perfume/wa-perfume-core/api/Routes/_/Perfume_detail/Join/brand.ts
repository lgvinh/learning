import express from "express";
import Config from "../../../../../Config/Config";
import AuthMiddleware from "../../../../Middleware/AuthMiddleware";
const { isAuthAsAdmin } = AuthMiddleware;
const router = express.Router();
const { createConnection } = Config;

// Get pagination
// example: localhost:5000/api/perfume_detail/join/brand/?limit=...&skip=...
router.get("/", (req, res) => {
  const limit = req.query.limit ? req.query.limit : 10,
        skip = req.query.skip ? req.query.skip : 0;  
  var query = `
    SELECT 
      perfume_detail.*,
      brand.name as brandName,
      brand.image as brandImage
    FROM 
      perfume_detail 
    INNER JOIN 
      brand
    ON
      perfume_detail.brandId = brand.id
    LIMIT ${limit}
    OFFSET ${skip}
  `;

  createConnection.query(query, (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.json({
        status: 404,
        message: "Error while query to database"
      });
    } else {
      res.json({
        status: 200,
        pagination: {
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
// example: localhost:5000/api/perfume_detail/join/brand/all
router.get("/all", isAuthAsAdmin, (req, res) => {
  var query = `
    SELECT 
      perfume_detail.*,
      brand.name as brandName,
      brand.image as brandImage
    FROM 
      perfume_detail 
    INNER JOIN 
      brand
    ON
      perfume_detail.brandId = brand.id
  `;
  
  createConnection.query(query, (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.json({
        status: 404,
        message: "Error while query to database"
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

// Find perfume detail by id
// example: localhost:5000/api/perfume_detail/join/brand/find-id/2
router.get("/find-id/:id", (req, res) => {
  var query = `
    SELECT 
      perfume_detail.*,
      brand.name as brandName,
      brand.image as brandImage
    FROM 
      perfume_detail 
    INNER JOIN 
      brand
    ON
      perfume_detail.brandId = brand.id
    WHERE
      perfume_detail.id = '${req.params.id}'
  `;

  createConnection.query(query, (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.json({
        status: 404,
        message: "Error while query to database"
      });
    } else {
      res.json({
        status: 200,
        result: result[0]
      });
    }
  });
});

export default router;