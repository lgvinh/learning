import express from "express";
const router = express.Router();

// Import routes
import perfume from "./Perfume";
import order from "./Order";

// Config routes
router.use("/perfume", perfume);
router.use("/order", order);

export default router;