const express = require("express");
const {
    addProduct,
    getProducts,
    deleteProduct,
    updateProduct,
    getProductById
} = require("../controllers/productController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Get All Products (Public)
router.get("/", getProducts);

// ✅ Add Product (Admin Only)
router.post("/", verifyToken, isAdmin, addProduct);

// ✅ Update Product by ID (Admin Only)
router.put("/:id", verifyToken, isAdmin, updateProduct);

// ✅ Delete Product by ID (Admin Only)
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

// ✅ Get Single Product by ID (Public)
router.get("/:id", getProductById);


module.exports = router;
