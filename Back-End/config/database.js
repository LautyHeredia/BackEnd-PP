const mongoose = require('mongoose')

const {
    DB_URL,
    DB_CONNECTION,
    DB_HOST,
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD
} = require('./variable.env');

const url = `${DB_CONNECTION}+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}?retryWrites=true&w=majority`;
const connect = mongoose.connect(url || DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
})
.then(() => {
  console.log('Connected to the database succesfully')  
})
.catch((err) => console.log(err))

const disconnectBD = () => {
    mongoose.connection.close();
}

module.exports = {
    connect,
    disconnectBD
}