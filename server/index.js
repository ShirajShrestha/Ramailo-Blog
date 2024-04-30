import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoute.js";
import blogRoutes from "./routes/blogRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import Category from "./models/category.js";
import { seedCategories } from "./dataSeeder.js";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Database Connection
try {
  mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
} catch (error) {
  console.log(error);
}

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const categoriesExist = await Category.exists();
if (!categoriesExist) {
  await seedCategories();
}

// Routes
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/category", categoryRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server started..");
});
