import express from "express";
import jwtHelper from "../../../../Helper/jwt.helper";
import AuthMiddleware from "../../../../Middleware/AuthMiddleware";
import Config from "../../../../../Config/Config";
import Query from "../../../../Helper/query.helper";
const router = express.Router(),
      { createConnection } = Config,
      { get, update } = Query;


// Get all perfume join perfume detail
// example: localhost:5000/api/perfume/join/perfume_detail?keyword=...
router.get("/", (req, res) => {
  const { keyword } = req.query;
  let query = get(
    "perfume_detail",
    "perfume_detail.*, perfume.id as perfumeId, perfume.price as perfumePrice, perfume.quantity as perfumeQuantity, sizeId, perfumeDetailId, producerId", 
    "inner join perfume on perfume_detail.id = perfume.perfumeDetailId",
    `${ keyword ? `where perfume_detail.name like '%${keyword}%'` : "" }`, 
    0, 0
    );
  createConnection.query(query, (err, result, fields) => {
    if (err) {
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

// Refresh all perfume
// example: localhost:5000/api/perfume/join/perfume_detail/refresh
router.get("/refresh", (req, res) => {
  let query = get(
    "perfume_detail",
    "perfume_detail.*, perfume.id as perfumeId, perfume.price as perfumePrice, perfume.quantity as perfumeQuantity, sizeId, perfumeDetailId, producerId", 
    "inner join perfume on perfume_detail.id = perfume.perfumeDetailId",
    "", 
    0, 0
    );
  createConnection.query(query, (err, result, fields) => {
    if (err) {
      console.log(err);
      res.json({
        status: 404,
        message: "error"
      });
    } else {
      result.forEach( item => {
        let price = item.price * item.sizeId.replace("ml", ""),
            perfume = {
              price,
              quantity: item.perfumeQuantity,
              sizeId: item.sizeId,
              perfumeDetailId: item.perfumeDetailId,
              producerId: item.producerId
            },
            query = update("perfume", `where perfume.id = '${item.perfumeId}'`);
        createConnection.query(query, perfume, (err, result, fields) => {
          if (err) {
            console.log(err);
          }
        });
      });
      res.json({
        status: 200,
        message: "refresh complete"
      });
    }
  });
});

// Get perfume by producer id
// example: localhost:5000/api/perfume/join/perfume_detail/find-producer/:id
router.get("/find-producer/:id", (req, res) => {
  const { id } = req.params,
        queryString = get(
          "perfume_detail",
          "perfume_detail.*, perfume.id as perfumeId, perfume.price as perfumePrice, perfume.quantity as perfumeQuantity, sizeId, perfumeDetailId, producerId", 
          "inner join perfume on perfume_detail.id = perfume.perfumeDetailId",
          `where perfume.producerId = '${id}'`, 
          0, 0
          );

  createConnection.query(queryString, (err, result) => {
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

export default router;