import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,

    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    }
},{timestamps:true});

const users=mongoose.model('users',userSchema);

export default users;