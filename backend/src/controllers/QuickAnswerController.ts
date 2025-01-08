import { RequestHandler } from "express";
import { QuickAnswer } from "../entities/QuickAnswer";
import { pageable } from "../helpers/pageable";
import {
  QuickAnswerCreateSchema,
  QuickAnswerUpdateSchema,
} from "../schemas/quickAnswer.schemas";
import { QuickAnswerService } from "../services/QuickAnswerService";

export class QuickAnswerController {
  constructor(private readonly quickAnswerService: QuickAnswerService) {}

  list: RequestHandler = async (req, res) => {
    const { page, size, sort } = req.query;
    // arrumar isso aqui depois para fazer a verificação de tipo com o zod
    const result = await this.quickAnswerService.listPaginated(
      pageable(page as string, size as string, sort as string | string[])
    );
    res.status(200).json(result);
  };

  create: RequestHandler = async (req, res) => {
    const { shortcut, message }: QuickAnswerCreateSchema = req.body;

    const quickAnswer = new QuickAnswer({
      shortcut,
      message,
    });

    const newQuickAnswer = await this.quickAnswerService.create(quickAnswer);

    res.status(201).json(newQuickAnswer);
  };

  show: RequestHandler = async (req, res) => {
    const { quickAnswerId } = req.params;

    const quickAnswer = await this.quickAnswerService.show(
      parseInt(quickAnswerId)
    );

    res.status(200).json(quickAnswer);
  };

  update: RequestHandler = async (req, res) => {
    const { quickAnswerId } = req.params;
    const { shortcut, message, id }: QuickAnswerUpdateSchema = req.body;

    const quickAnswer = new QuickAnswer({
      id,
      shortcut,
      message,
    });

    const updatedQuickAnswer = await this.quickAnswerService.update(
      parseInt(quickAnswerId),
      quickAnswer
    );

    res.status(200).json(updatedQuickAnswer);
  };

  delete: RequestHandler = async (req, res) => {
    const { quickAnswerId } = req.params;

    await this.quickAnswerService.delete(parseInt(quickAnswerId));

    res.status(204).send();
  };
}
