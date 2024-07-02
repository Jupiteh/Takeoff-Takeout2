import { Router } from 'express';
import { register, login, getUsers, updateUserById, deleteUserById, getUserById } from '../controllers/authController';
import { authenticateJWT, authorizeRole } from '../middlewares/authorize';

const router = Router();

// Routes d'authentification
router.post('/register', register);
router.post('/login', login);

// Route protégée par JWT et rôle admin pour obtenir tous les utilisateurs
// router.get('/users', authenticateJWT, authorizeRole(['admin']), getUsers);

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUserById);
router.delete('/users/:id', deleteUserById);

// Routes protégées par rôle
router.get('/admin', authenticateJWT, authorizeRole(['admin']), (req, res) => {
    res.status(200).json({ message: 'Admin access granted' });
});

router.get('/user', authenticateJWT, authorizeRole(['user', 'admin']), (req, res) => {
    res.status(200).json({ message: 'User access granted' });
});

export default router;
