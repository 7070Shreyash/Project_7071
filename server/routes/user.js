import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getUser, getUserFriends , addRemoveFriends } from "../controllers/user.js";

const router = express.Router();

router.get("/",verifyToken,getUser);

router.get("/:userId",verifyToken,getUserFriends);

router.patch(":/userId/add",verifyToken,addRemoveFriends);

export default router;
