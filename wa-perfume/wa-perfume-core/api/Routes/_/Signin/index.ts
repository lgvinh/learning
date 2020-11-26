import express from "express";
const router = express.Router();

// user
import user from "./user";
router.use("/user", user);

// admin
import admin from "./admin";
router.use("/admin", admin);

export default router;