import express from "express";
import Config from "../../Config/Config";
const router = express.Router();
const { getConnection } = Config;

// Connect to mysql
getConnection();

// Import route
import cloth from "./_/Cloth";
import signin from "./_/SignIn";
import signup from "./_/SignUp";
import user from "./_/User";
import variant from "./_/Variant";

// Config route
router.use("/api/cloth", cloth);
router.use("/signin", signin);
router.use("/api/user", user);
router.use("/signup", signup);
router.use("/api/variant", variant);

export default router;