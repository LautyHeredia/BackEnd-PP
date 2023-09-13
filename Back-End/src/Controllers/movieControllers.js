const Movies = require('../databaseModel/moviesModel/moviesModel')

const deleteMovieInDbController = async ({id}) => {
    const movieLookTrueOrFalse = await Movies.findById({_id: id})

    if(movieLookTrueOrFalse !== null){
      await Movies.findByIdAndDelete({_id: id})
      return `La pelicula con id: ${id}, se ah eliminado con èxito de la base de datos`   
    }else{
      return `La pelicula con el id: ${id}, no existe en la DB`  
    }
}

module.exports = {
    deleteMovieInDbController
}