const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../model/user");

router.get("/", (req, res) => {
    res.send("User Route Working");
});

router.post("/register", async (req, res) => {

    try {

        const { name, email, password, role } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    }
    catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: "User not found"
            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid password"
            });

        }

        res.status(200).json({
            message: "Login successful",
            user
        });

    }
    catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

module.exports = router;