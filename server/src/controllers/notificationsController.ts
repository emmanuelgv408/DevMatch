import { Response, Request } from "express";
import { getNotificationsService } from "src/services/getNotificationsService";

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
