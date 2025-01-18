import mongoose from 'mongoose';

async function connection(url) {
    try {
        await mongoose.connect(url);
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export default connection;