import Notification, {INotification} from "../models/Notification";


export async function markAsReadService(userId: string, notificationId: string){

    const notification = await Notification.findOne({_id: notificationId, userId})
    if (!notification) throw new Error("Cant find notification")

    if(notification.read){
        return notification
    }
    else{
        notification.read = true
        await notification.save();
        return notification;
    }

}