import { Router } from 'express';
import { signupController, loginController } from '../controllers/authController';
import { getUserProfile } from '../controllers/getInfoController';
import { authenticateToken } from '../middlewares/authMiddleware'; 
import { getAllUsers } from '../controllers/getUserInfo';
import { getAllSeller } from '../controllers/getSellerInfo';
import { blockSeller } from '../controllers/blockSellerController';
import { unblockSeller } from '../controllers/unblockSellerController';


const router = Router();

router.post('/signup', signupController);
router.post('/login', loginController);
router.get('/get-info',authenticateToken, getUserProfile);
router.get('/get-user-info',authenticateToken,getAllUsers);
router.get('/get-seller-info',authenticateToken,getAllSeller);
router.get('/block-seller',authenticateToken,blockSeller);
router.get('/unblock-seller',authenticateToken,unblockSeller);



export default router;
