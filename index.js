const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')

const mongoDB = mongoose
  .connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB Connection Successful!'))
  .catch(err => {
    console.log(err)
  })

app.use(cors())
app.use(express.json())

app.use('/users', userRoute)
app.use('/products', productRoute)

app.get('/', (req, res) => {
  res.send('Hello to Bk-parfumes API')
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`)
})

module.exports = mongoDB
