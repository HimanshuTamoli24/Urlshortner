import { nanoid } from "nanoid"
import Url from "../models/url.js"
async function handleUrl(req, res) {
    try {
        const shortID = nanoid(8)
        const { redirecturl } = req.body
        if (!redirecturl) {
            return res.status(400).json({ error: "Please provide a valid URL" })
        }
        await Url.create(
            {
                shortId: shortID,
                redirectUrl: redirecturl,
                visitHistory: [],

            })
        res.json({ shortUrl: `https://yourdomain.com/${shortID}` })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to create URL" })

    }
}


export {
    handleUrl,

}