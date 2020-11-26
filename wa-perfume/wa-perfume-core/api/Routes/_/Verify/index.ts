import express from "express";
import Config from "../../../../Config/Config";
import jwtHelper from "../../../Helper/jwt.helper";
import { v4 as uuid4 } from "uuid";
import AuthMiddleware from "../../../Middleware/AuthMiddleware";
import nodemailer from "../../../Controller/SendMailController";

const { isAuthAsAdmin } = AuthMiddleware;
const router = express.Router();
const { createConnection } = Config;
const { SendMailWithText, SendVerifySignUpMailWithTemplate } = nodemailer;
const { generateVerifyMailToken, verifyMailToken } = jwtHelper;
const { ACCESS_TOKEN_SECRET } = process.env;

import signup from "./SignUp";
import forgetpass from "./ForgetPassword";

router.use("/signup", signup);
router.use("/forget-password", forgetpass);

export default router;