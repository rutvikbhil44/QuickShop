const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        console.log("🔍 Incoming Authorization Header:", req.header("Authorization"));

        const token = req.header("Authorization");
        if (!token) {
            return res.status(403).json({ message: "Access Denied" });
        }

        // Extract "Bearer token"
        const tokenParts = token.split(" ");
        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
            return res.status(400).json({ message: "Invalid Token Format" });
        }

        const verified = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
        req.user = verified;
        console.log("✅ Token Verified for User ID:", verified.id);
        next();
    } catch (error) {
        console.error("❌ Token Verification Failed:", error.message);
        res.status(401).json({ message: "Invalid Token" });
    }
};

// ✅ Check if user is admin
const isAdmin = (req, res, next) => {
    console.log("🔍 Checking Admin Role for User:", req.user?.role);

    if (req.user?.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }

    next();
};

module.exports = { verifyToken, isAdmin };
