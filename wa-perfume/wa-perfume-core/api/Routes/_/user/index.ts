import express from "express";
import Config from "../../../../Config/Config";
import AuthMiddleware from "../../../Middleware/AuthMiddleware";
import { v4 as uuid4 } from "uuid";
import bcrypt from "bcrypt";
import ImageStorage from "../../../Controller/ImageStorage.controller";
import nodemailer from "../../../Controller/SendMailController";
import jwtHelper from "../../../Helper/jwt.helper";

const { isGuest } = AuthMiddleware;
const router = express.Router();
const { createConnection } = Config;
const { isAuthAsAdmin, isAuth, isValidId_or_isAdmin, isAuthAsUser } = AuthMiddleware;
const { UploadBase64Image, DeleteImage } = ImageStorage;
const { SendVerifyForgetPasswordMailWithTemplate } = nodemailer;
const { generateVerifyMailToken } = jwtHelper;
const { ACCESS_TOKEN_SECRET } = process.env;
// Get all user
// example: localhost:5000/api/user/all
router.get("/all", isAuthAsAdmin, (req, res) => {
  createConnection.query("select * from user", (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.status(400).json({
        message: "error"
      });
    } else {
      res.json({
        status : 200,
        result
      });
    }
  });
});

// Get info user
// example: localhost:5000/api/user/info
router.get("/info", isAuth, isAuthAsUser, (req, res) => {
  const { data } = req["decode"];
  createConnection.query(`select id, avatar, firstName, lastName, email, address, phone, point, status, dateOfBirth from user where id = '${data.id}'`, (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.json({
        status: 404,
        message: "Error while query to database"
      });
    } else {
      res.json({
        status: 200,
        result: result[0]
      });
    }
  });
});

// Get single user by id
// example: localhost:5000/api/user/find-id/:id
router.get("/find-id/:id", isAuth, isValidId_or_isAdmin, (req, res) => {
  createConnection.query(`select * from user where id = '${req.params.id}'`, (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.status(400).json({
        message: "error"
      });
    } else {
      if (result.length > 0)
        res.json({
          status : 200,
          result : result[0]
        });
        else {
            res.json ({
              status: 404,
              message: "Cannot by users id: " + req.params.id
            });
        }
      }
  });
});

// Get pagination
// example: localhost:5000/api/user?limit=...&skip=...
router.get("/", isAuthAsAdmin, (req, res) => {
  const limit = req.query.limit ? req.query.limit : 10,
        skip = req.query.skip ? req.query.skip : 0;
  
  createConnection.query(`select * from user limit ${limit} offset ${skip}`, (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.status(400).json({
        message: "error"
      });
    } else {
      res.json({
        pagination: {
          limit,
          skip,
          total: result.length
        },
        result
      });
    }
  });
});

// Create a new user
// example: localhost:5000/api/user/add
router.post("/add", isAuthAsAdmin, (req, res) => {
  let date = new Date(),
      createdAt = date.toISOString();
  const user = { id: uuid4(), status: 1, createdAt, ...req.body };

  createConnection.query(`select * from user where phone = '${user.phone}'`, (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.status(400).json({
        message: "error"
      });
    } else {
      if ( result.length === 0 ) {
        createConnection.query("insert into user set ?", user, (err, result, field) => {
          if ( err ) {
            console.log(err);
            res.status(400).json({
              message: "error"
            });
          } else {
            res.json({
              message: "success"
            });
          }
        });
      } else {
        res.status(400).json({
          message: "error"
        });
      }
    }
  });
});

