const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name!'],
        unique: true,
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price!']
    },
    rating: {
        type: Number,
        default: 4.5
    },
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration!']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a max size!']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty!']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim:true
    },
    imageCover: {
        type: String,
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date]
})

const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour;