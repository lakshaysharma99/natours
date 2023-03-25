const mongoose = require('mongoose')
const slugify = require('slugify')

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
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})
//we can also pass an object for schema options in along with schema in schema definition mongoose.Schema() ;
//toJSON: { virtuals: true } : this means that whenever json data is output as JSON, we want the virtuals to be true; same for objects


//get is used because this virtual property will be
//created every time we get something out the database
//we use an regular function here because arrow function do not have their own this
tourSchema.virtual('durationWeeks').get(function() {
    return this.duration/7
})

const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour;