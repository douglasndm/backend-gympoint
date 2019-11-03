import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentControoler from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrolmentController from './app/controllers/EnrolmentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/session', SessionController.store);

routes.use(authMiddleware);
routes.post('/students', StudentControoler.store);
routes.put('/students', StudentControoler.update);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:planId', PlanController.update);
routes.delete('/plans/:planId', PlanController.delete);

routes.get('/enrolments', EnrolmentController.index);
routes.post('/enrolments', EnrolmentController.store);
routes.put('/enrolments/:id', EnrolmentController.update);
routes.delete('/enrolments/:id', EnrolmentController.delete);

export default routes;
