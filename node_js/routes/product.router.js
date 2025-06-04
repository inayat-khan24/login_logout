import express from "express";
import dotenv from "dotenv";

import { ensureAuthenticated } from "../middleware/auth.js";

// Load environment variables from .env file
dotenv.config();

const router = express.Router();

// Protected route - accessible only with valid JWT
router.get("/", ensureAuthenticated, (req, res) => {
    
    
    res.status(200).json([
        {
            name: "mobile",
            price: 100001,
            
           
        },
        {
            name: "tv",
            price: 20000
        }
    ]);
});

export default router;
