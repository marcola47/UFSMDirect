import express from 'express';
import verifyToken from './middleware/verifyToken.js';

const router = express.Router();
const guestRouter = express.Router();
const authRouter = express.Router();
authRouter.use(verifyToken);

router.use('/a', authRouter);
router.use('/g', guestRouter);

export default router;
