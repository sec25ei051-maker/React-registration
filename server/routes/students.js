const express = require("express");
const router = express.Router();

const Student = require("../models/Student");

router.post("/register", async (req, res) => {
    try {
        console.log("================================");
        console.log("REGISTRATION REQUEST RECEIVED");
        console.log("BODY:", req.body);
        console.log("================================");

        const student = new Student(req.body);

        const savedStudent = await student.save();

        console.log("STUDENT SAVED:");
        console.log(savedStudent);

        res.status(201).json({
            success: true,
            message: "Student registered successfully",
            student: savedStudent
        });

    } catch (error) {
        console.error("REGISTRATION ERROR:");
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;