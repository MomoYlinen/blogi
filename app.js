const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogRoute = require('./controllers/blogRoute')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
      logger.info('connected to MongoDB')
  })

  app.use(cors())
  app.use(express())
  app.use(express.json())
  app.use(middleware.requestLogger)
  
  app.use('/api/blogs', blogRoute)
  app.use('/api/users',usersRouter)
  app.use('/api/login',loginRouter)
  
  app.use(middleware.unknownEndpoint)
  app.use(middleware.errorHandler)
  
  module.exports = app