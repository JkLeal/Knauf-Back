import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/EnsureAuthenticated';
import ModuleController from '../controller/ModuleController';

const moduleRoutes = Router();

const moduleController = new ModuleController();

moduleRoutes.post('/create', ensureAuthenticated, moduleController.create);

moduleRoutes.delete('/delete/:id', ensureAuthenticated, moduleController.delete);

moduleRoutes.get('/getModules', ensureAuthenticated, moduleController.getAllModules);

moduleRoutes.patch('/updateImage/:id', ensureAuthenticated, moduleController.updateImage);

export default moduleRoutes;
