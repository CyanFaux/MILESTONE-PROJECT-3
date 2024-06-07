require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`)
})