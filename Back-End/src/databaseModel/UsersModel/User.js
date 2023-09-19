const {Schema, model} = require('mongoose')

const User = new Schema (
    {
        _id: { type: Schema.Types.ObjectId, auto: true },
        userName: { type: String, required: true, uniquee: true},
        favoritesMovies: [
           {
               type: String, 
               required: false, 
           } 
        ],
        password: {
            type: String,
            required: true,
        },
        email: {type: String, uniquee: true, required: true},
        status: {type: Boolean, default: false, required: false},
        country: {type: String, required: false},
        city: {type: String, required: false},
        numberOfPhone: {type: String, required: false},
        description: {type: String, required: false},        
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = model('User', User);