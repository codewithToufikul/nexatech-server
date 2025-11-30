import type { Response } from 'express';
import { Service } from '../../models/Service.model.js';
import type { IService } from '../../models/Service.model.js';
import { Portfolio } from '../../models/Portfolio.model.js';
import type { IPortfolio } from '../../models/Portfolio.model.js';
import { Contact } from '../../models/Contact.model.js';
import type { IContact } from '../../models/Contact.model.js';
import type { AuthRequest } from '../../middleware/auth.middleware.js';

// ==================== SERVICES ====================

// Get all services
export const getAllServices = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json({ services });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ message: 'Failed to fetch services', error });
  }
};

// Get single service
export const getService = async (req: AuthRequest, res: Response): Promise<void> => {
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

// Create service
export const createService = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const serviceData = req.body;

    // Check if service with same id exists
    const existingService = await Service.findOne({ id: serviceData.id });
    if (existingService) {
      res.status(400).json({ message: 'Service with this ID already exists' });
      return;
    }

    const service = new Service(serviceData);
    await service.save();

    res.status(201).json({ message: 'Service created successfully', service });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ message: 'Failed to create service', error });
  }
};

// Update service
export const updateService = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (!id) {
      res.status(400).json({ message: 'Service ID is required' });
      return;
    }
    
    const updateData = req.body;

    const service = await Service.findOneAndUpdate(
      { id },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }

    res.status(200).json({ message: 'Service updated successfully', service });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({ message: 'Failed to update service', error });
  }
};

// Delete service
export const deleteService = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (!id) {
      res.status(400).json({ message: 'Service ID is required' });
      return;
    }

    const service = await Service.findOneAndDelete({ id });

    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ message: 'Failed to delete service', error });
  }
};

// ==================== PORTFOLIO ====================

// Get all portfolio items
export const getAllPortfolio = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const portfolio = await Portfolio.find().sort({ createdAt: -1 });
    res.status(200).json({ portfolio });
  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({ message: 'Failed to fetch portfolio', error });
  }
};

// Get single portfolio item
export const getPortfolio = async (req: AuthRequest, res: Response): Promise<void> => {
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

// Create portfolio item
export const createPortfolio = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const portfolioData = req.body;

    // Check if portfolio with same id exists
    const existingPortfolio = await Portfolio.findOne({ id: portfolioData.id });
    if (existingPortfolio) {
      res.status(400).json({ message: 'Portfolio item with this ID already exists' });
      return;
    }

    const portfolio = new Portfolio(portfolioData);
    await portfolio.save();

    res.status(201).json({ message: 'Portfolio item created successfully', portfolio });
  } catch (error) {
    console.error('Create portfolio error:', error);
    res.status(500).json({ message: 'Failed to create portfolio item', error });
  }
};

// Update portfolio item
export const updatePortfolio = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (!id) {
      res.status(400).json({ message: 'Portfolio ID is required' });
      return;
    }
    
    const updateData = req.body;

    const portfolio = await Portfolio.findOneAndUpdate(
      { id },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!portfolio) {
      res.status(404).json({ message: 'Portfolio item not found' });
      return;
    }

    res.status(200).json({ message: 'Portfolio item updated successfully', portfolio });
  } catch (error) {
    console.error('Update portfolio error:', error);
    res.status(500).json({ message: 'Failed to update portfolio item', error });
  }
};

// Delete portfolio item
export const deletePortfolio = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (!id) {
      res.status(400).json({ message: 'Portfolio ID is required' });
      return;
    }

    const portfolio = await Portfolio.findOneAndDelete({ id });

    if (!portfolio) {
      res.status(404).json({ message: 'Portfolio item not found' });
      return;
    }

    res.status(200).json({ message: 'Portfolio item deleted successfully' });
  } catch (error) {
    console.error('Delete portfolio error:', error);
    res.status(500).json({ message: 'Failed to delete portfolio item', error });
  }
};

// ==================== CONTACTS ====================

// Get all contacts
export const getAllContacts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ contacts });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Failed to fetch contacts', error });
  }
};

// Get single contact
export const getContact = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (!id) {
      res.status(400).json({ message: 'Contact ID is required' });
      return;
    }
    
    const contact = await Contact.findById(id);
    
    if (!contact) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }

    res.status(200).json({ contact });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({ message: 'Failed to fetch contact', error });
  }
};

// Update contact status
export const updateContactStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (!id) {
      res.status(400).json({ message: 'Contact ID is required' });
      return;
    }
    
    const { status } = req.body;

    if (!['new', 'read', 'replied'].includes(status)) {
      res.status(400).json({ message: 'Invalid status' });
      return;
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );

    if (!contact) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }

    res.status(200).json({ message: 'Contact status updated', contact });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({ message: 'Failed to update contact', error });
  }
};

// Delete contact
export const deleteContact = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (!id) {
      res.status(400).json({ message: 'Contact ID is required' });
      return;
    }

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ message: 'Failed to delete contact', error });
  }
};

