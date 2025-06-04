import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { route } from "./routes/formRoutes.js";
import ProductRouter from "./routes/product.router.js";

// Load environment variable
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Port from .env or fallback
const PORT = process.env.PORT || 5001;

// Root route (optional)
app.use("/",route)
// for product
app.use("/products",ProductRouter)  //? after sending token


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
