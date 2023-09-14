const ModelMod = require('../databaseModel/MyModelMOD/myModelMod')

const functionMiddleware = async ({userAuthEmail, userAuthPassword}) => {
  if(userAuthEmail !== undefined && userAuthEmail!==null && userAuthEmail!=='' && 
  userAuthPassword !== undefined && userAuthPassword!==null && userAuthPassword!==''){
 
   let res = await ModelMod.findOne({email: userAuthEmail, password: userAuthPassword}) 
    if(res !== null){
     //User Authenticate : true   
      return true;  
    }else{
     //User Authenticate: false   
       return false; 
    }
  }else{
    //User Authenticate: false
    return false;
  }
}

module.exports = functionMiddleware;