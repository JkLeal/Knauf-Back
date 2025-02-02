import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateQuizzGradesService from '@modules/quizz/services/CreateQuizzGradesService.ts';
import DeleteQuizzGradesService from '@modules/quizz/services/DeleteQuizzGradesService';
import GetAQuizzGradesService from '@modules/quizz/services/GetAQuizzGradesService';
import UpdateQuizzGradesService from '@modules/quizz/services/UpdateQuizzGradesService';

export default class QuizzGradesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      userId, quizzId,
    } = req.body;

    const createAnswers = container.resolve(CreateQuizzGradesService);

    const answers = await createAnswers.execute({
      userId, quizzId,
    });

    return res.status(201).json(answers);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteAnswers = container.resolve(DeleteQuizzGradesService);

    const answers = await deleteAnswers.execute(id);

    return res.status(200).json(answers);
  }

  public async get(req: Request, res: Response): Promise<Response> {
    const { quizzId, userId } = req.params;

    const getAnswers = container.resolve(GetAQuizzGradesService);

    const answers = await getAnswers.execute(quizzId, userId);

    return res.status(200).json(answers);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { record, timeSpent, seen } = req.body;

    const updateAnswers = container.resolve(UpdateQuizzGradesService);

    const answers = await updateAnswers.execute(id, { record, timeSpent, seen });

    return res.status(200).json(answers);
  }
}
