import express from "express";
import moment from "moment";
import Config from "../../../Config/Config";
import Query from "../../Helper/query.helper";
const router = express.Router(),
      { createConnection } = Config,
      { get } = Query;

const genPerfumeObject = async (obj: any) => {
  const { id, name, image, description, style, gender, musk, lastLong, releasedAt, comeFrom, status, brandId, brandName } = obj;
  try {
    let sizes = await getSizes(obj);
    if (sizes.length > 0)
      return {
        id,
        name,
        image,
        description,
        style,
        gender,
        musk,
        lastLong,
        releasedAt,
        comeFrom,
        status,
        brandId,
        brandName,
        sizes
      };
    return "error";
  } catch (error) {
    console.log("error at genPerfumeObject()", error);    
    return "error";
  }
};

const getDiscount = (obj: any): Promise<{discount: number, discountId: string}> => {
  let query = get(
    "list_discount",
    "discount.*",
    "inner join discount on discount.id = list_discount.discountId",
    `where list_discount.sizeId = '${obj.size}' and list_discount.perfumeDetailId = '${obj.id}'`,
    0, 0
  );
  return new Promise ( (resovle, reject) => {
    createConnection.query(query, (err, result) => {
      if (err) {
        console.log("getDiscount()", err);
        reject(err);
      }
      let discount: any = {
        discount: 0,
        discountId: ""
      };
      let now = moment();
      if (result.length > 0) {
        result.forEach( item => {
          let startAt = moment(item.startAt),
              endAt = moment(item.endAt);
          if ( now.isBetween(startAt, endAt) )
            discount = {
              discount: item.discount,
              discountId: item.id
            };
        });
      }
      resovle(discount);
    });
  });
};

const genSizes = async (obj: any) => {
  const { price, size } = obj;
  try {
    let producers = await getProducer(obj);
    let discount = await getDiscount(obj);
    return {
      price,
      size,
      discountId: discount.discountId,
      discount: discount.discount,
      producers
    };
  } catch (error) {
    console.log("genSizes()", error);
    return "";
  }
};

const getProducer = (obj: any): Promise<{perfumeId: string, producerId: string, producerName: string}> => {
  let query = get(
    "perfume",
    "perfume.id as perfumeId, perfume.quantity, perfume.producerId, producer.name as producerName",
    "inner join producer on producer.id = perfume.producerId",
    `where perfume.perfumeDetailId = "${obj.id}" and perfume.sizeId = '${obj.size}'`,
    0, 0
  );
  return new Promise( (resolve, reject) => {
    createConnection.query(query, (err, result) => {
      if (err) {
        console.log("getProducer()", err);
        reject(err);
      }
      resolve(result);
    });
  });
};

const getSizes = (obj: any): Promise<any[]> => {
  let query = get(
    "perfume",
    "DISTINCT perfume.sizeId as size, perfume.price, perfume.perfumeDetailId as id",
    "",
    `where perfume.perfumeDetailId = "${obj.id}" ORDER BY size`,
    0, 0
  );
  return new Promise( (resolve, reject) => {
    createConnection.query(query, async (err, result) => {
      if (err) {
        console.log("getSizes()", err);
        reject(err);
      }
      if ( result.length === 0) {
        resolve([]);
      }
      let newArr = [];
      await Promise.all(
        result.map( async item => newArr.push( await genSizes(item) ) )
      );
      resolve(newArr);
    });
  });
};

// Filter size on perfume_detail
// localhost:5000/api/filter/perfume?limit=...&skip=...&keyword=...&brand=...&size=...
router.get("/", (req, res) => {
  const { limit, skip, keyword, brand, size, id } = req.query;
  let sizeArray = String(size).split(","),
      sizeString=" and perfume.sizeId IN (";
  sizeArray.forEach((item, index) => {
    sizeString += index === 0 ? `'${item}'`: `, '${item}'`;
  });
  sizeString += ")";

  let query = get(
    "perfume_detail",
    "perfume_detail.*, brand.name as brandName",
    "inner join brand on brand.id = perfume_detail.brandId",
    `WHERE ${brand ? `brand.name like '%${brand}%' and ` : ""} ${keyword ? `perfume_detail.name like '%${String(keyword).replace(/\%/g, " ")}%' and` : ""} EXISTS (` +
      "SELECT * " +
      "FROM perfume " +
      `WHERE perfume.perfumeDetailId = perfume_detail.id ${size ? sizeString : ""}` +
    ")" +
    `${ id ? `and perfume_detail.id = '${id}'` : ""} `
    ,
    limit || 10, skip || 0
    );
  createConnection.query(query, async (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        status: 404,
        message: "error"
      });
    } else {
      let newArr = [];
      if ( !size )
        await Promise.all(
          result.map( async (item: any) => {
            newArr.push( await genPerfumeObject(item) );
          })
        );
      else 
        await Promise.all(
          result.map( async (item: any) => {
            if ( await genPerfumeObject(item) !== "error" )
              newArr.push( await genPerfumeObject(item) );
          })
        );
      res.json({
        status: 200,
        pagination: {
          limit: limit || 10,
          skip: skip || 0,
          keyword: keyword || "",
          brand: brand || "",
          size: size || "",
          id: id || "",
          total: newArr.length
        },
        result: newArr
      });
    }
  });
});

export default router;