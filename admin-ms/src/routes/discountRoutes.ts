// routes/discountRoutes.ts
import { Router } from 'express';
import {
  createDiscount,
  getAllDiscounts,
  getDiscountById,
  updateDiscount,
  deleteDiscount
} from '../controllers/discountController';
import { authenticateToken } from '../middlewares/authMiddleware'; 
import {
    createDiscountValidation,
    updateDiscountValidation
  } from '../validation/discountValidation';
  import { getDiscountByCode } from '../controllers/discountController';
  import { applyDiscount } from '../controllers/discountController';

const router = Router();

router.post('/discounts',authenticateToken,createDiscountValidation, createDiscount);
router.get('/discounts',authenticateToken, getAllDiscounts);
router.get('/discounts/:id',authenticateToken, getDiscountById);
router.put('/discounts/:id',authenticateToken,updateDiscountValidation, updateDiscount);
router.delete('/discounts/:id',authenticateToken, deleteDiscount);
router.get('/discounts1',authenticateToken, getDiscountByCode);
router.post('/apply-discount',authenticateToken,applyDiscount)


export default router;
