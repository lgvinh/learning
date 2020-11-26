import express from "express";
import Config from "../../../../Config/Config";
const router = express.Router();
const { createConnection } = Config;
import jwtHelper from "../../../Helper/jwt.helper";
import bcrypt from "bcrypt";

const { generateToken } = jwtHelper,
      { env: { ACCESS_TOKEN_SECRET } } = process;

router.post("/", (req, res) => {
  const admin = { 
    email: req.body.email,
    password: String(req.body.password).trim()
  };

  createConnection.query(`select * from admin where email = '${admin.email}'`, async (err, result) => {
    if ( err ) {
      console.log(err);
      res.json({
        status: 400,
        message: "error"
      });
    } else {
      if ( result.length > 0 ) {
        try {
          const check = await bcrypt.compare(admin.password, result[0].password);
          if ( check ) {
            const { id, phone, name, email, createdAt } = result[0];
            let admin = { id, phone, name, email, createdAt };
            let token = await generateToken(admin, ACCESS_TOKEN_SECRET, '8h', 0);
            res.json({
              status: 200,
              message: "Login admin success",
              token
            });
          } else {
            res.json({
              status: 400,
              message: "invalid phone number or password"
            });
          }
        } catch (error) {
          console.log(error);
          res.json({
            status: 404,
            message: "Error while proccing"
          });
        }
      } else {
        res.json({
          status: 404,
          message: "invalid phone number or password"
        });
      }
    }
  });
});

export default router;