import express, {Router} from "express"
import { createPostController, toggleLikesController  } from "../controllers/postController"

const router = Router()

router.post("/", createPostController);
router.post("/:postId/like")

export default router;