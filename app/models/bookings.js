const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const bookingSchema = new Schema({
    id: { type: Number, default: 0 },
    name: { type: String, default: "" },
    roomNumber: { type: Number, default: 0 },
    startDate: { type: Date, default: "0000-00-00 00:00:00" },
    endDate: { type: Date, default: "0000-00-00 00:00:00" }
});

const Bookings = mongoose.model('Bookings', bookingSchema);

module.exports = Bookings