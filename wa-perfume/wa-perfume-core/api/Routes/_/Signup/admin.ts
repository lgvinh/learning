import express from "express";
import Config from "../../../../Config/Config";
import { v4 as uuid4 } from "uuid";
import AuthMiddleware from "../../../Middleware/AuthMiddleware";

const { isAuthAsAdmin } = AuthMiddleware;
const router = express.Router();
const { createConnection } = Config;

export default router;