import { Router } from 'express';
import { createUser, getUser, getUserById, updateUser, deleteUser } from '../controllers/userController';

const router = Router();

router.post('/user', createUser);
router.get('/user', getUser);
router.get('/user/:id', getUserById);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

export default router;
