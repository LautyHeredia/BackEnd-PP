const ModelMod = require('../databaseModel/MyModelMOD/myModelMod')

const createModDB = async ({Email, Password, UserName}) => {
  const exists = await ModelMod.findOne({email: Email, password: Password, userName: UserName}) 
    try{
      if(!exists){
        const result = await ModelMod.create({
            email: Email,
            password: Password,
            userName: UserName
        })
        await result.save()
        return result;
      }else{
        return `Ya existe el usuario con email: ${Email}`
      }
   }catch(err){
    res.status(500).json({error: err.message})
   } 
}

const deleteModController = async ({emaill}) => {
    let isExists = await ModelMod.findOne({email: emaill})

    if(isExists!==null){
        let id = isExists._id;
        await ModelMod.findByIdAndDelete({_id: id})
        return `Usuario con id: ${id} y email: ${emaill}, eliminado con éxito`
    }else{
       return `No se ah encontrado el usuario a eliminar con email: ${emaill}` 
    }
}

const putControllerMod = async ({emaill, passwordd, UserName}) => {
  let isExists = await ModelMod.findOne({email: emaill})

  if(isExists!==null){ 
    if(passwordd!==undefined && passwordd!==null && passwordd!==''){
      isExists.password = passwordd;
    }

    if(UserName!==undefined && UserName!==null && UserName!==''){
      isExists.userName = UserName;
    }

    await isExists.save()
    return `El mod con email: ${emaill}, ah sido actualizado con éxito`
  }else{
    return `No se ah encontrado el usuario a modificar con email: ${emaill}`
  }
}

module.exports = {
   createModDB,
   deleteModController,
   putControllerMod
}