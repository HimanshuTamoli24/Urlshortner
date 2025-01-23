import { nanoid } from "nanoid";
import Url from "../models/url.js";

// Handles creating a shortened URL
async function handleUrl(req, res) {
    try {
        // Generate a short ID for the URL
        const shortID = nanoid(8);
        const { redirecturl } = req.body;

        // Validate the provided URL
        if (!redirecturl || typeof redirecturl !== 'string' || !redirecturl.trim()) {
            return res.status(400).render("error", { errorMessage: "Please provide a valid URL" });
        }

        // Check if the URL already exists
        const existingUrl = await Url.findOne({ redirectUrl: redirecturl });
        if (existingUrl) {
            return res.status(400).render("error", {
                errorMessage: 'This URL has already been shortened',
                shortUrl: existingUrl.shortId,
            });
        }

        // Create the shortened URL entry
        await Url.create({
            shortId: shortID,
            redirectUrl: redirecturl,
            visitHistory: [],
        });

        // Render the home page with the new short ID
        return res.render("home", { id: shortID });
    } catch (error) {
        console.error(error);
        res.status(500).render("error", { errorMessage: "Failed to create URL" });
    }
}

// Handles fetching analytics for a shortened URL
async function handleAnalatics(req, res) {
    try {
        // Extract short ID from URL parameters
        const { shortID } = req.params;

        // Find the URL by its short ID
        const result = await Url.findOne({ shortId: shortID });

        // If URL not found, return an error
        if (!result) {
            return res.status(404).render("error", { errorMessage: "URL not found" });
        }

        // Return the analytics (clicks and visit history)
        return res.json({
            totalClicks: result.visitHistory.length,
            analysis: result.visitHistory,
        });
    } catch (error) {
        console.error(error);
        res.status(500).render("error", { errorMessage: "Failed to analyze URL" });
    }
}

// Handles redirecting to the original URL and recording visits
async function handleRedirectUrl(req, res) {
    const { shortId } = req.params;
    try {
        // Update the visit history each time the shortened URL is accessed
        const entry = await Url.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: new Date() } },
            { new: true }
        );

        // If no matching short ID, return an error
        if (!entry) {
            return res.status(404).render("error", { errorMessage: "Short ID not found" });
        }

        // Redirect the user to the original URL
        res.redirect(entry.redirectUrl);
    } catch (error) {
        console.error(error);
        res.status(500).render("error", { errorMessage: "Failed to retrieve URL" });
    }
}

export {
    handleUrl,
    handleAnalatics,
    handleRedirectUrl,
};
