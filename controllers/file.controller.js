import File from '../models/file.model.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


//for ES to resolve __dirname
const _fileName=fileURLToPath(import.meta.url);
const __dirname=path.dirname(_fileName);


//upload a file
export const uploadFile=async (req,res)=>{
    if(!req.file){
        return res.status(500).json({message: 'No file uploaded'});
    }
    const files=await File.create({
        originalName: req.file.originalname,
        storedName: req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype,
        path: req.file.path,
        uploadedBy: req.user._id


 })
 res.status(201).json(files);

};
//get all file from logged in user
export const getUserFile=async(req,res)=>{
        const files=await File.find({uploadedBy:req.user._id}).sort({createdAt:-1});
        res.status(200).json(files);
    
}
//download a file
export const downloadFile=async(req,res)=>{
    const file=await file.findById(req.params.id);
    if(!file){
        return res.status(404).json({message:'File not found'});
    }
    else{
        const FilePath=path.join(__dirname,'..','uploads',file.storedName);
        res.download(filePath,file.originalName,(err)=>{
            if(err){
                console.error('Error downloading file:', err);
                res.status(500).json({message:'Error downloading file'});
            }
        });
    }
};
//delete a file
export const deleteFile=async(req,res)=>{
    const file=await File.findById(req.params.id);
    if(!file)return res.status(404).json({message:'File not found'});
    //remove from disk
    fs.unlinkSync(path.join(__dirname,'..','uploads',file.storedName));
    await file.remove();
    res.status(200).json({message:'File deleted successfully'});
    
};