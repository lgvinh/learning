import express from "express";
import Auth from "../../Middleware/AuthMiddleware";
import Config from "../../../Config/Config";
const { isAuth } = Auth;
const router = express.Router(),
      { createConnection } = Config;

