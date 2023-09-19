require('dotenv')
const functionMiddleware = require('../middlewareAuth/middlewareAuth')
const ModelMod = require('../databaseModel/MyModelMOD/myModelMod')
const modController = require('../Controllers/modController')
const USER_MOD = process.env.USER_MOD;

const getMod = async (req, res) => {
  const {Email, Password} = req.query;
  
  if(Email !== undefined && Email!==null && Email!==''
   && Password!==undefined && Password!==null && Password!==''){
    const isAuthenticated = await functionMiddleware({userAuthEmail: Email, userAuthPassword: Password})
    if(isAuthenticated){
        const result = await ModelMod.find({})
        res.status(200).json(result)
    }else{
        res.status(401).json(`Usted no tiene acceso aquí, lo sentimos`)
    }
  }else{
    res.status(401).json(`Debe ingresar Email y password para authenticar y poder utilizar esta ruta`)
  }
}

const createMod = async ( req, res ) => {
  const {emaill, passwordd} = req.query;  
  const {Email, Password, UserName} = req.body;
  
  if((Email && Password && emaill && passwordd || UserName)!==undefined && (Email && Password && emaill && passwordd || UserName)!==null && (Email && Password  && emaill && passwordd || UserName)!==''){
    const isAuthenticated = await functionMiddleware({userAuthEmail: emaill, userAuthPassword: passwordd})
    if(isAuthenticated){
        const result = await modController.createModDB({Email: Email, Password: Password, UserName: UserName})
        res.status(200).json(result)
    }else{
        res.status(401).json(`No tiene acceso aquí, lo sentimos`)
    }
  }else{
    res.status(500).json(`Debe ingresar Email y Password para authenticar (query) y a su ves Email, Password y  Username (body) para crear`)
  }
}

const deleteMod = async (req, res) => {
  const {Email, Password} = req.query;
  const {emaill} = req.body;  
  
  try{
    if((Email && Password && emaill)!==undefined && (Email && Password && emaill)!==null && (Email && Password  && emaill )!==''){
     let isAuthenticated = await functionMiddleware({userAuthEmail: Email, userAuthPassword: Password})
      if(isAuthenticated && emaill!==USER_MOD){
        let result = await modController.deleteModController({emaill: emaill})
        res.status(200).json(result)
      }else{
        res.status(401).json(`No tiene acceso aquí o no se puede eliminar el email del moderador, lo sentimos`)
      }
    }else{
      res.status(500).json(`Debe ingresar Email y Password para authenticar (query) y a su ves Email (body) a eliminar`)
    }
  }catch(err){
    res.status(500).json({error: err.message})
  }
}

const putModHandler = async (req, res) => {
  const {Email, Password} = req.query;
  const {emaill, passwordd, UserName} = req.body;

  try{
   if((Email && Password && emaill && passwordd || UserName)!==undefined && (Email && Password && emaill && passwordd || UserName)!==null && (Email && Password  && emaill && passwordd || UserName)!==''){
     let isAuthenticated = await functionMiddleware({userAuthEmail: Email, userAuthPassword: Password})
     if(isAuthenticated && emaill!==USER_MOD){
       let result = await modController.putControllerMod({emaill: emaill, passwordd: passwordd, UserName: UserName})
       res.status(200).json(result)
     }else{
       res.status(401).json(`Usted no tiene permisos aquí, solo el superAdmin tiene acceso`)
     }
   }else{
    res.status(500).json(`Debe ingresar Email y Password para authenticar (query) y a su ves Email, Password y UserName (body) para modificar`)
  }
  }catch(err){
    res.status(500).json({error: err.message})
  }
}

module.exports = {
    getMod,
    createMod,
    deleteMod,
    putModHandler
}

