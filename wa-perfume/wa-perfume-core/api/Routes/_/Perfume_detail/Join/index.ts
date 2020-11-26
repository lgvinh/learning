import express from "express";
const router = express.Router();

// Get join brand table
import brand from "./brand";
router.use("/brand", brand);

export default router;