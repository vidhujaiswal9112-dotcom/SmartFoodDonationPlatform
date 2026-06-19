const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    expiryTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Available"
    }
});

module.exports = mongoose.model("Donation", donationSchema);