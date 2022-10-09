const { Schema, model } = require("mongoose")

const schema = new Schema({
    date: String,
    name: String,
    quantity: Number,
    distance: Number
}, {
    timestamps: true
})

module.exports = model("Data", schema)