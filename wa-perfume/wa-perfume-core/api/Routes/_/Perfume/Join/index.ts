import express from "express";
import jwtHelper from "../../../../Helper/jwt.helper";
import AuthMiddleware from "../../../../Middleware/AuthMiddleware";
import Config from "../../../../../Config/Config";
import Query from "../../../../Helper/query.helper";
const router = express.Router();

import PerfumeDetail from "./PerfumeDetail";
router.use("/perfume_detail", PerfumeDetail);

import Full from "./Full";
router.use("/full", Full);

export default router;