const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors")

//ENV
require('dotenv').config()

//Router

const roomRouter = require("./router/roomRouter")
const userRouter = require("./router/userRouter")
const authRouter = require("./router/authRouter")

// Middleware to parse JSON bodies
app.use(
    cors({
      origin: process.env.PRODUCTION ? "*" : "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );
app.use(express.json());
app.use('/uploads', express.static('public/uploads'));



//Use Router
app.use("/api" , roomRouter)
app.use("/api" , userRouter)
app.use("/auth" , authRouter)

// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to database");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1); // Exit the process with a failure code
    }
};


// Connect to the database before starting the server
connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}...`);
});
