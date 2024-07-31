// controllers/discountController.ts
import { Request, Response } from 'express';
import Discount, { IDiscount } from '../models/discountModel';
import axios from 'axios';
import { sendDiscountApplication } from '../services/rabbitmqService';


// Helper function to check if a date is in the past
const isDateInThePast = (date: Date) => {
    return new Date(date) < new Date();
  };
  
  // Create a new discount
  export const createDiscount = async (req: Request, res: Response) => {
    try {
      const { code, percentage, description, startDate, endDate, isActive } = req.body;
  
      // Validate that startDate is not in the past
      if (isDateInThePast(startDate)) {
        return res.status(400).json({ message: 'Start date cannot be in the past' });
      }
  
      const discount = new Discount({ code, percentage, description, startDate, endDate, isActive });
      await discount.save();
      res.status(201).json(discount);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  };

// Get all discounts
export const getAllDiscounts = async (req: Request, res: Response) => {
  try {
    const discounts = await Discount.find();
    res.status(200).json(discounts);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// Get a single discount by ID
export const getDiscountById = async (req: Request, res: Response) => {
  try {
    const discount = await Discount.findById(req.params.id);
    if (!discount) return res.status(404).json({ message: 'Discount not found' });
    res.status(200).json(discount);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

// Update a discount by ID
export const updateDiscount = async (req: Request, res: Response) => {
  try {
    const { code, percentage, description, startDate, endDate, isActive } = req.body;

    // Validate that startDate is not in the past
    if (startDate && isDateInThePast(startDate)) {
      return res.status(400).json({ message: 'Start date cannot be in the past' });
    }

    const discount = await Discount.findByIdAndUpdate(req.params.id, { code, percentage, description, startDate, endDate, isActive }, { new: true });
    if (!discount) return res.status(404).json({ message: 'Discount not found' });
    res.status(200).json(discount);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};


// Delete a discount by ID
export const deleteDiscount = async (req: Request, res: Response) => {
  try {
    const discount = await Discount.findByIdAndDelete(req.params.id);
    if (!discount) return res.status(404).json({ message: 'Discount not found' });
    res.status(200).json({ message: 'Discount deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};


// Get a discount by discountCode
export const getDiscountByCode = async (req: Request, res: Response) => {
    try {
      const { discountCode } = req.query; // Retrieve discountCode from query parameters
     console.log(discountCode,"discount code ");
      if (typeof discountCode !== 'string') {
        return res.status(400).json({ message: 'Invalid discount code format' });
      }
       console.log(discountCode);
      const discount = await Discount.findOne({ code: discountCode}) as IDiscount;
      console.log(discount);
      if (!discount || !discount.isActive) {
        return res.status(404).json({ message: 'Discount not found or inactive' });
      }
  
      res.status(200).json(discount);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  };

  export const applyDiscount = async (req: Request, res: Response) => {
    try {
      const { productId, discountCode } = req.body;
  
      if (!productId || !discountCode) {
        return res.status(400).json({ message: 'Product ID and discount code are required' });
      }
  
      await sendDiscountApplication(productId, discountCode);
  
      res.status(200).json({ message: 'Discount application message sent to seller-ms' });
    } catch (error) {
      if (error instanceof Error) {
        // Handle errors that are instances of Error
        res.status(500).json({ message: error.message });
      } else {
        // Handle unknown errors
        res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  };
  