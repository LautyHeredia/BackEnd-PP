const {Router} = require('express');
const userRoutes = require('../routes/userRoutes')
const moviesRoutes = require('../routes/moviesRoutes')

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/movies', moviesRoutes)

module.exports = routes;