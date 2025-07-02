import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename:(req,file,cb)=>{
    const ext =path.extname(file.originalname);
    cb(null,'${Date.now()}-${file.fieldname}${ext}`);')
  }
});
//file filter
const fileFilter=(req,file,cd)=>{
    cb(null,true);//accept all files
};
//initialize upload middleware
const upload=(multer) ({
    storage,
    fileFilter,
    limits:{
        fileSize: 1024 * 1024 * 50 //50MB limit
    }
});
export default upload;