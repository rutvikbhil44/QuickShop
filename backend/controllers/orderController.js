const Order = require("../models/Order");

const placeOrder = async (req, res) => {
    try {
        const { userId, items, totalAmount } = req.body;
        const newOrder = new Order({ userId, items, totalAmount, status: "Pending" });

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error placing order", error });
    }
};

module.exports = { placeOrder };
