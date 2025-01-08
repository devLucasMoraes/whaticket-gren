import { QuickAnswer } from "../../entities/QuickAnswer";
import { BadRequestError, NotFoundError } from "../../errors/AppError";
import { quickAnswerRepository } from "../../repositories";
import { Page, PageRequest } from "../../repositories/BaseRepository";
import { QuickAnswerService } from "../QuickAnswerService";

export class QuickAnswerServiceImpl implements QuickAnswerService {
  async listPaginated(pageRequest?: PageRequest): Promise<Page<QuickAnswer>> {
    return await quickAnswerRepository.findAllPaginated(pageRequest);
  }

  async list(): Promise<QuickAnswer[]> {
    throw new Error("Method not implemented.");
  }

  async show(id: number): Promise<QuickAnswer> {
    const quickAnswerExists = await quickAnswerRepository.findOneBy({ id });

    if (!quickAnswerExists) {
      throw new NotFoundError("Quick Answer not found");
    }

    return quickAnswerExists;
  }

  async create(entity: QuickAnswer): Promise<QuickAnswer> {
    const { shortcut } = entity;

    const quickAnswerExists = await quickAnswerRepository.findOneBy({
      shortcut,
    });

    if (quickAnswerExists) {
      throw new BadRequestError("Shortcut already exists");
    }

    const newQuickAnswer = quickAnswerRepository.create(entity);

    return await quickAnswerRepository.save(newQuickAnswer);
  }

  async update(id: number, entity: QuickAnswer): Promise<QuickAnswer> {
    if (id !== entity.id) {
      throw new BadRequestError("Invalid id");
    }

    const quickAnswerExists = await quickAnswerRepository.findOneBy({ id });

    if (!quickAnswerExists) {
      throw new NotFoundError("Quick Answer not found");
    }

    const { shortcut } = entity;

    const shortcutExists = await quickAnswerRepository.findOneBy({
      shortcut,
    });

    if (shortcutExists && shortcutExists.id !== id) {
      throw new BadRequestError("Shortcut already exists");
    }

    quickAnswerRepository.merge(quickAnswerExists, entity);

    return await quickAnswerRepository.save(quickAnswerExists);
  }

  async delete(id: number): Promise<void> {
    const quickAnswerExists = quickAnswerRepository.findOneBy({ id });

    if (!quickAnswerExists) {
      throw new NotFoundError("Quick Answer not found");
    }

    await quickAnswerRepository.softDelete(id);

    return Promise.resolve();
  }
}
