import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const controller = new UserController();

router.post('/', controller.create);
router.get('/me', authMiddleware, controller.me);
router.put('/me', authMiddleware, controller.updateMe);

export default router;
