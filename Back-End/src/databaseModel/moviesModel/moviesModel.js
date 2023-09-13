const {Schema, model} = require('mongoose')

const Movies = new Schema (
    {
        _id: {type: Schema.Types.ObjectId, auto: true},
        moviesDb: []
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = model('Movies', Movies)