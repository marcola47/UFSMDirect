import express from 'express';

import verifyToken from './middleware/verifyToken.js';
import chatController from './controllers/chatController.js';
import courseController from './controllers/courseController.js';
import feedbackController from './controllers/feedbackController.js';
import formController from './controllers/formController.js';
import jobController from './controllers/jobController.js';
import nucleusController from './controllers/nucleusController.js';
import programController from './controllers/programController.js';
import testimonyController from './controllers/testimonyController.js';
import userController from './controllers/userController.js';

const router = express.Router();
const guestRouter = express.Router();
const authRouter = express.Router();
authRouter.use(verifyToken);

guestRouter.post('/user/login', userController.login);
authRouter.post('/user/token', userController.token);
guestRouter.post('/user/create', userController.create);
authRouter.post('/user/logout', userController.logout);

guestRouter.get('/form/getAffirmations', formController.getAffirmations);
guestRouter.get('/course/getCourses', courseController.getCourses);

router.use('/a', authRouter);
router.use('/g', guestRouter);

export default router;
