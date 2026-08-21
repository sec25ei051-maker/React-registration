const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const router = express.Router();

// ===============================
// REGISTER USER
// ===============================

router.post("/register", async (req, res) => {
    try {
        console.log("\n==============================");
        console.log("REGISTER REQUEST RECEIVED");
        console.log("==============================");

        const {
            username,
            email,
            password,
            confirmPassword
        } = req.body;

        console.log("Username:", username);
        console.log("Email:", email);

        // Check required fields
        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check password
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        // Check existing email
        const existingEmail = await User.findOne({
            email: email.toLowerCase()
        });

        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        // Check existing username
        const existingUsername = await User.findOne({
            username: username
        });

        if (existingUsername) {
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
            username: username,
            email: email.toLowerCase(),
            password: hashedPassword
        });

        // Save user to MongoDB
        const savedUser = await user.save();

        console.log("\n✅ USER SAVED SUCCESSFULLY");
        console.log("User ID:", savedUser._id);
        console.log("Username:", savedUser.username);
        console.log("Email:", savedUser.email);
        console.log("==============================\n");

        // Send response to React
        res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email
            }
        });

    } catch (error) {
        console.error("\n❌ REGISTER ERROR:");
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message || "Registration failed"
        });
    }
});

module.exports = router;