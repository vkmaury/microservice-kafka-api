// src/routes/productCategoryRoutes.ts

import { Router } from 'express';
import {
  createProductCategory,
  getAllProductCategories,
  getProductCategoryById,
  updateProductCategory,
  deleteProductCategory
} from '../controllers/productCategoryController'; // Adjust the import path as necessary
import { authenticateToken } from '../middlewares/authMiddleware'; 

const router = Router();

// Create a new product category
router.post('/categories',authenticateToken, createProductCategory);

// Get all product categories
router.get('/categories',authenticateToken, getAllProductCategories);

// Get a product category by ID
router.get('/categories/:id',authenticateToken, getProductCategoryById);

// Update a product category by ID
router.put('/categories/:id',authenticateToken, updateProductCategory);

// Delete a product category by ID
router.delete('/categories/:id',authenticateToken, deleteProductCategory);

export default router;
