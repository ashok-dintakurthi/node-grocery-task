// src/routes/index.ts  (Or you could create separate route files)
import { Router } from 'express';
// import { AdminController } from '../controllers/admin.controller';
import { AdminRouter } from './admin.route';
import { UserRouter } from './user.route';

const router = Router();

router.use('/user', UserRouter);
router.use('/admin', AdminRouter);

export default router;