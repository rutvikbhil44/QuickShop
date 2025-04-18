require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes"); // ✅ Import category routes

const app = express();
connectDB();

const corsOptions = {
  origin: ["https://quickshop-frontendd.onrender.com", "http://localhost:5174", "http://localhost:5173"], // Add the live frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};



app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes); // ✅ Register category route

app.listen(6001, () => console.log("Server running on port 6001"));
