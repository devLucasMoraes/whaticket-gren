import { RequestHandler } from "express";
import { Contact } from "../entities/Contact";
import { pageable } from "../helpers/pageable";
import { ContactServiceImpl } from "../services/impl/ContactServiceImpl";

export class ContactController {
  constructor(private readonly contactService: ContactServiceImpl) {}

  list: RequestHandler = async (req, res) => {
    const { page, size, sort } = req.query;
    // arrumar isso aqui depois para fazer a verificação de tipo com o zod
    const result = await this.contactService.listPaginated(
      pageable(page as string, size as string, sort as string | string[])
    );
    res.status(200).json(result);
  };

  create: RequestHandler = async (req, res) => {
    const { number, name, email, profilePicUrl } = req.body;

    const contact = new Contact({
      number,
      name,
      email,
      profilePicUrl,
    });

    const newContact = await this.contactService.create(contact);

    res.status(201).json(newContact);
  };

  show: RequestHandler = async (req, res) => {
    const { contactId } = req.params;

    const contact = await this.contactService.show(parseInt(contactId));

    res.status(200).json(contact);
  };

  update: RequestHandler = async (req, res) => {
    const { contactId } = req.params;
    const { number, name, email, profilePicUrl, id } = req.body;

    const contact = new Contact({
      id,
      number,
      name,
      email,
      profilePicUrl,
    });

    const updatedContact = await this.contactService.update(
      parseInt(contactId),
      contact
    );

    res.status(200).json(updatedContact);
  };

  delete: RequestHandler = async (req, res) => {
    const { contactId } = req.params;

    await this.contactService.delete(parseInt(contactId));

    res.status(204).send();
  };
}
