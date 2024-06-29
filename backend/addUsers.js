const axios = require('axios');

const users = [
    {
        "name": "Alice Smith",
        "position": "Developer",
        "image": "/images/alicesmith.png"
    },
    {
        "name": "Bob Johnson",
        "position": "Designer",
        "image": "/images/bobjohnson.png"
    },
    {
        "name": "Charlie Brown",
        "position": "Product Manager",
        "image": "/images/charliebrown.png"
    },
    {
        "name": "Dana White",
        "position": "QA Engineer",
        "image": "/images/danawhite.png"
    },
    {
        "name": "Eve Adams",
        "position": "Scrum Master",
        "image": "/images/eveadams.png"
    }
];

const addUser = async (user) => {
    try {
        const response = await axios.post('http://localhost:9090/user', user);
        console.log(`Added user: ${response.data.name}`);
    } catch (error) {
        console.error(`Error adding user: ${error.response ? error.response.data : error.message}`);
    }
};

const addUsers = async () => {
    for (const user of users) {
        await addUser(user);
    }
};

addUsers();
