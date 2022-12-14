const express = require("express")
const config = require("config")
const mongoose = require("mongoose")
const initDatabase = require("./setupDatabase/initDatabase")
const routes = require("./routes/index")
const cors = require("cors")
const path = require("path")

const PORT = config.get("port")
const URI = config.get("mongoURI")

const { connect, connection } = mongoose

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use("/api", routes)

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "client")))
    const index = path.join(__dirname, "client", "index.html")
    app.get("*", (req, res) => {
        res.sendFile(index)
    })
}

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