const express = require("express");
const mongoose = require("mongoose");
const { Room } = require('./models/Room'); // Import Room model
const { User } = require('./models/User'); // Import User model
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use('/images', express.static('public/images'));
// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://fadeenan2003:1680@datacoe.ijej1kb.mongodb.net/?retryWrites=true&w=majority&appName=DataCOE');
        console.log("Connected to database");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1); // Exit the process with a failure code
    }
};

// Connect to the database before starting the server
connectDB();

// Route to get all rooms
app.get("/room", async (req, res) => {
    try {
        const rooms = await Room.find().populate('users');
        res.json(rooms);
        console.log("ReadDataSuccess");
    } catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to get a room by ID
app.get("/room/:id", async (req, res) => {
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
app.post("/room", async (req, res) => {
    const { room_name, users } = req.body;
    try {
        const newRoom = new Room({ room_name, users });
        await newRoom.save();
        res.status(201).json(newRoom);
    } catch (error) {
        console.error("Error adding room:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.put("/room/:id", async (req, res) => {
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

app.put("/user/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);
        console.log("User updated successfully");
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to add a new user
app.post("/user", async (req, res) => {
    const { name, position, image } = req.body;
    try {
        const newUser = new User({ name, position, image });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to get all users
app.get("/user", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
        console.log("ReadDataSuccess");
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to delete a user by ID
app.delete("/user/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to delete all users
app.delete("/users", async (req, res) => {
    try {
        await User.deleteMany({});
        res.json({ message: "All users deleted successfully" });
    } catch (error) {
        console.error("Error deleting users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to delete a room by ID
app.delete("/room/:id", async (req, res) => {
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
app.delete("/rooms", async (req, res) => {
    try {
        await Room.deleteMany({});
        res.json({ message: "All rooms deleted successfully" });
    } catch (error) {
        console.error("Error deleting rooms:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(9090, () => {
    console.log("Server running on port 9090...");
});
