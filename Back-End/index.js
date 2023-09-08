require('dotenv').config()
const server = require('./config/app')
require('./config/database')
const port = process.env.APP_PORT;

server.listen(port, () => {
    console.log(`Your application is running in the port: ${port}`)
})
