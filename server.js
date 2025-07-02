import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import initializeMongoDB from './config/db.js';
import{ notFound, errorHandler } from './middlewares/error.middleware.js';
import fileRouter  from './routes/file.routes.js';
import authRouter from './routes/auth.routes.js';


dotenv.config();

//initialiaze express app
const app=express();
app.use(express.json);

app.use(cors({
    origin:"*"
}))

//apis
//app.use('/api/files',fileRouter);
app.use('/api/users',authRouter);

//connect to mongodb
mongoose.connect(process.env.MONGO_URI, {dbName:'EDMS'})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })

    })
        .catch ((error) =>{
        console.error('Error starting the server:', error)
    
    process.exit
    });
    //error handling
    app.use(notFound);
    app.use(errorHandler);
    //start the server
    const PORT=process.env.PORT||5000;
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
    });