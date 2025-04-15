const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Get all unique categories from products
router.get("/", async (req, res) => {
    try {
        const categories = await Product.distinct("category");
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories", error });
    }
});

module.exports = router;
