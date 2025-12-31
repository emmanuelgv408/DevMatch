import Notification, {INotification} from "../models/Notification"

export async function getUnreadNotificationCountService(userId: string) {
    const count = Notification.countDocuments({userId, read: false})
    return count
}