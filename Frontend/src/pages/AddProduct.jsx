import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]); // Dynamic categories
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        image: "",
        category: "",
    });

    // Fetch categories from backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("http://localhost:6001/api/categories");
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:6001/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(product),
            });

            const data = await res.json();
            if (res.ok) {
                alert("Product added successfully!");
                navigate("/");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold text-center mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" placeholder="Product Name" onChange={handleChange} required className="input-field" />
                <input type="number" name="price" placeholder="Price" onChange={handleChange} required className="input-field" />
                <input type="text" name="description" placeholder="Description" onChange={handleChange} required className="input-field" />
                <input type="text" name="image" placeholder="Image URL" onChange={handleChange} required className="input-field" />

                {/* Category Dropdown */}
                <select name="category" onChange={handleChange} required className="input-field">
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <button type="submit" className="btn-primary">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
