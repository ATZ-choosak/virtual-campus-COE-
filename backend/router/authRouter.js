const express = require('express')

const router = express.Router()

router.post("/login", (req, res) => {

    const { username, password } = req.body

    if (username === process.env.USERNAME && password === process.env.PASSWORD) {

        const access_token = jwtGenerate(`${username} role admin`)

        res.json({
            access_token
        })

    } else {
        res.status(400).json({
            message: "Username or Password Incorrect."
        })
    }

})

module.exports = router