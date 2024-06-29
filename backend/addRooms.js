const axios = require('axios');

const rooms = [
    {
        "room_name": "Conference Room A",
        "users": ["667f0e92d257b23f56b0033a", "667f0e92d257b23f56b0033c"]
    },
    {
        "room_name": "Meeting Room B",
        "users": ["667f0e92d257b23f56b0033e", "667f0e93d257b23f56b00340"]
    },
    {
        "room_name": "Training Room C",
        "users": ["667f0e93d257b23f56b00342", "667f0e92d257b23f56b0033a"]
    },
    {
        "room_name": "Executive Room D",
        "users": ["667f0e92d257b23f56b0033c", "667f0e92d257b23f56b0033e"]
    },
    {
        "room_name": "Small Room E",
        "users": ["667f0e93d257b23f56b00340", "667f0e93d257b23f56b00342"]
    }
];

const addRoom = async (room) => {
    try {
        const response = await axios.post('http://localhost:9090/room', room);
        console.log(`Added room: ${response.data.room_name}`);
    } catch (error) {
        console.error(`Error adding room: ${error.response ? error.response.data : error.message}`);
    }
};

const addRooms = async () => {
    for (const room of rooms) {
        await addRoom(room);
    }
};

addRooms();
