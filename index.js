const app = require("./app")

const dotenv = require("dotenv")
const cloudinary = require("cloudinary")
const connectDatabase = require("./config/database")

// handled Uncaught Excception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("sutting down Uncaught Excception")
    process.exit(1)
})


connectDatabase()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const server = app.listen(process.env.PORT, ()=>{
    console.log(`server on http://localhost:${process.env.PORT}`)
})

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("sutting down Unhandled Promise Rejection")

    server.close(() => {
        process.exit(1)
    })
})