const User = require('../databaseModel/UsersModel/User')

const newUsers = async ({username, favmovies, Password, Email, Country, City, numberphone, Description}) => {
   let user = await User.findOne({userName: username, email: Email}) 
    if(user){
      return `Ya existe el usuario con el nombre: ${username}`
    }else{
       const newUser = new User({
        userName: username,
        favoritesMovies: favmovies,
        password: Password,
        email: Email,
        status: true,
        country: Country,
        city: City,
        numberOfPhone: numberphone,
        description: Description
       })
       
       await newUser.save()
       return newUser;
    }
}

const putUserController = async ({username, favmovies, Email, Password, Status, Country, City, numberPhone, Description}) => {
   let resultUser = await User.findOne({userName: username , email: Email})

   if(resultUser!==null){   
       if (Password !== undefined && Password !== null) {
         resultUser.password = Password;
       }
       if(Email !== undefined && Email !== null){
         resultUser.email = Email;
       }

       if (favmovies !== undefined && favmovies !== null) {
         resultUser.favoritesMovies = favmovies;
       }
       if (Status !== undefined && Status !== null) {
         resultUser.status = Status;
       }
       if (Country !== undefined && Country !== null) {
         resultUser.country = Country;
       }
       if (City !== undefined && City !== null) {
         resultUser.city = City;
       }
       if (numberPhone !== undefined && numberPhone !== null) {
         resultUser.numberOfPhone = numberPhone;
       }
       if (Description !== undefined && Description !== null) {
         resultUser.description = Description;
       }

    const result = await resultUser.save()
    return result;
   }else{   
    return `No se ah encontrado el usuario con el nombre: ${username}`
   }
}

const deleteUserByUsername= async ({username}) => {
   let userExists = await User.findOne({userName: username}) 

   if(userExists !== null){
    userExists.status = false;
    
    await userExists.save()
    return `Se ah eliminado con exito el userName: ${username}`
   }else{
    return `No se ah encontrado el usuario con ese userName`
   }
}

module.exports = {
    newUsers,
    putUserController,
    deleteUserByUsername
}