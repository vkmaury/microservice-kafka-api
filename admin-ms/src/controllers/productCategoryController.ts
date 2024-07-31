import { Request, Response } from 'express';
import ProductCategory from '../models/productCategorySchema'; // Adjust the import path as necessary

// Create a new product category
export const createProductCategory = async (req: Request, res: Response) => {
  const { productId, name, category, description } = req.body;

  try {
    const newCategory = new ProductCategory({ productId, name, category, description });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  }
};

// Get all product categories
export const getAllProductCategories = async (req: Request, res: Response) => {
  try {
    const categories = await ProductCategory.find();
    res.status(200).json(categories);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  }
};

// Get a product category by ID
export const getProductCategoryById = async (req: Request, res: Response) => {
    const { id } = req.params; // Extracting ID from query parameters
  
    if (typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
  
    try {
      const category = await ProductCategory.findById(id);
      if (!category) {
        return res.status(404).json({ message: 'Product category not found' });
      }
      res.status(200).json(category);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unexpected error occurred.' });
      }
    }
  };
  
  // Update a product category by ID from query parameters
  export const updateProductCategory = async (req: Request, res: Response) => {
    const { id } = req.params; // Extracting ID from query parameters
    const updateData = req.body;
  
    if (typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
  
    try {
      const updatedCategory = await ProductCategory.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Product category not found' });
      }
      res.status(200).json(updatedCategory);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unexpected error occurred.' });
      }
    }
  };
  
  // Delete a product category by ID from query parameters
  export const deleteProductCategory = async (req: Request, res: Response) => {
    const { id } = req.params; // Extracting ID from query parameters
  
    if (typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
  
    try {
      const deletedCategory = await ProductCategory.findByIdAndDelete(id);
      if (!deletedCategory) {
        return res.status(404).json({ message: 'Product category not found' });
      }
      res.status(200).json({ message: 'Product category deleted successfully' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unexpected error occurred.' });
      }
    }
  };