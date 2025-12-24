import { Server } from "socket.io";

export let io: Server;

export const onlineUsers = new Map<string, string>();

export function initSocket(server: any) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("addUser", (userId: string) => {
      onlineUsers.set(userId, socket.id);
      console.log("Online users:", onlineUsers);
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
    });
  });
}
