import { Router } from 'express';
import { register,login, whoami, getAllUsers, updateUser, deleteUser } from '../app/controllers/userController';
import { checkRole, authorize } from './authMiddleware';


const router = Router();

router.post('/v1/register', register);
router.post('/v1/login', login);


router.get('/v1/whoami', authorize,checkRole(['superadmin','admin','member']), whoami);
router.get('/v1/users', authorize,checkRole(['superadmin']), getAllUsers);
router.put('/v1/update/:id', authorize,checkRole(['superadmin']), updateUser);
router.delete('/v1/delete/:id',authorize,checkRole(['superadmin']), deleteUser);


export default router;
