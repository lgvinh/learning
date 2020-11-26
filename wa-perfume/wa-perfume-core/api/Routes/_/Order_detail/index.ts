import express from "express";
import Config from "../../../../Config/Config";
import AuthMiddleware from "../../../Middleware/AuthMiddleware";
const { isAuthAsAdmin } = AuthMiddleware;
const router = express.Router();
const { createConnection } = Config;
import Query from "../../../Helper/query.helper";
const { get, insert, update, del } = Query;


router.get("/reset", (req, res) => {
  let query = get(
    "order_detail", 
    "p.price, o.id",
    "as o inner join perfume as p on p.id = o.perfumeId",
    "",
    1000, 0
  );
  createConnection.query(query, async (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        status: 400,
        message: "error while query to db"
      });
    } else {
      await Promise.all(
        result.map( item => {
          let updateQuery = `
            UPDATE order_detail
            SET price = ${item.price}
            WHERE order_detail.id = '${item.id}'
          `;
          createConnection.beginTransaction( error => {
            if (error) throw error;
            createConnection.query(updateQuery, er => {
              if (er) {
                console.log(er);
                createConnection.rollback(() => {
                  throw er;
                });
              }
            });
          });
        })
      );
      createConnection.commit();
      res.json({
        status: 200,
        message: "reset order_detail success",
        result
      });
    }
  });
});

export default router;