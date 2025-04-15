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
    origin: function (origin, callback) {
        const allowedOrigins = [
            "http://localhost:5174", // for local dev
            "https://quickshop-server-mwtv.onrender.com" // ✅ your live frontend URL
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes); // ✅ Register category route

app.listen(6001, () => console.log("Server running on port 6001"));
