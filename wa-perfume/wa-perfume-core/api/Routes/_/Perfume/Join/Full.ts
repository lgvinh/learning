import express from "express";
import jwtHelper from "../../../../Helper/jwt.helper";
import AuthMiddleware from "../../../../Middleware/AuthMiddleware";
import Config from "../../../../../Config/Config";
import Query from "../../../../Helper/query.helper";
const router = express.Router(),
      { createConnection } = Config,
      { get, update } = Query;


const getPerfumeDetail = (perfume: any) => {
  let query = get("perfume_detail", "*", "", `where perfume_detail.id = '${perfume.perfumeDetailId}'`, 0, 0);
  return new Promise( (resolve, reject) => {
    createConnection.query(query, (err, result) => {
      if (err) reject(err);
      resolve(result[0]);
    });
  });
};

const getProducer = (perfume: any) => {
  let query = get("producer", "*", "", `where producer.id = '${perfume.producerId}'`, 0, 0);
  return new Promise( (resovle, reject) => {
    createConnection.query(query, (err, result) => {
      if (err) reject(err);
      resovle(result[0]); 
    });
  });
};

const createObject = async (perfume: any) => {
  const { perfumeId, perfumePrice, perfumeQuantity, sizeId } = perfume;
  try {
    let perfumeDetail = await getPerfumeDetail(perfume),
        producer = await getProducer(perfume);
    return {
      id: perfumeId,
      price: perfumePrice,
      quantity: perfumeQuantity,
      sizeId,
      perfumeDetail,
      producer
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Get full information of perfume in pagination
// example: localhost:5000/api/perfume/join/full
router.get("/", (req, res) => {
  const { limit, skip } = req.query;
  let query = get(
    "perfume",
    "perfume.id as perfumeId, perfume.price as perfumePrice, perfume.quantity as perfumeQuantity, sizeId, perfumeDetailId, producerId, perfume_detail.*, producer.name as producerName, producer.address as producerAddress",
    "INNER JOIN perfume_detail ON perfume.perfumeDetailId = perfume_detail.id INNER JOIN producer on perfume.producerId = producer.id",
    "",
    limit || 10, skip || 0
  );
  createConnection.query(query, async (err, result, fields) => {
    if (err) {
      console.log(err);
      res.json({
        status: 404,
        message : "error"
      });
    } else {
      let newArr = [];
      try {
        await Promise.all(
          result.map( async (item: any) => {
            newArr.push( await createObject(item) );
          })
        );
        res.json({
          status: 200,
          pagination: {
            limit: limit || 10,
            skip: skip || 0,
            total: result.length,
            prev: (Number(skip) || 0) !== 0,
            next: Number(result.length) === (Number(limit) || 10)
          },
          result: newArr
        });
      } catch (error) {
        console.log(error);
        res.json({
          status: 400,
          message: "error while processing, try again"
        });
      }
    }
  });
});


// Get full information of perfume by it's id
// example: localhost:5000/api/perfume/join/full/find-id/:id
router.get("/find-id/:id", (req, res) => {
  let query = get(
    "perfume",
    "perfume.id as perfumeId, perfume.price as perfumePrice, perfume.quantity as perfumeQuantity, sizeId, perfumeDetailId, producerId, perfume_detail.*, producer.name as producerName, producer.address as producerAddress",
    "INNER JOIN perfume_detail ON perfume.perfumeDetailId = perfume_detail.id INNER JOIN producer on perfume.producerId = producer.id",
    `where perfume.id = '${req.params.id}'`,
    0, 0
  );
  createConnection.query(query, async (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        status: 404,
        message: "error while query to database"
      });
    } else {
      try {
        res.json({
          status: 200,
          result: await createObject(result[0])
        });
      } catch (error) {
        res.json({
          status: 400,
          message: "error while processing, try again"
        });
      }
    }
  });
});

export default router;