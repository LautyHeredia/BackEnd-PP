const {Router} = require('express')
const User = require('../databaseModel/UsersModel/User')
const handlerUsers = require('../handlers/usersHandler')

const routes = Router()

routes.get('/', async (req, res) => {
    let {search} = req.query;

    try {
       if(search !== undefined && search !== ''){
        const result = await User.findOne({userName: { $regex: new RegExp(`^${search}$`, 'i')}})
        res.status(200).json(result)
       }else{
        const userAll = await User.find({})
        res.status(200).json(userAll)
       } 
    }catch(err){
        throw new Error(err)
    }
})

routes.post('/createUser', handlerUsers.createUser)
routes.put('/putUser', handlerUsers.putUser)
routes.delete('/deleteUsers', handlerUsers.deleteUser)

module.exports = routes;