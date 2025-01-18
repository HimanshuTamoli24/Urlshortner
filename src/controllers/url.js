import { nanoid } from "nanoid"
import Url from "../models/url.js"
async function handleUrl(req, res) {
    try {
        const shortID = nanoid(8)
        const { redirecturl } = req.body
        if (!redirecturl || typeof redirecturl !== 'string' || !redirecturl.trim()) {
            return res.status(400).json({ error: "Please provide a valid URL" })
        }
        // Check if the URL already exists
        const existingUrl = await Url.findOne({ redirectUrl: redirecturl });
        if (existingUrl) {
            return res.status(400).json({
                error: 'This URL has already been shortened',
                shortUrl: existingUrl.shortId,
            });
        }
        await Url.create(
            {
                shortId: shortID,
                redirectUrl: redirecturl,
                visitHistory: [],

            })
        res.json({ shortUrl: shortID })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to create URL" })

    }
}
async function handleAnalatics(req, res) {
    try {
        // Accessing shortID from URL params
        const { shortID } = req.params;

        const result = await Url.findOne({ shortId: shortID }); // Make sure to use the correct field name 'shortId'

        if (!result) {
            return res.status(404).json({ error: "URL not found" });
        }

        console.log(result);
        console.log(result.visitHistory);

        return res.json({
            totalClicks: result.visitHistory.length,
            analysis: result.visitHistory
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to analyze URL" });
    }
}

export {
    handleUrl,
    handleAnalatics
}