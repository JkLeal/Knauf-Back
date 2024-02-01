import { Router } from 'express';

import ContentController from '../controller/ContentController';

const contentRoutes = Router();

const contentController = new ContentController();

contentRoutes.post('/create', contentController.create);

contentRoutes.delete('/delete/:id', contentController.delete);

contentRoutes.get('/find', contentController.findAll);

export default contentRoutes;
