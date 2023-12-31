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
guestRouter.post('/user/create', userController.create);
authRouter.post('/user/logout', userController.logout);
authRouter.post('/user/token', userController.token);
authRouter.post('/user/update/params', userController.updateParams);

guestRouter.get('/form/getAffirmations', formController.getAffirmations);
guestRouter.get('/course/getCourses', courseController.getCourses);

guestRouter.get('/program/get-min-programs', programController.getMinPrograms);
guestRouter.get('/program/:programID', programController.getProgram);

guestRouter.get('/job/get-jobs', jobController.getJobs);
guestRouter.get('/job/:jobID', jobController.getJob);
guestRouter.get('/job/:jobID/rank-programs', jobController.rankPrograms);

guestRouter.post('/feedback/importance/create', feedbackController.rateCourse);

router.use('/a', authRouter);
router.use('/g', guestRouter);

export default router;
