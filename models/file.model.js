import mongoose from 'mongoose';


const fileSchema = new mongoose.Schema({
    originalName:{
        type:String,
        required:true,
        trim:true,
    },
    storedName:{
         type:String,
         required:true,
    },
    size:{
        type:Number,
        required:true,

    },
    mimetype:{
        type:String,
        required:true,
    },
    path:{
        type:String,
        required:true,
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }
   


},
{timestamps:true});

const File=mongoose.model('File',fileSchema);

export default File;
    