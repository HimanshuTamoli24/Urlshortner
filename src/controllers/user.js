import { User } from "../models/user.js";
import { v4 as uuidv4 } from 'uuid';
import { setUser } from "../service/auth.js";

// Handles user signup
async function handleUserSignup(req, res) {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Please provide all the required fields" });
        }

        // Create the user
        await User.create({
            username, email, password
        });

        // Redirect to home page after successful signup
        return res.redirect("/");
    } catch (error) {
        console.error(error);
        // Correct the error message formatting
        return res.status(500).json({ errorMessage: "Failed to create user" });
    }
}

// Handles user login
async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;

        // Find user with provided email and password
        const loginUser = await User.findOne({
            email, password
        });

        // Check if user exists
        if (!loginUser) {
            return res.status(401).render("login", { error: "Invalid credentials" });
        }

        // Set token and send cookie
        const token = setUser(loginUser);
        res.cookie("session_id", token, { httpOnly: true });

        // Redirect to home page after successful login
        return res.redirect("/");
    } catch (error) {
        console.error(error);
        // Correct the error message formatting
        return res.status(500).render("error",{ errorMessage: "Failed to log in" });
    }
}


export {
    handleUserSignup,
    handleUserLogin
};
