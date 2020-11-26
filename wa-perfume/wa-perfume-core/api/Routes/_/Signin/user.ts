import express from "express";
import Config from "../../../../Config/Config";
const router = express.Router();
import jwtHelper from "../../../Helper/jwt.helper";
import bcrypt from "bcrypt";

const { createConnection } = Config,
      { generateToken } = jwtHelper,
      { ACCESS_TOKEN_SECRET } = process.env;

router.post("/", async (req, res) => {
  const user = { 
    email: req.body.email,
    password: String(req.body.password).trim()
  };
  createConnection.query(`select * from user where email = '${user.email}' and status = 1 `, async (err, result) => {
    if ( err ) {
      console.log(err);
      res.json({
        status: "404",
        message: "error"
      });
    } else {
      if ( result.length > 0 ) {
        try {
          const check = await bcrypt.compare(user.password, result[0].password);
          if ( check ) {
            let token = await generateToken(result[0], ACCESS_TOKEN_SECRET, "7d");
            res.json({
              status: 200,
              message: "success",
              token
            });
          } else {
            res.json({
              status: 400,
              message: "Incorrect mail address or password"
            });
          }
        } catch (error) {
          res.json({
            status: 400,
            message: "Error while processing, please try again"
          });
        }
      } else {
        res.json({
          status: 400,
          message: "Incorrect mail address or password"
        });
      }
    }
  });
});

export default router;