import { Router } from 'express';
import {
  getServices,
  getService,
  getPortfolio,
  getPortfolioItem,
  submitContact,
} from './public.controller.js';

const router = Router();

// Public routes - no authentication required
router.get('/services', getServices);
router.get('/services/:id', getService);
router.get('/portfolio', getPortfolio);
router.get('/portfolio/:id', getPortfolioItem);
router.post('/contact', submitContact);

export default router;

