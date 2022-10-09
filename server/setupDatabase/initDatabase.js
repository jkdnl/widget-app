const dataDB = require("../mockDb/data.json")
const dataModel = require("../models/data")

module.exports = async () => {
    const data = await dataModel.find()
    if (data.length !== dataDB.length) {
        await dataModel.collection.drop()
        dataDB.map(async item => await dataModel.create(item))
    }
}