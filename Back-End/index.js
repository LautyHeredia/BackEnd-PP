require('dotenv').config()
const server = require('./config/app')
require('./config/database')
const port = process.env.APP_PORT || 3000;

server.listen(port, () => {
    console.log(`Your application is running in the port: 3000`)
})
