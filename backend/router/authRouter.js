const express = require('express')
const { Admin } = require('../models/Admin')
const jwtGenerate = require("../jwt/jwtGenerate")

const router = express.Router()

router.post("/login", async (req, res) => {

    const { username, password } = req.body

    let db_admin = await Admin.findOne({username})

    if (username === db_admin.username && password === db_admin.password && db_admin) {

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