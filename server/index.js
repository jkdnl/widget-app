const express = require("express")
const config = require("config")
const mongoose = require("mongoose")
const initDatabase = require("./setupDatabase/initDatabase")
const routes = require("./routes/index")
const cors = require("cors")

const PORT = config.get("port")
const URI = config.get("mongoURI")

const { connect, connection } = mongoose

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use("/api", routes)

// if (process.env.NODE_ENV === "production") {
//     console.log("production server")
// } else {
//     console.log("development server")
// }

async function startServer() {
    try {
        connection.once("open", () => {
            initDatabase()
        })
        await connect(URI)
        app.listen(PORT, () => {
            console.log(`Server launched on port ${PORT}`)
        })
    } catch (e) {
        console.log("Server error")
        process.exit(1)
    }
}
startServer()