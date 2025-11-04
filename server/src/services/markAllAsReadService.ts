import Notification, {INotification} from "../models/Notification";


export async function markAllAsReadService(userId: string){

    const result = await Notification.updateMany(
        {userId, read: false},
        {$set: {read: true}}
    )

    if (result.matchedCount === 0) throw new Error("No unread Notifications")

    return {message: `${result.modifiedCount} notifications marked as read.`}
}