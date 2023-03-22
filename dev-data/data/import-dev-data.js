const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const Tour = require('./../../models/tourModel')

dotenv.config({path: './../../config.env'})

console.log(process.env.DATABASE)

mongoose.connect('mongodb+srv://lakshay:0987654321@cluster0.qsqqlmc.mongodb.net/natours', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => {
    console.log('DB connection successful')
})

//read json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'))

//Import data to the database
const importData = async () => {
    try {
        await Tour.create(tours)
        console.log('Data successfully loaded')
        process.exit()
    } catch(err) {
        console.log(err)
    }
}

//delete all data from the database
const deleteData = async () => {
    try {
        await Tour.deleteMany()
        console.log('Data deleted successfully!')
        process.exit()
    } catch(err) {
        console.log(err)
    }
}

if(process.argv[2] === '--import'){
    importData()
} else if(process.argv[2] === '--delete'){
    deleteData()
}
