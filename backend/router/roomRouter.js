const express = require('express')

const router = express.Router()

//Model
const { Room } = require('../models/Room'); // Import Room model

// Route to get all rooms
router.get("/room", async (req, res) => {
    try {
        const rooms = await Room.find().populate('users');
        res.json(rooms);
    } catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to get a room by ID
router.get("/room/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const room = await Room.findById(id).populate('users');
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.json(room);
    } catch (error) {
        console.error("Error fetching room:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to add a new room
router.post("/room", async (req, res) => {
    const { room_name, users , description } = req.body;
    try {
        const newRoom = new Room({ room_name, users, description });
        await newRoom.save();
        res.status(200).json(newRoom);
    } catch (error) {
        console.error("Error adding room:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.put("/room/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const updatedRoom = await Room.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedRoom) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.json(updatedRoom);
        console.log("Room updated successfully");
    } catch (error) {
        console.error("Error updating room:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to delete a room by ID
router.delete("/room/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const room = await Room.findByIdAndDelete(id);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.json({ message: "Room deleted successfully" });
    } catch (error) {
        console.error("Error deleting room:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to delete all rooms
router.delete("/rooms", async (req, res) => {
    try {
        await Room.deleteMany({});
        res.json({ message: "All rooms deleted successfully" });
    } catch (error) {
        console.error("Error deleting rooms:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router
