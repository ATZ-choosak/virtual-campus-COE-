const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    room_name: { type: String, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Reference to User IDs
});

const Room = mongoose.model('Room', roomSchema);

module.exports = { Room };
