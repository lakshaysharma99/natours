const mongoose = require('mongoose')
const slugify = require('slugify')

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name!'],
        unique: true,
        trim: true
    },
    slug: String,
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
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false
    }
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

//any time a change is made to a document, we can run a middleware function between issuing of a .save() event and actual saving of the document
//there are 4 types of middleware in mongoose: document, query, model, aggregate
//DOCUMENT MIDDLEWARE: runs before .save() and .create()
//save middleware do not run for insertmany. it works for only save and create
tourSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true })
    next()
})

// tourSchema.pre('save',function(next) {
//     console.log('Will save the doc...')
//     next()
// })

// tourSchema.post('save', function(doc, next) {
//     console.log(doc)
//     next()
// })
//QUERY MIDDLEWARE:
tourSchema.pre(/^find/, function(next) {
    this.find({secretTour: {$ne: true}})

    this.start = Date.now()
    next()
})    

tourSchema.post(/^find/, function(docs, next) {
    console.log(`Query took ${Date.now() - this.start} milliseconds!`)
    console.log(docs)
    next()
})


const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour;