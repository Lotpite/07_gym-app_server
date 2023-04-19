import express from "express";
import * as User from "../controllers/user.controller";

const router = express.Router();

router.post("/registration", User.createUser);
router.post("/login", User.loginUser);
router.post("/deleteUser", User.deleteUser);
router.post("/addTrain", User.addTrainToUser);
router.post("/delete", User.deleteUser);

export default router;
