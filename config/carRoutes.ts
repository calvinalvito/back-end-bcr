import { Router } from 'express';
import { checkRole, authorize } from './authMiddleware';
import {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
} from '../app/controllers/carController';

import { getAllCarLogs } from '../app/controllers/carLogsController';

const router = Router();

router.get('/cars', getAllCars);
router.get('/cars/:id', getCarById);

router.post('/cars',authorize,checkRole(['admin','superadmin']), createCar);
router.put('/cars/:id',authorize,checkRole(['admin','superadmin']), updateCar);
router.delete('/cars/:id',authorize,checkRole(['admin','superadmin']),deleteCar);


//Car Logs Router
router.get('/cars/logActivity', getAllCarLogs);

export default router;
