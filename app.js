const express = require('express')
const morgan = require('morgan')
const app = express()
const userRouter = require('./routes/userRoutes')
const tourRouter = require('./routes/tourRoutes')

//-------------------------------------------//
// 1) Middleware

console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(express.json())
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
    console.log('Hello from the middleware')
    next();
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})


// mounting the route. we have to mount after the route definitions
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = app