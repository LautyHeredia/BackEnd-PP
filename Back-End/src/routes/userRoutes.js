const {Router} = require('express')
const User = require('../databaseModel/UsersModel/User')
const handlerUsers = require('../handlers/usersHandler')
const functionMiddleware = require('../middlewareAuth/middlewareAuth')

const routes = Router()

routes.get('/', async (req, res) => {
    let {Email, Password, search} = req.query;
    let isAuthenticated = await functionMiddleware({userAuthEmail: Email, userAuthPassword: Password})
    
    try {  
       if(!isAuthenticated){
        res.status(401).json(`No tienes acceso aqui, solo los mods`)
       } 
       
       if(search!== undefined && search!==null && search !== ''){
            const result = await User.findOne({userName: { $regex: new RegExp(`^${search}$`, 'i')}})
            res.status(200).json(result)
       }else{
            const userAll = await User.find({})
            res.status(200).json(userAll)
       } 
    }catch(err){
        res.status(500).json(err)
    }
})

routes.post('/createUser', handlerUsers.createUser)
routes.put('/putUser', handlerUsers.putUser)
routes.delete('/deleteUsers', handlerUsers.deleteUser)

module.exports = routes;