const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    room_id: { type: String, required: true },
    room_name: { type: String, required: true },
    description: { type: String, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Reference to User IDs
});

const Room = mongoose.model('Room', roomSchema);

module.exports = { Room };
