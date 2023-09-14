const User = require('../databaseModel/UsersModel/User')

const functionMiddlewareUsers = async ({userAuthEmail, userAuthPassword}) => {
   if((userAuthEmail && userAuthPassword)!==undefined && (userAuthEmail && userAuthPassword)!==null
   && (userAuthEmail && userAuthPassword)!==''){
    
    let res = await User.findOne({email: userAuthEmail, password: userAuthPassword})
    if(res!==undefined && res!==null && res!==''){
      // User Authenticated: true   
      return true;  
    }else{
      // User Authenticated: false  
      return false;
    }
   }else{
      // User Authenticated: false
      return false;
   }
}

module.exports = functionMiddlewareUsers;