import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentControoler from './app/controllers/StudentController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/session', SessionController.store);

routes.use(authMiddleware);
routes.post('/students', StudentControoler.store);
routes.put('/students', StudentControoler.update);

export default routes;
