const {Router} = require('express');
const userRoutes = require('../routes/userRoutes')
const moviesRoutes = require('../routes/moviesRoutes')
const modRoutes = require('./modRoutes')

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/movies', moviesRoutes)
routes.use('/mod', modRoutes)

module.exports = routes;