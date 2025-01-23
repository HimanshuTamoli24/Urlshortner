// src/Routes/routes.js

import express from 'express';
import { handleAnalatics, handleUrl, handleRedirectUrl } from '../controllers/url.js';

const urlRouter = express.Router();  // Create a new router instance


// Create a shortened URL
urlRouter.post('/', handleUrl);

// Redirect route for shortened URL
urlRouter.get("/:shortId", handleRedirectUrl);

// Analytics route for shortened URL
urlRouter.get('/analytics/:shortID', handleAnalatics); 

export default urlRouter;
