import Notification, {INotification} from "../models/Notification";

export async function getNotificationsService(userId: string) {
try {
    const notifications = Notification.find({userId})
    .sort({createdAt: -1})
    .populate("senderId", "username avatar");

    return notifications
} catch (error) {
    throw new Error("Error getting notifications")
}
    




    
}