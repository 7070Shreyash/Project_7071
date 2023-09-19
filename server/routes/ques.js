import express from "express";
import { getFeedQues , upvoteQues ,ansQues} from "../controllers/ques.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/",verifyToken,getFeedQues);

router.patch("/:quesId/:ansId/upvote",verifyToken,upvoteQues);

router.patch("/:quesId/answer",verifyToken,ansQues);

export default router;