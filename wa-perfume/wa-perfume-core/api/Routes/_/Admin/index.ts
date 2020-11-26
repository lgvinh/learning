import express from "express";
import Config from "../../../../Config/Config";
import AuthMiddleware from "../../../Middleware/AuthMiddleware";
import { v4 as uuid4 } from "uuid";
import bcrypt from "bcrypt";
import  ImageStorage from "../../../Controller/ImageStorage.controller";
import nodemailer from "../../../Controller/SendMailController";
import jwtHelper from "../../../Helper/jwt.helper";

import query from "../../../Helper/query.helper";
const { get } = query;
const router = express.Router();
const { createConnection } = Config;
const { isAuth, isAuthAsAdmin } = AuthMiddleware;
const { UploadBase64Image, DeleteImage } = ImageStorage;
const { SendVerifyForgetPasswordMailWithTemplate } = nodemailer;
const { generateVerifyMailToken } = jwtHelper;
const { ACCESS_TOKEN_SECRET } = process.env;

router.get("/info", isAuthAsAdmin, (req, res) => {
  let query = get(
    "admin",
    "id, phone, name, email, createdAt",
    "",
    `where admin.id = '${req["decode"].data.id}'`
  );
  createConnection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        status: 400,
        message: "error"
      });
    } else {
      res.json({
        status: 200,
        result: result[0]
      });
    }
  });
});

// update a admin
// example: localhost:5000/api/admin/update
router.put("/update", isAuth, isAuthAsAdmin, async (req, res) => {
  const { id, phone, name, email } = req.body;
  console.log("id",id);
  if ( id != null ) {
    createConnection.query(`select * from admin where id = '${id}'`, async (err, result, field) => {
      if (err) {
        console.log(err);
        res.json({
          status: 400,
          message: "error"
        });
      } else {
        createConnection.query(`update admin set phone = '${phone}', name ='${name}', email = '${email}' where id = '${id}'`, (err, result, field) => {
          if ( err ) {
            console.log(err);
            res.json({
              status: 400,
              message: "error"
            });
          } else {
            if ( result.affectedRows > 0) {
              res.json({
                status: 200,
                message: "success"
              });
            } else {
              res.json({
                status: 404,
                message: `Update failed, cannot find id ${req.params.id}` 
              });
            }
          }
        });
      }
    });
  } else {
    res.json({
      status: 400,
      message: "errorrrr"
    });
  }
});

export default router;