const dns = require("dns");

// Use Google and Cloudflare DNS
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ===============================
// MIDDLEWARE
// ===============================

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// MONGODB CONNECTION
// ===============================

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
    console.error("❌ MONGODB_URI is missing from .env");
    process.exit(1);
}

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected");
    })
    .catch((error) => {
        console.error("❌ MongoDB connection error:", error.message);
        process.exit(1);
    });

// ===============================
// ROUTES
// ===============================

// Authentication routes
const authRouter = require("./routes/auth");

app.use("/api/auth", authRouter);

// Student routes
const studentsRouter = require("./routes/students");

app.use("/api/students", studentsRouter);

// ===============================
// TEST ROUTE
// ===============================

app.get("/", (req, res) => {
    res.status(200).send("Server is running...");
});

// ===============================
// 404 ROUTE
// ===============================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// ===============================
// ERROR HANDLER
// ===============================

app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err);

    res.status(500).json({
        success: false,
        message: err.message || "Internal server error"
    });
});

// ===============================
// START SERVER
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌐 http://localhost:${PORT}`);
});