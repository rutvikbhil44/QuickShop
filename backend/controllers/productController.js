const Product = require("../models/Product");



// ✅ Get all products (Public)
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};

// ✅ Add a new product (Admin only)
const addProduct = async (req, res) => {
    try {
        const { name, price, description, image, category } = req.body;

        // Validate required fields
        if (!name || !price || !description || !image || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newProduct = new Product({ name, price, description, image, category });
        await newProduct.save();

        res.status(201).json({ message: "Product added successfully!", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Error adding product", error: error.message });
    }
};

// ✅ Update a product by ID (Admin only)
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully!", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

// ✅ Delete a product by ID (Admin only)
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("🔹 Incoming DELETE request for product ID:", id);
        console.log("🔹 User role:", req.user?.role);

        if (req.user?.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully!", productId: id });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};

// ✅ Fetch a single product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { getProducts, addProduct, updateProduct, deleteProduct, getProductById };
