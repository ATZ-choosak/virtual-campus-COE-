const jwt = require("jsonwebtoken")

const jwtGenerate = (user) => {
    const accessToken = jwt.sign(
        { name: user.name, id: user.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d", algorithm: "HS256" }
    )

    return accessToken
}

module.exports = jwtGenerate