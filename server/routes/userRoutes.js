import express from 'express'
const router = express.Router();

import { registerCtrl, loginCtrl, logoutCtrl } from '../controllers/userCtrl.js';
import { Authenticate } from '../middleware/auth.js';
import UserModel from '../models/userModel.js';


router.post('/register', registerCtrl)



router.post('/login', loginCtrl)

router.get('/verify', Authenticate, async (req, res) => {
   try {
      const validUser = await UserModel.findOne({ _id: req.userId })
      res.status(200).json({ status: 200, validUser })
      
   } catch (error) {
      res.status(400).json({ status: 400, error })
      
   }
})

router.get('/logout',Authenticate,logoutCtrl)

export default router