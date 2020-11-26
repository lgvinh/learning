import express from "express";
const router = express.Router();
import Config from "../../../../../Config/Config";
const { createConnection } = Config;
import middleware from "../../../../Middleware/AuthMiddleware";
const { isAuth, isAuthAsAdmin, isValidId_or_isAdmin } = middleware;

// Get all size and color by variant id
// localhost:5000/api/varaint/join/size-color/:id
router.get("/:id", (req, res) => {
  let query = `
    SELECT variant.variant_id, variant.cloth_id, sizes.size, colors.color, variant.price
    FROM variant 
    JOIN sizes, colors 
    WHERE 
      variant.cloth_id = ${req.params.id} 
      AND variant.color_id = colors.color_id 
      AND variant.size_id = sizes.size_id
  `;
  createConnection.query(query, (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.json({
        status: 404,
        message: "Error while query to database"
      });
    } else {
      if ( result.length > 0 ) {
        let newResult = [];
        result.forEach( item => {
          let existingSize= newResult.filter( p => p.size === item.size);
          if ( existingSize.length === 0 ) {
            newResult.push({
              size: item.size,
              colors: [
                item.color
              ]
            });
          } else {
            newResult.filter( (p, index) => {
              if ( p.size === item.size ) {
                let existingColor = p.colors.filter( c => c === item.color);
                if ( existingColor.length === 0 ) {
                  newResult[index].colors.push(item.color);
                }
              }
            });
          }
        });
        res.json({
          status: 200,
          result,
          filterSize: newResult
        });
      } else {
        res.json({
          status: 404,
          message: "This cloth doesn't have any variant yet"
        });
      }
    }
  });
});

export default router;