const express = require('express');
const router = express.Router();
const { Image } = require("../models/Image")
const path = require("path")

router.get("/uploads/:id", async (req, res) => {

    const { id } = req.params;
    const image = await Image.findById(id);
    if (!image) {
        return res.status(404).json({ message: "Image not found" });
    }

    res.sendFile(path.join(__dirname, "..", image.path));

})

module.exports = router