const {Schema, model} = require('mongoose')

const ModModel = new Schema (
    {
      _id: {type: Schema.Types.ObjectId, auto: true},
      email: {type: String, required: true, uniquee: true},
      password: {type: String, required: true},
      userName: {type: String, required: false, uniquee: true}  
    },{
        timestamps: true,
        versionKey: false
    }
)

module.exports = model('ModModel', ModModel);