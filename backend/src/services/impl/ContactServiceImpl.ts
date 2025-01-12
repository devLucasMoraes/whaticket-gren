import { Contact } from "../../entities/Contact";
import { BadRequestError, NotFoundError } from "../../errors/AppError";
import { contactRepository } from "../../repositories";
import { Page, PageRequest } from "../../repositories/BaseRepository";
import { ContactService } from "../ContactService";

export class ContactServiceImpl implements ContactService {
  async listPaginated(pageRequest?: PageRequest): Promise<Page<Contact>> {
    return await contactRepository.findAllPaginated(pageRequest);
  }
  list(): Promise<Contact[]> {
    throw new Error("Method not implemented.");
  }
  async show(id: number): Promise<Contact> {
    const contactExists = await contactRepository.findOneBy({ id });

    if (!contactExists) {
      throw new NotFoundError("ERR_NO_CONTACT_FOUND");
    }

    return contactExists;
  }
  async create(entity: Contact): Promise<Contact> {
    const { number } = entity;
    const contactExists = await contactRepository.findOneBy({
      number,
    });

    if (contactExists) {
      throw new BadRequestError("ERR_CONTACT_DUPLICATED");
    }

    const newContact = contactRepository.create(entity);

    return await contactRepository.save(newContact);
  }
  async update(id: number, entity: Contact): Promise<Contact> {
    if (id !== entity.id) {
      throw new BadRequestError("ERR_ID_MISMATCH");
    }

    const contactExists = await contactRepository.findOneBy({ id });

    if (!contactExists) {
      throw new NotFoundError("ERR_NO_CONTACT_FOUND");
    }

    const { number } = entity;

    const numberExists = await contactRepository.findOneBy({
      number,
    });

    if (numberExists && numberExists.id !== id) {
      throw new BadRequestError("ERR_CONTACT_DUPLICATED");
    }

    const updatedContact = contactRepository.merge(contactExists, entity);

    return await contactRepository.save(updatedContact);
  }
  async delete(id: number): Promise<void> {
    const contactExists = contactRepository.findOneBy({ id });

    if (!contactExists) {
      throw new NotFoundError("ERR_NO_CONTACT_FOUND");
    }

    await contactRepository.delete(id);

    return Promise.resolve();
  }
}
