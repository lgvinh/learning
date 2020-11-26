import express from "express";
const router = express.Router();
import Config from "../../../../Config/Config";
import jwtHelper from "../../../Helper/jwt.helper";
const { createConnection } = Config;
const { generateToken } = jwtHelper;
const { ACCESS_TOKEN_SECRET } = process.env;

// Signin
// example: localhost:5000/signin
router.post("/", (req, res) => {
  const { email, password } = req.body;
  createConnection.query(`select * from user where email = '${email}' and password = '${password}'`, async (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.json({
        status: 404,
        message: "Error while query to database"
      });
    } else {
      if ( result.length > 0 ) {
        let token = await generateToken(result[0], ACCESS_TOKEN_SECRET);
        res.json({
          status: 200,
          token
        });
      } else {
        res.json({
          status: 400,
          message: "Invalid email or password"
        });
      }
    }
  });
});

export default router;