const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')


require('dotenv/config')
require('./config/db')
// Middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// Routes
app.use('/api/users', authRoute)
app.use('/api/posts', postRoute)

app.listen(process.env.PORT, () => {
    console.log(`Server Running at http://localhost:${process.env.PORT}`)
})