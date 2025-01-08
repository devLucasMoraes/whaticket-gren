import { Whatsapp } from "../../entities/Whatsapp";
import { BadRequestError, NotFoundError } from "../../errors/AppError";
import { whatsappRepository } from "../../repositories/";
import { WhatsappService } from "../WhatsappService";

export class WhatsappServiceImpl implements WhatsappService {
  async list(): Promise<Whatsapp[]> {
    return await whatsappRepository.find({
      relations: {
        queues: true,
      },
    });
  }

  async show(id: number): Promise<Whatsapp> {
    const whatsappExists = await whatsappRepository.findOne({
      where: { id },
      relations: {
        queues: true,
      },
    });

    if (!whatsappExists) {
      throw new BadRequestError("ERR_WHATSAPP_NOT_FOUND");
    }

    return whatsappExists;
  }

  async create(entity: Whatsapp): Promise<Whatsapp> {
    const { name } = entity;

    const whatsappExists = await whatsappRepository.findOneBy({ name });

    if (whatsappExists) {
      throw new BadRequestError("ERR_WHATSAPP_INVALID_NAME");
    }

    const whatsappFound = await whatsappRepository.find();

    if (!whatsappFound.length) {
      entity.isDefault = true;
    }

    if (whatsappFound.length && entity.isDefault) {
      const oldDefaultWhatsapp = await whatsappRepository.findOneBy({
        isDefault: true,
      });

      if (oldDefaultWhatsapp) {
        oldDefaultWhatsapp.isDefault = false;
        await whatsappRepository.save(oldDefaultWhatsapp);
      }
    }

    if (entity.queues?.length > 1 && !entity.greetingMessage) {
      throw new BadRequestError("ERR_WAPP_GREETING_REQUIRED");
    }

    const newWhatsapp = whatsappRepository.create(entity);

    return whatsappRepository.save(newWhatsapp);
  }

  async update(id: number, entity: Whatsapp): Promise<Whatsapp> {
    const whatsappExists = await whatsappRepository.findOneBy({ id });

    if (!whatsappExists) {
      throw new NotFoundError("ERR_WHATSAPP_NOT_FOUND");
    }

    const nameExists = await whatsappRepository.findOneBy({
      name: entity.name,
    });

    if (nameExists && nameExists.id !== id) {
      throw new BadRequestError("ERR_WHATSAPP_INVALID_NAME");
    }

    if (entity.queues?.length > 1 && !entity.greetingMessage) {
      throw new BadRequestError("ERR_WAPP_GREETING_REQUIRED");
    }

    whatsappRepository.merge(whatsappExists, entity);

    return await whatsappRepository.save(whatsappExists);
  }

  async delete(id: number): Promise<void> {
    const whatsappExists = await whatsappRepository.findOneBy({ id });

    if (!whatsappExists) {
      throw new NotFoundError("ERR_WHATSAPP_NOT_FOUND");
    }

    await whatsappRepository.softDelete(id);

    return Promise.resolve();
  }
}
