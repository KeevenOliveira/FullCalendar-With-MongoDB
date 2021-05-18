const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    task: { type: String, required: true },
    start: Date,
    end: Date,
})

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;