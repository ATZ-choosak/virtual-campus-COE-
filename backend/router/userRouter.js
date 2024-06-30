const express = require('express')
const router = express.Router()

//Model
const { User } = require('../models/User'); // Import User model
const jwtValidate = require('../middleware/jwtValidate');

router.put("/user/:id", jwtValidate, async (req, res) => {
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
router.post("/user", jwtValidate, async (req, res) => {
    const { name, position, image } = req.body;
    try {
        const newUser = new User({ name, position, image });
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to get all users
router.get("/user", async (req, res) => {
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
router.delete("/user/:id", jwtValidate, async (req, res) => {
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
router.delete("/users", jwtValidate, async (req, res) => {
    try {
        await User.deleteMany({});
        res.json({ message: "All users deleted successfully" });
    } catch (error) {
        console.error("Error deleting users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router