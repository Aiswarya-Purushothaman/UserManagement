import express from 'express'

import { authUser, RegisterUser,
  LogoutUser,
  getUserProfile,
  UpdateUserProfile,
  updateImage } from '../controllers/userController.js';

import {protect} from '../middleware/authMiddleware.js'
import { upload } from '../db/multer.js';
const router =express.Router();




router.post('/',authUser)
router.post('/auth',authUser)
router.post('/logout',LogoutUser)
router.post('/register',RegisterUser)
router.route('/profile').get(protect,getUserProfile).put(protect, UpdateUserProfile);
router.post('/updateimage', protect, upload.single('file'),updateImage)

export default router;