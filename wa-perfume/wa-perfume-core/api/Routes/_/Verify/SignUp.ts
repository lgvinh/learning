import express from "express";
import jwtHelper from "../../../Helper/jwt.helper";
import AuthMiddleware from "../../../Middleware/AuthMiddleware";
import Config from "../../../../Config/Config";

const { createConnection } = Config;
const { isGuest } = AuthMiddleware;
const router = express.Router();
const { verifyMailToken } = jwtHelper;
const { ACCESS_TOKEN_SECRET } = process.env;
import bcrypt from "bcrypt";

// Verify Sign up endpoit
// example: localhost:5000/verify/signup with token in body
router.post("/", isGuest, async (req, res) => {
  try {
    let data: any = await verifyMailToken(req.body.token, ACCESS_TOKEN_SECRET),
        salt = await bcrypt.genSalt(10),
        password = await bcrypt.hash(String(data.password).trim(), salt);
    const user = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      address: data.address,
      password,
      dateOfBirth: data.dateOfBirth,
      createdAt: new Date().toISOString()
    };
    createConnection.query("insert user set ?", user, (err, result, field) => {
      if ( err ) {
        console.log(err);
        res.json({
          status: 400,
          message: "Error while query to database"
        });
      } else {
        if ( result.affectedRows > 0 ) {
          res.json({
            status: 200
          });
        } else {
          res.json({
            status: 400,
            message: "No affected rows"
          });
        }
      }
    });
  } catch (error) {
    console.log("có lỗi nè", error);
    res.json({
      status: 400,
      message: "Error "
    });
  }
});

export default router;