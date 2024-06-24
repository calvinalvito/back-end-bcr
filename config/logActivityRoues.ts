import { Router } from 'express';
import { checkRole, authorize } from './authMiddleware';
import { getAllCarLogs } from '../app/controllers/carLogsController';

const router = Router();

//Car Logs Router
router.get('/logActivity',authorize,checkRole(['admin','superadmin']), getAllCarLogs);

export default router;
