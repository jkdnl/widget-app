const express = require("express")
const router = express.Router({mergeParams: true})
const dataModel = require("../models/data")

router.get("/", async (req, res) => {
    try {
        const data = await dataModel.find()
        res.status(200).send(data)
    } catch (e) {
        res.status(500).json({
            message: "Server error, try again later"
        })
    }
})

module.exports = router