const mongoose = require('mongoose')
require('dotenv/config')

function mongoSetup() {
    mongoose.connect(process.env.CONN, (err) => {
        if (err) console.log("DB Failed to Connect");
        console.log("DB Connected Successfully..");
    })
}

module.exports = mongoSetup
