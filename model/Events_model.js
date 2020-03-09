const mongoose = require('mongoose');


const eventLogs = mongoose.Schema({
    user : String,
    date: String,
    time: String,
    type: String,
    eventID:String,
    PPID:String
})

module.exports = mongoose.model('eventLogs', eventLogs);

