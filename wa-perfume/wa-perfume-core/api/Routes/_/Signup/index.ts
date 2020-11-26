import express from "express";
import Config from "../../../../Config/Config";
import { v4 as uuid4 } from "uuid";
import AuthMiddleware from "../../../Middleware/AuthMiddleware";

const { isAuthAsAdmin } = AuthMiddleware;
const router = express.Router();
const { createConnection } = Config;

import user from "./user";
import admin from "./admin";

router.use("/user", user);
router.use("/admin", admin);

export default router;