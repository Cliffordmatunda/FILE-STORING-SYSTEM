import mongoose from 'mongoose';


async function initializeMongoDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI, {dbName:'EDMS'});
        console.log('MongoDB connected successfully');

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}
export default initializeMongoDB;