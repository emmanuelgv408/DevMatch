import express, { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { getNotificationsController } from "src/controllers/notificationsController";

const router = Router()

router.get("/", verifyToken, getNotificationsController)


export default router;