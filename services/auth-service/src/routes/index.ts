import { Router } from 'express';
import { register, login, getUsers } from '../controllers/authController';
import { authenticateJWT, authorizeRole } from '../middlewares/authorize';

const router = Router();

// Routes d'authentification
router.post('/register', register);
router.post('/login', login);

// POUR LES TEST PLUS SIMPLE PEUT ETRE SUPPRIME
router.get('/users', getUsers);

// Routes protégées par rôle
router.get('/admin', authenticateJWT, authorizeRole(['admin']), (req, res) => {
    res.status(200).json({ message: 'Admin access granted' });
});

router.get('/user', authenticateJWT, authorizeRole(['user', 'admin']), (req, res) => {
    res.status(200).json({ message: 'User access granted' });
});

export default router;
