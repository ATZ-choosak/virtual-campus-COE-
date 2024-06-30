const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { User } = require('../models/User'); // Import User model
const jwtValidate = require('../middleware/jwtValidate');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/uploads'); // Store files in public/uploads folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename
    }
});

// Set up Multer middleware
const upload = multer({ storage: storage });

// Middleware for error handling
const asyncHandler = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// Route to get all users with optional filtering by name
router.get("/user", asyncHandler(async (req, res) => {
    const { name } = req.query;
    let query = {};

    if (name) {
        query.name = new RegExp(name, 'i'); // Case insensitive search for user name
    }

    const users = await User.find(query);
    res.json(users);
}));

// Route to get a user by ID
router.get("/user/:id", asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
}));

// Route to add a new user with image upload
router.post("/user", jwtValidate, upload.single('image'), asyncHandler(async (req, res) => {
    const { name, position } = req.body;
    const image = req.file ? req.file.path : '';

    if (!name || !position || !image) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = new User({ name, position, image });
    await newUser.save();
    res.status(200).json(newUser);
}));

// Route to update a user by ID
router.put("/user/:id", jwtValidate, upload.single('image'), asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, position } = req.body;
    let updateFields = { name, position };

    // Check if image is uploaded
    if (req.file) {
        updateFields.image = req.file.path;
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));

// Route to delete a user by ID
router.delete("/user/:id", jwtValidate, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
}));

// Route to delete all users
router.delete("/users", jwtValidate, asyncHandler(async (req, res) => {
    await User.deleteMany({});
    res.json({ message: "All users deleted successfully" });
}));

module.exports = router;
