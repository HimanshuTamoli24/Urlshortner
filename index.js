import express from "express";
const app = express();
const PORT = 8009;
import Url from "./src/models/url.js";
import router from "./src/Routes/routes.js";
import connection from "./src/Connection/connect.js";

app.use(express.json());
app.use("/url", router);

connection(
    "mongodb+srv://himanshutamoli2005:himanshutamoli2005@cluster0.wyzbs.mongodb.net/"
);

app.get("/:shortId", async (req, res) => {
    const { shortId } = req.params;
    try {
        const entry = await Url.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: new Date() } },
            { new: true }
        );
        if (!entry) {
            return res.status(404).json({ error: "Short ID not found" });
        }
        res.redirect(entry.redirectUrl);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve URL" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
