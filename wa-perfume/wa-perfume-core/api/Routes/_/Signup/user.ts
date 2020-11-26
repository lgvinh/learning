import express from "express";
import jwtHelper from "../../../Helper/jwt.helper";
import { v4 as uuid4 } from "uuid";
import AuthMiddleware from "../../../Middleware/AuthMiddleware";
import ValidateMiddleware from "../../../Middleware/ValidateMiddleware";
import nodemailer from "../../../Controller/SendMailController";

const { isGuest } = AuthMiddleware;
const { validateSignUp } = ValidateMiddleware;
const router = express.Router();
const { SendVerifySignUpMailWithTemplate } = nodemailer;
const { generateVerifyMailToken } = jwtHelper;
const { ACCESS_TOKEN_SECRET } = process.env;

router.post("/", isGuest, validateSignUp, async (req, res) => {
  try {
    let data = {...req.body, id: uuid4()},
        token: any = await generateVerifyMailToken(data, ACCESS_TOKEN_SECRET, "15m");
    SendVerifySignUpMailWithTemplate(req.body.email, "W.A Perfume webshop sign up verification", token, req.body.firstName);
    res.json({
      status: 200,
      message: "Sign up success, please check your email for the verification"
    });
  } catch (error) {
    res.json({
      status: 400,
      message: "Error while processing, please try again"
    });
  }
});

export default router;