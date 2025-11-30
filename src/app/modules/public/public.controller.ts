import type { Request, Response } from 'express';
import { Service } from '../../models/Service.model.js';
import { Portfolio } from '../../models/Portfolio.model.js';
import { Contact } from '../../models/Contact.model.js';

// Get all services (public)
export const getServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json({ services });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ message: 'Failed to fetch services', error });
  }
};

// Get single service (public)
export const getService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (!id) {
      res.status(400).json({ message: 'Service ID is required' });
      return;
    }
    
    const service = await Service.findOne({ id });
    
    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }

    res.status(200).json({ service });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({ message: 'Failed to fetch service', error });
  }
};

// Get all portfolio (public)
export const getPortfolio = async (req: Request, res: Response): Promise<void> => {
  try {
    const portfolio = await Portfolio.find().sort({ createdAt: -1 });
    res.status(200).json({ portfolio });
  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({ message: 'Failed to fetch portfolio', error });
  }
};

// Get single portfolio item (public)
export const getPortfolioItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (!id) {
      res.status(400).json({ message: 'Portfolio ID is required' });
      return;
    }
    
    const portfolioItem = await Portfolio.findOne({ id });
    
    if (!portfolioItem) {
      res.status(404).json({ message: 'Portfolio item not found' });
      return;
    }

    res.status(200).json({ portfolio: portfolioItem });
  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({ message: 'Failed to fetch portfolio item', error });
  }
};

// Submit contact form (public)
export const submitContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, subject, service, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      res.status(400).json({ message: 'Name, email, and message are required' });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: 'Invalid email format' });
      return;
    }

    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      service,
      message,
      status: 'new',
    });

    await contact.save();

    res.status(201).json({
      message: 'Contact form submitted successfully',
      contact: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
      },
    });
  } catch (error) {
    console.error('Submit contact error:', error);
    res.status(500).json({ message: 'Failed to submit contact form', error });
  }
};

