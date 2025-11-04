import { Response, Request } from "express";
import { getNotificationsService } from "../services/getNotificationsService";
import { markAsReadService } from "../services/markAsReadService";
import { markAllAsReadService } from "../services/markAllAsReadService";

export async function getNotificationsController(req: Request, res: Response) {
  try {
    const userId = req.currentUser?.id;
    if (!userId)
      return res.status(401).json({ messsage: "Unauthorized: no user found" });

    const notifications = await getNotificationsService(userId);

    return res.status(200).json(notifications);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error Getting Notifications", error: error.message });
  }
}

export async function markAsReadController(req: Request, res: Response) {
  try {
    const userId = req.currentUser?.id;
    const {notificationId} = req.params;

    if (!userId)
      return res.status(401).json({ messsage: "Unauthorized: no user found" });

    if(!notificationId)
      return res.status(400).json({message: "Notification ID is required"})

    const readNotification = await markAsReadService(userId, notificationId);

    res.status(200).json(readNotification)

  } catch (error:any) {
    return res
    .status(500)
    .json({ message: "Error marking notification as read.", error: error.message})
  }
}

export async function markAllAsReadController(req: Request, res: Response) {
  try {
    const userId = req.currentUser?.id;

    if (!userId)
      return res.status(401).json({ message: "Unauthorized: no user found" });

    const result = await markAllAsReadService(userId);

    res.status(200).json({ message: "All notifications marked as read", result });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error marking all notifications as read", error: error.message });
  }
}