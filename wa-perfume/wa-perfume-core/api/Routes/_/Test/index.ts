import express from "express";
import AuthMiddleware from "../../../Middleware/AuthMiddleware";
const { isAuthAsAdmin, isAuth } = AuthMiddleware;
const router = express.Router();

router.get("/", isAuth, (req, res) => {
  res.send({result: req["decode"]});
});

export default router;