// update a user
// example: localhost:5000/api/user/update
router.put("/update", isAuth, isValidId_or_isAdmin, async (req, res) => {
  const { id, avatar, firstName, lastName, phone, address, dateOfBirth } = req.body;
  let oldAvatar: string = "",
      split: any = "",
      oldAvatarName: string = "";
  let deleteResult: any = "",
      upload: any = "";
  try {
    createConnection.query(`select avatar from user where id = '${id}'`, async (err, result) => {
      if (err) {
        console.log(err);
        res.json({
          status: 400,
          message: "error"
        });
      } else {
        const user = {
                firstName,
                lastName,
                phone,
                address,
                dateOfBirth
              };
        if (avatar) {
          if (result.length > 0 && result[0].avatar) {
            oldAvatar = result[0].avatar;
            split = oldAvatar.split("/");
            oldAvatarName = split[split.length - 1].split(".")[0];
            deleteResult = await DeleteImage(oldAvatarName);
          }
          upload = await UploadBase64Image(avatar);
          user["avatar"] = upload.url;
        }

        createConnection.query(`update user set ? where id = '${id}'`, user, (err, result, field) => {
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
  } catch (error) {
    console.log(error);
    res.json({
      status: 400,
      message: "error"
    });
  }
});
// update a status
// example: localhost:5000/api/user/update-status
router.put("/update-status", isAuth, isAuthAsAdmin, async (req, res) => {
  const { id, status } = req.body;
  try {
        createConnection.query(`update user set status = '${status}' where id = '${id}'`, (err, result, field) => {
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
  } catch (error) {
    console.log(error);
    res.json({
      status: 400,
      message: "error"
    });
  }
});

// update password
// example: localhost:5000/api/user/update-password
router.put("/update-password", isAuth, isValidId_or_isAdmin, (req, res) => {
  const { id, oldPass, pass, confirmPass } = req.body;
  if ( pass === confirmPass && pass.length >= 6 ) {
    createConnection.query(`select * from user where id = '${id}'`, async (err, result, field) => {
      if (err) {
        console.log(err);
        res.json({
          status: 400,
          message: "error"
        });
      } else {
        let check = await bcrypt.compare(String(oldPass).trim(), result[0].password);
        if (check) {
          let newPassword = await bcrypt.hash(`${pass}`, 10);
          createConnection.query(`update user set password = '${newPassword}' where id = '${id}'`, (err, result, field) => {
            if ( err ) {
              console.log(err);
              res.json({
                status: 400,
                message: "error"
              });
            } else {
              if ( result.affectedRows > 0 ) {
                res.json({
                  status: 200,
                  message: "success"
                });
              }
              else {
                res.json({
                  status: 404,
                  message: "Update failed"
                });
              }
            }
          });
        } else {
          res.json({
            status: 400,
            message: "Invalid old password"
          });
        }
      }
    });
  } else {
    res.json({
      status: 400,
      message: "Incorrect password type or re-password, make sure password's length is greater than 5"
    });
  }
});
//Forget Password
//example: localhost:5000/api/user/forget-password
router.post("/forget-password", isGuest, (req, res) => {
    const {email} = req.body;
    if ( email ) {
      createConnection.query(`select email from user where email= '${email}'`, async (err , result) =>
      {
        if(err)
        {
          console.log("/api/user/forget-password", err);
          res.json({
            status : 400,
            message : "error"
          });
        } else {
          if(result.length >0)
          { 
            try {
              let token: any = await generateVerifyMailToken({email}, ACCESS_TOKEN_SECRET, "15m");
              SendVerifyForgetPasswordMailWithTemplate(email, "W.A Perfume webshop forget password verification", token);
              res.json({
                status : 200,
                message : "success"
              }); 
            } catch (error) {
              console.log("error while processing", error);
              res.json({
                status : 404,
                message : "Error while processing"
              });
            }
          } else {
            res.json ({
              status : 404,
              message : "invalid email"
            });
          }
        }
      });
    } else {
      res.json({
        status: 404,
        message: "email must be provided"
      });
    }
});
// Delete a user
// example: localhost:5000/api/user/delete
router.delete("/:id", isAuthAsAdmin, (req, res) => {
  const { id } = req.params;
  createConnection.query(`delete from user where id = '${id}'`, (err, result, field) => {
    if ( err ) {
      console.log(err);
      res.status(400).json({
        message: "error"
      });
    } else {
      if ( result.affectedRows > 0 ) {
        res.json({
          message: "success"
        });
      } else {
        res.status(400).json({
          message: "error"
        });
      }
    }
  });
});

export default router;