import jwt from 'jsonwebtoken';
import  users  from '../models/user.model.js';

export const protect=async(req, res, next) => {
let token;
if(
    req.headers.authoritization &&
    req.headers.authoritization.startsWith('Bearer')
){
    try{
        token=req.headers.authoritization.split(' ')[1];
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        req.user=await users.findById(decoded.id).select('-password');
        next();
    }
    catch(error){
        res.status(401).json({message:'Not authorized, token failed'});

    }
}
if(!token){
    res.status(401).json({message:'Not authorized, no token'});

}

};