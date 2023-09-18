const userController = require('../Controllers/userControllers');
const functionMiddleware = require('../middlewareAuth/middlewareAuth');

const createUser = async (req, res) => {
    const {Emaill, Passwordd} = req.query;
    const {
        username, 
        favmovies, 
        Password,
        Country,
        Email,
        City,
        numberphone,
        Description 
    } = req.body;

    if((username && favmovies && Password)!==null && (username && favmovies && Password)!==undefined && (username && favmovies && Password)!=='' 
    || (Country || City || numberphone || Description)!==null && (Country || City || numberphone || Description)!==undefined && (Country || City || numberphone || Description)!==''){
        try{
          let isAuthenticated = await functionMiddleware({userAuthEmail: Emaill, userAuthPassword: Passwordd})
          if(isAuthenticated){
            const result = await userController.newUsers({username: username, Email: Email, favmovies: favmovies, Password: Password, Country: Country, City: City, numberphone: numberphone, Description: Description})
            res.status(200).json(result)  
          }else{
            res.status(401).json(`No tiene acceso aqui, lo sentimos`)
          }  
        }catch(err){
            res.status(500).json({error: err.message})
        }
    }else{
        res.status(403).json(`Falta ingresar datos requeridos obligatoriamente`)
    }
}

const putUser = async (req, res) => {
    const {Emaill, Passwordd} = req.query;
    const {username, favmovies, Email, Password, Status, Country, City, numberPhone, Description} = req.body;

    if((username || Email || favmovies || Password || Status || Country || City || numberPhone || Description)!==null && 
    (username || Email || favmovies || Password || Status || Country || City || numberPhone || Description)!==undefined && 
    (username || Email || favmovies || Password || Status || Country || City || numberPhone || Description)!=='') {
        try{
           let isAuthenticated = await functionMiddleware({userAuthEmail: Emaill, userAuthPassword: Passwordd})
           if(isAuthenticated){
             const result = await userController.putUserController({username: username, Email: Email, favmovies: favmovies, Password: Password, Status: Status, Country: Country, City: City, numberPhone: numberPhone, Description: Description})
             res.status(200).json(result) 
           }else{
             res.status(401).json(`No tiene acceso aqui, lo sentimos`)
           } 
        }catch(err){
            res.status(500).json({error: err.message})
        }
    }else{
        res.sttatus(402).json(`Debe ingresar al menos un campo para poder modificar el Usuario`)
    }
}

const deleteUser = async (req, res) => {
  const {username} = req.body;
  const {Email, Password} = req.query;  

  if(username!==null && username!==undefined && username!==''){
    try{
      let isAuthenticated = await functionMiddleware({userAuthEmail: Email, userAuthPassword: Password})
        if(isAuthenticated){
          const result = await userController.deleteUserByUsername({username})
          res.status(200).json(result)
        }else{
          res.status(401).json(`No tiene acceso aqui, lo sentimos`)  
        }
    }catch(err){
        res.status(500).json({error: err.message})
    }
  }else{
    res.status(402).json(`Debe ingresar el id correcto del user a eliminar`)
  }
}

module.exports = {
    createUser,
    putUser,
    deleteUser
};