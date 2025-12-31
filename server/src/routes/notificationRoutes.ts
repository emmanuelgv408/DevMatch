import express, { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { getNotificationsController, markAsReadController, markAllAsReadController, getUnreadNotificationsCountController } from "src/controllers/notificationsController";

const router = Router()

router.get("/", verifyToken, getNotificationsController)
router.patch("/:notificationId/read", verifyToken, markAsReadController);
router.patch("/read/all", verifyToken, markAllAsReadController);
router.get("/unread/count", verifyToken, getUnreadNotificationsCountController);


export default router;