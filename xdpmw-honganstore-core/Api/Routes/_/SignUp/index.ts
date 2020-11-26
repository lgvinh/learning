import express from "express";
import Config from "../../../../Config/Config";
const router = express.Router();
const { createConnection } = Config;

// Sign up endpoint
// example: localhost:5000/signup
router.post("/", (req, res) => {
  const user = {...req.body, role: 0};
  createConnection.query(`select * from user where email = '${user.email}'`, (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.json({
        status: 404,
        message: "Invalid field, cannot signup"
      });
    } else {
      if ( result.length === 0 ) {
        createConnection.query("insert ignore into user set ?", user, (err, result, field) => {
          if ( err ) {
            console.log(err);
            res.json({
              status: 404,
              message: "Invalid field, cannot signup"
            });
          } else {
            res.json({
              status: 200,
              message: "Sign up success"
            });
          }
        });
      } else {
        res.json({
          status: 400,
          message: "Already have that email"
        });
      }
    }
  });
});

export default router;
