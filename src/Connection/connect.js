import mongoose from 'mongoose';

// Function to connect to MongoDB
async function connection(url) {
    try {
        // Attempt to connect to the MongoDB database
        await mongoose.connect(url);
        console.log('MongoDB Connected...'); 
    } catch (error) {
        // Log error if connection fails
        console.error('Error connecting to MongoDB:', error);
    }
}

export default connection; // Export connection function for use in other parts of the application
