const express = require("express")
const router = express.Router({mergeParams: true})

router.use("/data", require("./data.routes"))

module.exports = router