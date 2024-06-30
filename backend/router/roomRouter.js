const express = require('express');
const router = express.Router();
const { Room } = require('../models/Room'); // Import Room model
const { User } = require('../models/User'); // Import User model
const jwtValidate = require("../middleware/jwtValidate")

// Middleware for error handling
const asyncHandler = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// Route to get all rooms with optional filtering by room_name and user_name
router.get("/room", asyncHandler(async (req, res) => {
    const { room_name, user_name } = req.query;
    let query = {};

    if (room_name) {
        query.room_name = new RegExp(room_name, 'i'); // Case insensitive search
    }

    if (user_name) {
        const users = await User.find({ name: new RegExp(user_name, 'i') }); // Find users by name
        const userIds = users.map(user => user._id); // Extract user IDs
        query.users = { $in: userIds }; // Find rooms with these user IDs
    }

    const rooms = await Room.find(query).populate('users');
    res.json(rooms);
}));

// Route to get a room by ID
router.get("/room/:id", asyncHandler(async (req, res) => {
    const { id } = req.params;
    const room = await Room.findById(id).populate('users');
    if (!room) {
        return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
}));

// Route to add a new room
router.post("/room", jwtValidate, asyncHandler(async (req, res) => {
    const { room_name, users, description } = req.body;

    if (!room_name || !users || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newRoom = new Room({ room_name, users, description });
    await newRoom.save();
    res.status(200).json(newRoom);
}));

// Route to update a room by ID
router.put("/room/:id", jwtValidate, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedRoom = await Room.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedRoom) {
        return res.status(404).json({ message: "Room not found" });
    }
    res.json(updatedRoom);
}));

// Route to delete a room by ID
router.delete("/room/:id", jwtValidate, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const room = await Room.findByIdAndDelete(id);
    if (!room) {
        return res.status(404).json({ message: "Room not found" });
    }
    res.json({ message: "Room deleted successfully" });
}));

// Route to delete all rooms
router.delete("/rooms", jwtValidate, asyncHandler(async (req, res) => {
    await Room.deleteMany({});
    res.json({ message: "All rooms deleted successfully" });
}));

// Global error handler
router.use((err, req, res, next) => {
    console.error("Internal server error:", err);
    res.status(500).json({ message: "Internal server error" });
});

module.exports = router;
