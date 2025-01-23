import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

// Load environment variables
configDotenv();

function setUser(user) {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment variables.");
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Token expires in 1 hour
    );

    return token;
}

function getUser(token) {
    if (!token) {
        return null;
    }

    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error("Invalid or expired token:", error.message);
        return null; // Return null if verification fails
    }
}

export {
    setUser,
    getUser,
};
