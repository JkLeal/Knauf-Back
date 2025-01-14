import { QuizzQuestions } from '@prisma/client';

import ICreateQuizzQuestionsDTO from '../dtos/ICreateQuizzQuestionsDTO';
import IUpdateQuizzQuestionsDTO from '../dtos/IUpdateQuizzQuestionsDTO';

interface IQuizzQuestionsRepository {
  findByID(id: string): Promise<QuizzQuestions | null>;
  create(data: ICreateQuizzQuestionsDTO): Promise<QuizzQuestions>;
  delete(id: string): Promise<QuizzQuestions>;
  get(quizzId: string): Promise<QuizzQuestions[] | null>;
  update(id: string, data: IUpdateQuizzQuestionsDTO): Promise<QuizzQuestions>;
}

export default IQuizzQuestionsRepository;
