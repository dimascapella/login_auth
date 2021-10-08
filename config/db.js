const mongoose = require('mongoose')
require('dotenv/config')

module.exports = mongoose.connect(process.env.MONGODB_CONNECTION, () => {
    console.log(`Connected to ${process.env.MONGODB_CONNECTION}`)
})