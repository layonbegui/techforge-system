import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const controller = new CategoryController();

router.use(authMiddleware);
router.post('/', controller.create);
router.get('/', controller.list);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
