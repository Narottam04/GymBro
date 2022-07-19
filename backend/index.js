const express = require('express')
const colors = require('colors')
const cors = require('cors')
const dotenv = require('dotenv').config()
const sequelize = require('./config/database')

const {errorHandler, notFound} = require('./middlewares/errorMiddleware')

const port = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.set('view engine', 'ejs');

// Create User
app.use('/api/users',require('./routes/userRoute'))
// Exercise api
app.use('/api/exercise',require('./routes/exerciseRoute'))
// yt recommend video api
app.use('/api/ytvideo/',require('./routes/ytVideoRoute'))

app.get('/', (req,res) => {
  res.send('server and database is running.')
})


// custom error handler 
app.use(notFound)
app.use(errorHandler)

sequelize.sync()
.then(result => {
  app.listen(port , () => console.log(`server started at port ${port}`.yellow.bold))
})
.catch(err => {
  console.log(err)
})


