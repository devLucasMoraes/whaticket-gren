import qrCode from "qrcode-terminal";
import { Client, LocalAuth } from "whatsapp-web.js";
import { Whatsapp } from "../entities/Whatsapp";
import { BadRequestError } from "../errors/AppError";
import { handleMessage } from "../services/WbotServices/wbotMessageListener";
import { socketManager } from "./socketManager";

interface Session extends Client {
  id?: number;
}

export class WhatsAppManager {
  private static instance: WhatsAppManager;
  private sessions: Session[] = [];

  private constructor() {}

  public static getInstance(): WhatsAppManager {
    if (!WhatsAppManager.instance) {
      WhatsAppManager.instance = new WhatsAppManager();
    }
    return WhatsAppManager.instance;
  }

  private async syncUnreadMessages(wbot: Session): Promise<void> {
    const chats = await wbot.getChats();

    for (const chat of chats) {
      if (chat.unreadCount > 0) {
        const unreadMessages = await chat.fetchMessages({
          limit: chat.unreadCount,
        });

        for (const msg of unreadMessages) {
          await handleMessage(msg, wbot);
        }

        await chat.sendSeen();
      }
    }
  }

  public async initWbot(whatsapp: Whatsapp): Promise<Session> {
    return new Promise((resolve, reject) => {
      try {
        const sessionName = whatsapp.name;
        let sessionCfg;

        if (whatsapp && whatsapp.session) {
          sessionCfg = JSON.parse(whatsapp.session);
        }

        const args: string = process.env.CHROME_ARGS || "";

        const wbot: Session = new Client({
          session: sessionCfg,
          authStrategy: new LocalAuth({ clientId: "bd_" + whatsapp.id }),
          puppeteer: {
            executablePath: process.env.CHROME_BIN || undefined,
            // @ts-ignore
            browserWSEndpoint: process.env.CHROME_WS || undefined,
            args: args.split(" "),
          },
        });

        wbot.initialize();

        this.setupEventListeners(wbot, whatsapp, sessionName, resolve, reject);
      } catch (err) {
        console.error(err);
      }
    });
  }

  private setupEventListeners(
    wbot: Session,
    whatsapp: Whatsapp,
    sessionName: string,
    resolve: (value: Session) => void,
    reject: (reason?: any) => void
  ): void {
    const io = socketManager.getIO();

    wbot.on("qr", async (qr) => {
      console.info("Session:", sessionName);
      qrCode.generate(qr, { small: true });
      await whatsapp.update({ qrcode: qr, status: "qrcode", retries: 0 });

      this.addSession(wbot, whatsapp.id);

      io.emit("whatsappSession", {
        action: "update",
        session: whatsapp,
      });
    });

    wbot.on("authenticated", async () => {
      console.info(`Session: ${sessionName} AUTHENTICATED`);
    });

    wbot.on("auth_failure", async (msg) => {
      console.error(
        `Session: ${sessionName} AUTHENTICATION FAILURE! Reason: ${msg}`
      );

      await this.handleAuthFailure(whatsapp);
      io.emit("whatsappSession", {
        action: "update",
        session: whatsapp,
      });

      reject(new Error("Error starting whatsapp session."));
    });

    wbot.on("ready", async () => {
      console.info(`Session: ${sessionName} READY`);

      await this.handleReadyState(wbot, whatsapp);
      resolve(wbot);
    });
  }

  private async handleAuthFailure(whatsapp: Whatsapp): Promise<void> {
    if (whatsapp.retries > 1) {
      await whatsapp.update({ session: "", retries: 0 });
    }

    const retry = whatsapp.retries;
    await whatsapp.update({
      status: "DISCONNECTED",
      retries: retry + 1,
    });
  }

  private async handleReadyState(
    wbot: Session,
    whatsapp: Whatsapp
  ): Promise<void> {
    const io = socketManager.getIO();

    await whatsapp.update({
      status: "CONNECTED",
      qrcode: "",
      retries: 0,
    });

    io.emit("whatsappSession", {
      action: "update",
      session: whatsapp,
    });

    this.addSession(wbot, whatsapp.id);
    wbot.sendPresenceAvailable();
    await this.syncUnreadMessages(wbot);
  }

  private addSession(wbot: Session, whatsappId: number): void {
    const sessionIndex = this.sessions.findIndex((s) => s.id === whatsappId);
    if (sessionIndex === -1) {
      wbot.id = whatsappId;
      this.sessions.push(wbot);
    }
  }

  public getWbot(whatsappId: number): Session {
    const sessionIndex = this.sessions.findIndex((s) => s.id === whatsappId);

    if (sessionIndex === -1) {
      throw new BadRequestError("ERR_WAPP_NOT_INITIALIZED");
    }
    return this.sessions[sessionIndex];
  }

  public removeWbot(whatsappId: number): void {
    try {
      const sessionIndex = this.sessions.findIndex((s) => s.id === whatsappId);
      if (sessionIndex !== -1) {
        this.sessions[sessionIndex].destroy();
        this.sessions.splice(sessionIndex, 1);
      }
    } catch (err) {
      console.error(err);
    }
  }
}

// Export a singleton instance
export const whatsAppManager = WhatsAppManager.getInstance();
