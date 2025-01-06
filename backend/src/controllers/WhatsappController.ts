import { RequestHandler } from "express";
import { Queue } from "../entities/Queue";
import { Whatsapp } from "../entities/Whatsapp";
import {
  WhatsappCreateSchema,
  WhatsappUpdateSchema,
} from "../schemas/whatsapp.schemas";
import { WhatsappService } from "../services/WhatsappService";

export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  create: RequestHandler = async (req, res) => {
    const {
      name,
      greetingMessage,
      farewellMessage,
      isDefault,
      queueIds,
    }: WhatsappCreateSchema = req.body;

    const whatsapp = new Whatsapp({
      name,
      greetingMessage,
      farewellMessage,
      isDefault,
      queues: queueIds?.map((queueId) => {
        return new Queue({ id: queueId });
      }),
    });

    const newWhatsapp = await this.whatsappService.create(whatsapp);

    res.status(201).json(newWhatsapp);
  };

  show: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const whatsapp = await this.whatsappService.show(parseInt(id));

    res.status(200).json(whatsapp);
  };

  update: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const {
      name,
      isDefault,
      farewellMessage,
      greetingMessage,
      status,
      session,
      queueIds,
    }: WhatsappUpdateSchema = req.body;

    const whatsapp = new Whatsapp({
      name,
      isDefault,
      farewellMessage,
      greetingMessage,
      status,
      session,
      queues: queueIds?.map((queueId) => {
        return new Queue({ id: queueId });
      }),
    });

    const updatedWhatsapp = await this.whatsappService.update(
      parseInt(id),
      whatsapp
    );

    res.status(200).json(updatedWhatsapp);
  };

  delete: RequestHandler = async (req, res) => {
    const { id } = req.params;

    await this.whatsappService.delete(parseInt(id));

    res.status(204).send();
  };

  list: RequestHandler = async (req, res) => {
    const whatsapps = await this.whatsappService.list();

    res.status(200).json(whatsapps);
  };
}
