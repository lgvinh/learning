import express from "express";
import Config from "../../Config/Config";
const router = express.Router();
const { getConnection } = Config;

// Connect to mysql
getConnection();

// Importing route
import perfume_detail from "./_/Perfume_detail/Index";
import signin from "./_/Signin";
import signup from "./_/Signup";
import brand from "./_/Brand";
import size from "./_/Size";
import test from "./_/Test";
import user from "./_/User";
import admin from "./_/Admin";
import verify from "./_/Verify";
import perfume from "./_/Perfume";
import filter from "./Filter";
import order from "./_/Order";
import order_detail from "./_/Order_detail";
import transaction from "./_/Transaction";
import transaction_detail from "./_/Transaction_detail";
import producer from "./_/Producer";
import discount from "./_/Discount";

// Configuring Route
router.use("/api/perfume_detail", perfume_detail);
router.use("/api/filter", filter);
router.use("/api/perfume", perfume);
router.use("/signin", signin);
router.use("/signup", signup);
router.use("/api/brand", brand);
router.use("/api/user", user);
router.use("/api/admin", admin);
router.use("/verify", verify);
router.use("/test", test);
router.use("/api/order", order);
router.use("/api/size", size);
router.use("/api/order_detail", order_detail);
router.use("/api/transaction", transaction);
router.use("/api/transaction_detail", transaction_detail);
router.use("/api/producer", producer);
router.use("/api/discount", discount);



export default router;