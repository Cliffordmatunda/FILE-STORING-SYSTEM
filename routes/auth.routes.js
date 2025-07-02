import express from'express';
import {register,loginUser} from '../controllers/Auth.controller.js';   


const router=express.Router();

//register
router.post('/register',register);

//login
router.post('/login',loginUser);

export default router;