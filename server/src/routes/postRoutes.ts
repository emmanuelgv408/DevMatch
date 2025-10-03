import express, {Router} from "express"
import { createPostController, deletePostController, toggleLikesController, getCommentsController, updatePostController  } from "../controllers/postController"
import { verifyToken } from "../middleware/authMiddleware";
const router = Router()

router.post("/", verifyToken,createPostController);
router.post("/:postId/like",verifyToken, toggleLikesController)
router.delete("/postId",verifyToken, deletePostController)
router.get("/:postId/comments", verifyToken, getCommentsController);
router.put("/:postId", verifyToken, updatePostController)


export default router;