const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    image: { type: String, required: true }, // Path to the image in the database
    email: { type: String, required: true } 
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
