const {Router} = require('express')
const userRoutes = require('../routes/userRoutes')

const routes = Router()
routes.use('/users', userRoutes)

module.exports = routes;