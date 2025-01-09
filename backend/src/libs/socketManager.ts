import { Server } from "http";
import { JwtPayload, verify } from "jsonwebtoken";
import { Socket, Server as SocketIO } from "socket.io";
import authConfig from "../config/auth";
import { BadRequestError } from "../errors/AppError";

export class SocketManager {
  private static instance: SocketManager;
  private io: SocketIO | null = null;

  private constructor() {}

  public static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  public initializeIO(httpServer: Server): SocketIO {
    this.io = new SocketIO(httpServer, {
      cors: {
        origin: process.env.FRONTEND_URL,
      },
    });

    this.io.on("connection", this.handleConnection.bind(this));
    return this.io;
  }

  public getIO(): SocketIO {
    if (!this.io) {
      throw new BadRequestError("Socket IO not initialized");
    }
    return this.io;
  }

  private handleConnection(socket: Socket): Socket {
    const { token } = socket.handshake.query;

    try {
      const tokenData: JwtPayload = this.verifyToken(token as string);
      console.debug(JSON.stringify(tokenData), "io-onConnection: tokenData");
    } catch (error) {
      console.error(JSON.stringify(error), "Error decoding token");
      socket.disconnect();
      return socket;
    }

    console.info("Client Connected");

    this.setupSocketEvents(socket);

    return socket;
  }

  private verifyToken(token: string): JwtPayload {
    return verify(token, authConfig.secret) as JwtPayload;
  }

  private setupSocketEvents(socket: Socket): void {
    socket.on("joinChatBox", (ticketId: string) => {
      console.info("A client joined a ticket channel");
      socket.join(ticketId);
    });

    socket.on("joinNotification", () => {
      console.info("A client joined notification channel");
      socket.join("notification");
    });

    socket.on("joinTickets", (status: string) => {
      console.info(`A client joined to ${status} tickets channel.`);
      socket.join(status);
    });

    socket.on("disconnect", () => {
      console.info("Client disconnected");
    });
  }
}

// Export a singleton instance
export const socketManager = SocketManager.getInstance();
