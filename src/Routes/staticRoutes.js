import express from 'express';
import Url from '../models/url.js';
const staticRouter = express.Router();

staticRouter.get('/', async (req, res) => {
    try {
        const allUrls = await Url.find({});  // Correct method to fetch all documents

        return res.render("home", {
            urls: allUrls,
            title: "URL Shortener"
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

export default staticRouter;
