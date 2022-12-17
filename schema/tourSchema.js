const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
    tourName: {
        type: String,
        require: [true, 'Tour name is required'],
        min: [6, 'Must be at least 6, got {VALUE}'],
        max: 12,
        unique: true,
        trime: true,
    },
    price: {
        type: Number,
        require: [true, 'Tour price is required'],
        trime: true,
    },
    days: {
        type: Number,
        require: [true, 'Tour days is required'],
        trime: true,
    },
    description: {
        type: String,
        require: [true, 'Tour name is required'],
        trime: true,
    },
    count: {
        type: Number,
        default: 0,
    },
});

module.exports = tourSchema;
