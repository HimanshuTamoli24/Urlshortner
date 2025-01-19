
import Url from "../models/url.js";



// Handles serving the home page with all URLs
async function handleStaticRoutes(req, res) {
    try {
        // Fetch all shortened URLs from the database
        const allUrls = await Url.find({});

        // Render the home page with the URLs
        return res.render("home", {
            urls: allUrls,
            title: "URL Shortener",
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

// Handles serving the signup page
async function handleSignupRoutes(req, res) {
    return res.render("signup")
}

// Handles serving the login page
async function handleLoginRoutes(req, res) {
    return res.render("login")
}

export {
    handleStaticRoutes,
    handleSignupRoutes,
    handleLoginRoutes,
};
