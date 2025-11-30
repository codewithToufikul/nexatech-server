import { Router } from 'express';
import { authenticateToken, requireAdmin } from '../../middleware/auth.middleware.js';
import {
  getAllServices,
  getService,
  createService,
  updateService,
  deleteService,
  getAllPortfolio,
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  getAllContacts,
  getContact,
  updateContactStatus,
  deleteContact,
} from './admin.controller.js';

const router = Router();

// All admin routes require authentication and admin role
router.use(authenticateToken);
router.use(requireAdmin);

// Service routes
router.get('/services', getAllServices);
router.get('/services/:id', getService);
router.post('/services', createService);
router.put('/services/:id', updateService);
router.delete('/services/:id', deleteService);

// Portfolio routes
router.get('/portfolio', getAllPortfolio);
router.get('/portfolio/:id', getPortfolio);
router.post('/portfolio', createPortfolio);
router.put('/portfolio/:id', updatePortfolio);
router.delete('/portfolio/:id', deletePortfolio);

// Contact routes
router.get('/contacts', getAllContacts);
router.get('/contacts/:id', getContact);
router.put('/contacts/:id/status', updateContactStatus);
router.delete('/contacts/:id', deleteContact);

export default router;

