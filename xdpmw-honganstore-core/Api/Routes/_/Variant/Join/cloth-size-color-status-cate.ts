import express from "express";
const router = express.Router();
import Config from "../../../../../Config/Config";
const { createConnection } = Config;
import middleware from "../../../../Middleware/AuthMiddleware";
const { isAuth, isAuthAsAdmin, isValidId_or_isAdmin } = middleware;

// Get all variant
// example: localhost:5000/api/variant/join/full/all
router.get("/all", (req, res) => {
  let query = `
    SELECT 
      variant_id,
      variant_stock,
      price,
      sold,
      cloth.cloth_id,
      cloth.cloth_name,
      description,
      brand,
      img_1,
      img_2,
      img_3,
      status_list.status_id,
      status_list.status,
      category.cate_id,
      category.cate_name,
      colors.color_id,
      colors.color,
      sizes.size_id,
      sizes.size
    FROM 
      variant
    JOIN
      cloth, colors, sizes, status_list, category
    WHERE
      variant.cloth_id = cloth.cloth_id
      AND variant.size_id = sizes.size_id
      AND variant.color_id = colors.color_id
      AND cloth.status = status_list.status_id
      AND cloth.cate_id = category.cate_id
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

// Get all cloth's variant through cloth id
// example: localhost:5000/api/variant/join/full/single/:id
router.get("/single/:id", (req, res) => {
  let query = `
    SELECT 
      variant_id,
      variant_stock,
      price,
      sold,
      cloth.cloth_id,
      cloth.cloth_name,
      description,
      brand,
      img_1,
      img_2,
      img_3,
      status_list.status_id,
      status_list.status,
      category.cate_id,
      category.cate_name,
      colors.color_id,
      colors.color,
      sizes.size_id,
      sizes.size
    FROM 
      variant
    JOIN
      cloth, colors, sizes, status_list, category
    WHERE
      variant.cloth_id = cloth.cloth_id
      AND variant.size_id = sizes.size_id
      AND variant.color_id = colors.color_id
      AND cloth.status = status_list.status_id
      AND cloth.cate_id = category.cate_id
      AND variant.cloth_id = ${req.params.id}
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
        result
      });
    }
  });
});

router.get("/", (req, res) => {
  let limit = req.query.limit ? req.query.limit : 10,
      skip =  req.query.skip ? req.query.skip : 0;
  let query = `
    SELECT 
      variant_id,
      variant_stock,
      price,
      sold,
      cloth.cloth_id,
      cloth.cloth_name,
      description,
      brand,
      img_1,
      img_2,
      img_3,
      status_list.status_id,
      status_list.status,
      category.cate_id,
      category.cate_name,
      colors.color_id,
      colors.color,
      sizes.size_id,
      sizes.size
    FROM 
      variant
    JOIN
      cloth, colors, sizes, status_list, category
    WHERE
      variant.cloth_id = cloth.cloth_id
      AND variant.size_id = sizes.size_id
      AND variant.color_id = colors.color_id
      AND cloth.status = status_list.status_id
      AND cloth.cate_id = category.cate_id
    LIMIT ${limit} OFFSET ${skip}
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

router.get("/cate/:id", (req, res) => {
  let query = `
    SELECT 
      variant_id,
      variant_stock,
      price,
      sold,
      cloth.cloth_id,
      cloth.cloth_name,
      description,
      brand,
      img_1,
      img_2,
      img_3,
      status_list.status_id,
      status_list.status,
      category.cate_id,
      category.cate_name,
      colors.color_id,
      colors.color,
      sizes.size_id,
      sizes.size
    FROM 
      variant
    JOIN
      cloth, colors, sizes, status_list, category
    WHERE
      variant.color_id = colors.color_id
      AND cloth.status = status_list.status_id
      AND cloth.cate_id = category.cate_id
      AND variant.size_id = sizes.size_id
      AND cloth.cate_id = ${req.params.id}
      AND variant.cloth_id = cloth.cloth_id
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
        result
      });
    }
  });
});

export default router;