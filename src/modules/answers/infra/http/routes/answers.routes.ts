import { Router } from 'express';

import AnswersController from '../controller/AnswersController';

const answersRoutes = Router();

const answersController = new AnswersController();

answersRoutes.post('/create', answersController.create);

answersRoutes.delete('/delete', answersController.delete);

answersRoutes.get('/getAllFromAUser/:questionId', answersController.getAllFromAQuestion);

answersRoutes.get('/getAllFromAUser/:userId', answersController.getAllFromAUser);

answersRoutes.patch('/update/:id', answersController.update);

export default answersRoutes;
