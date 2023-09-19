import express from "express";
import { getFeedQues , upvoteQues , ansQues } from "../controllers/ques.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/",verifyToken,getFeedQues);

router.post("/:quesId/answer",verifyToken,ansQues);

router.patch("/:quesId/upvote",verifyToken,upvoteQues);

export default router;
