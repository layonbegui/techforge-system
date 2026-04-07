import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const controller = new OrderController();

router.use(authMiddleware);
router.post('/', controller.create);
router.get('/', controller.list);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
