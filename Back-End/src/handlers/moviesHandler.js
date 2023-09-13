require('dotenv')
const USER_API = process.env.USER_API;
const Movies = require('../databaseModel/moviesModel/moviesModel')
const movieController = require('../Controllers/movieControllers')
const totalPages = 100;

const changedMovies = async (req, res) => {
    
    try{
        let newArray = []
         for(let i=1; i<=totalPages; i++){
           const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${USER_API}`)
               if(!response.ok){
                throw new Error(`Ha ocurrido un error en la peticion HTTPS`)
               }
  
               const data = await response.json()
               const moviesInPage = data.results;
               newArray.push(...moviesInPage)
            }
             await Movies.create({moviesDb: newArray})
          res.status(200).json(`Base de datos cargada`);
     }catch(err){    
        res.status(500).json(err)
     }
}

const deleteMovieInDb = async (req, res) => {
    const {id} = req.body;

    if(id !== undefined || id !== '') {
        try {
          const response = await movieController.deleteMovieInDbController({id: id})
          res.status(200).json(response)   
        }catch(err){
          throw new Error(err)      
        }
    }else{
        throw new Error(`No has ingresado ningun nombre de Pelicula a eliminar`)
    }
}

const searchMovie = async ({search}) => {
    try {
        const regex = new RegExp(search, 'i');
         let res = await Movies.find({'moviesDb.title': {$regex: regex}}).exec();
         const matchingMovies = res.reduce((accumulator, document) => {
            const matchingMoviesInDocument = document.moviesDb.filter(movie => regex.test(movie.title));
            if (matchingMoviesInDocument.length > 0) 
            {
              accumulator.push(...matchingMoviesInDocument);
            }
            return accumulator;
          }, []);
      
          return matchingMovies;
    }catch(err){
        throw new Error(err)
    }
}

module.exports = {
    changedMovies,
    deleteMovieInDb,
    searchMovie
};