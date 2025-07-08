import express from "express";
import { register, loginUser } from "../controllers/Auth.controller.js";

const router = express.Router();

//register
router.post("/register", register);

//login
router.post("/login", loginUser);

router.get("/test", (req, res) => {
  res.send("✅ Route working");
});

export default router;
