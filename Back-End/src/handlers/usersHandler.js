const userController = require('../Controllers/userControllers')

const createUser = async (req, res) => {
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

    if(username !== null && favmovies!==null && Password!==null || Country!==null || City!==null || numberphone!==null || Description!==null){
        try{
          const result = await userController.newUsers({username: username, Email: Email, favmovies: favmovies, Password: Password, Country: Country, City: City, numberphone: numberphone, Description: Description})
          res.status(200).json(result)  
        }catch(err){
            console.log(err)
        }
    }else{
        throw new Error(`Falta ingresar datos requeridos obligatoriamente`)
    }
}

const putUser = async (req, res) => {
    const {username, favmovies, Email, Password, Status, Country, City, numberPhone, Description} = req.body;

    if(username!== null || Email!==null || favmovies!==null || Password!==null || Status!==null || Country!==null || City!==null || numberPhone!==null || Description!==null) {
        try{
           const result = await userController.putUserController({username: username, Email: Email, favmovies: favmovies, Password: Password, Status: Status, Country: Country, City: City, numberPhone: numberPhone, Description: Description})
           res.status(200).json(result) 
        }catch(err){
            console.log(err)
        }
    }else{
        throw new Error(`Debe ingresar al menos un campo para poder modificar el Usuario`)
    }
}

const deleteUser = async (req, res) => {
  const {username} = req.body;
  
  if(username!==null){
    const result = await userController.deleteUserByUsername({username})
    res.status(200).json(result)
  }else{
    throw new Error(`Debe ingresar el id correcto del user a eliminar`)
  }
}

module.exports = {
    createUser,
    putUser,
    deleteUser
};