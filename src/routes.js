import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentControoler from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrolmentController from './app/controllers/EnrolmentController';
import CheckInController from './app/controllers/CheckInController';
import HelpOrderAdminController from './app/controllers/HelpOrderAdminController';
import HelpOrderController from './app/controllers/HelpOrderController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/session', SessionController.store);

routes.post('/students/:student_id/checkins', CheckInController.store);
routes.get('/students/:student_id/checkins', CheckInController.index);

routes.get('/students/:student_id/help-orders', HelpOrderController.index);
routes.post('/students/:student_id/help-orders', HelpOrderController.store);

routes.use(authMiddleware);
routes.get('/students', StudentControoler.index);
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

routes.get('/help-orders', HelpOrderAdminController.index);
routes.put('/help-orders/:question_id/answer', HelpOrderAdminController.store);

export default routes;
