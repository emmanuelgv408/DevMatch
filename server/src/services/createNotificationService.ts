import Notification, {INotification} from "../models/Notification";

export async function createNotificationService(userId: string, senderId: string, type: "like" | "comment" | "follow", postId?: string) {

    try {
        
        if (userId===senderId) throw new Error("Can't notify self")

        const newNotification = new Notification({
            userId,
            senderId,
            type,
            postId,
          });
      
          const savedNotification = await newNotification.save();
          return savedNotification;


    } catch (error) {
        throw new Error("Failed to create notification: " + error)
    }
    
}