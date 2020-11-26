import express from "express";
import Config from "../../../../Config/Config";
import { v4 as uuid4 } from "uuid";
import AuthMiddleware from "../../../Middleware/AuthMiddleware";
import query from "../../../Helper/query.helper";

const { isAuthAsAdmin } = AuthMiddleware;
const { get, insert, del, update } = query;
const router = express.Router();
const { createConnection } = Config;


export default router;