import express from 'express';
import upload from '../middlewares/multer.middleware.js';
import { protect } from '../middlewares/auth.middleware.js';
import { uploadFile,getUserFile,downloadFile,deleteFile } from '../controllers/file.controller.js';


const fileRouter=express.Router();
//upload a file
fileRouter.post('/upload',protect,upload.single('file'),uploadFile);

//get files 
fileRouter.get('/',getUserFile,protect);

//download file
fileRouter.get('/download/:id',protect,downloadFile);

//delete file
fileRouter.delete('/id',protect,deleteFile);

export default fileRouter;
