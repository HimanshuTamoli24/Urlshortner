// src/Routes/routes.js

import express from 'express';
import { handleAnalatics, handleUrl, handleRedirectUrl } from '../controllers/url.js';

const router = express.Router();  // Create a new router instance


// Create a shortened URL
router.post('/', handleUrl);

// Redirect route for shortened URL
router.get("/:shortId", handleRedirectUrl);

// Analytics route for shortened URL
router.get('/analytics/:shortID', handleAnalatics);

export default router;
