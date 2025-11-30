import { Router } from 'express';
import { registerAdmin, login, getCurrentUser } from './auth.controller.js';
import { authenticateToken } from '../../middleware/auth.middleware.js';

const router = Router();

// Register admin (first time setup only)
router.post('/register', registerAdmin);

// Login
router.post('/login', login);

// Get current user (protected)
router.get('/me', authenticateToken, getCurrentUser);

export default router;

