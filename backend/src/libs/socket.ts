import { Server } from "http";
import { verify } from "jsonwebtoken";
import { Server as SocketIO } from "socket.io";
import authConfig from "../config/auth";
import { BadRequestError } from "../errors/AppError";

let io: SocketIO;

export const initIO = (httpServer: Server): SocketIO => {
  io = new SocketIO(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    const { token } = socket.handshake.query;

    let tokenData = null;

    try {
      tokenData = verify(token as string, authConfig.secret);
      console.info(JSON.stringify(tokenData), "io-onConnection: tokenData");
    } catch (error) {
      console.error(JSON.stringify(error), "Error decoding token");
      socket.disconnect();
      return io;
    }

    console.info("Client connected");

    socket.on("joinChatBox", (ticketId: string) => {
      console.info("A cliente joined a ticket channel");
      socket.join(ticketId);
    });

    socket.on("joinNotification", () => {
      console.info("A cliente joined a notification channel");
      socket.join("notification");
    });

    socket.on("joinTickets", (status: string) => {
      console.info(`A cliente joined a ${status} channel`);
      socket.join(status);
    });

    socket.on("disconnect", () => {
      console.info("Client disconnected");
    });
  });

  return io;
};

export const getIO = (): SocketIO => {
  if (!io) {
    throw new BadRequestError("Socket IO not initialized");
  }
  return io;
};
