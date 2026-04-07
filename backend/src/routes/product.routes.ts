import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const controller = new ProductController();

router.use(authMiddleware);
router.post('/', controller.create);
router.get('/', controller.list);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
