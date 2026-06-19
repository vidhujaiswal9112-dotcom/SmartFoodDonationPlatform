const express = require("express");
const router = express.Router();

const Donation = require("../model/donation");

// Add Donation
router.post("/add", async (req, res) => {

    try {

        const { foodName, quantity, location, expiryTime } = req.body;

        const donation = new Donation({
            foodName,
            quantity,
            location,
            expiryTime
        });

        await donation.save();

        res.status(201).json({
            message: "Donation added successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

});


// View Donations
router.get("/all", async (req, res) => {

    try {

        const donations = await Donation.find();

        res.json(donations);

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

});


// Delete Donation
router.delete("/:id", async (req, res) => {

    try {

        await Donation.findByIdAndDelete(req.params.id);

        res.json({
            message: "Donation deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

});


// Update Status
router.put("/claim/:id", async (req, res) => {

    try {

        await Donation.findByIdAndUpdate(

            req.params.id,

            {
                status: "Claimed"
            }

        );

        res.json({
            message: "Donation claimed successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

});

module.exports = router;