import express from "express";
import jwtHelper from "../../../Helper/jwt.helper";
import AuthMiddleware from "../../../Middleware/AuthMiddleware";
import Config from "../../../../Config/Config";
import nodemailer from "../../../Controller/SendMailController";
import bcrypt from "bcrypt";

const { createConnection } = Config;
const { isGuest } = AuthMiddleware;
const router = express.Router();
const { verifyMailToken } = jwtHelper;
const { ACCESS_TOKEN_SECRET } = process.env;
const { SendVerifyForgetPasswordMailWithTemplate } = nodemailer;

// Verify Forget Password endpoit
// example: localhost:5000/verify/forget-password with token in URL
// kiem tra token co hop le ko
router.put("/",isGuest, async (req, res) => {
    try{
        let data: any = await verifyMailToken(req.body.token, ACCESS_TOKEN_SECRET);
        //SendVerifyForgetPasswordMailWithTemplate(req.body.email, "W.A Perfume webshop sign up verification", data);
        const  {newPassword, confirmPassword, token} = req.body;
        if(newPassword === confirmPassword && newPassword.length >= 6 && confirmPassword.length>=6 ){
            createConnection.query(`select email from user where email = '${data.email}'`, async (err, result, field) => 
        {
            if ( err ) {
                console.log(err);
                res.json({
                  status: 400,
                  message: "Error while query to database"
                });
              }
            else {
                    let newPass = await bcrypt.hash(`${newPassword}`, 10);
                    createConnection.query(`update user set password = '${newPass}' where email = '${data.email}'`, (err, result, field) => {
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
                    } 
                    });
        } 
    } catch(error){
        console.log("có lỗi", error);
        res.json({
      status: 400,
      message: "Errors "
    });
    }
});


export default router;
