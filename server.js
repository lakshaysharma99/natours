const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const app = require('./app')

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => {
    console.log('DB connection successful')
})

// console.log(process.env)

const port = 3000 || process.env.PORT
console.log(process.env.PORT)
app.listen(port, () => {
    console.log('App running on port 3000')
})
