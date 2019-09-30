const express = require('express')
require('./db/mongoose')
const uploadRouter = require('./routers/upload')
const statusRouter = require('./routers/status')
const miscRouter = require('./routers/misc')

// Setup

const port = process.env.PORT || 3000
const app = express()


app.use(express.static('public'))
app.use(express.json())

// Routes

app.use(uploadRouter)
app.use(miscRouter)
app.use(statusRouter)


app.listen(port, () => {
    console.log(`Server running on port ${port}!`)
})