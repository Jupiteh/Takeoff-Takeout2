"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authorize_1 = require("../middlewares/authorize");
const router = (0, express_1.Router)();
// Routes d'authentification
router.post('/register', authController_1.register);
router.post('/login', authController_1.login);
// Route protégée par JWT et rôle admin pour obtenir tous les utilisateurs
router.get('/users', authorize_1.authenticateJWT, (0, authorize_1.authorizeRole)(['admin']), authController_1.getUsers);
// Routes protégées par rôle
router.get('/admin', authorize_1.authenticateJWT, (0, authorize_1.authorizeRole)(['admin']), (req, res) => {
    res.status(200).json({ message: 'Admin access granted' });
});
router.get('/user', authorize_1.authenticateJWT, (0, authorize_1.authorizeRole)(['user', 'admin']), (req, res) => {
    res.status(200).json({ message: 'User access granted' });
});
exports.default = router;
