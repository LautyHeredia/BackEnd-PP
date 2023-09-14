require('dotenv')
const USER_API = process.env.USER_API;
const Movies = require('../databaseModel/moviesModel/moviesModel')
const movieController = require('../Controllers/movieControllers')
const totalPages = 100;
const functionMiddleware = require('../middlewareAuth/middlewareAuth')

const changedMovies = async (req, res) => {
    const {Email, Password} = req.query;

    try{
      if((Email && Password)!==undefined && (Email && Password)!==null && (Email && Password)!==''){
        let isAuthenticated = await functionMiddleware({userAuthEmail: Email, userAuthPassword: Password})
        if(isAuthenticated){
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
        }else{
          res.status(401).json(`No tiene acceso aqui, lo sentimos`)
        }
      }else{
        res.status(403).json(`Debe ingresar el Email y Password mod para authenticar el acceso`)
      }
     }catch(err){    
        res.status(500).json(err)
     }
}

const deleteMovieInDb = async (req, res) => {
    const {id} = req.body;
    const {Email, Password} = req.query

    if((id && Email && Password)!== undefined && (id && Email && Password)!==null && (id && Email && Password)!=='') {
        try {
          let isAuthenticated = await functionMiddleware({userAuthEmail: Email, userAuthPassword: Password})
          if(isAuthenticated){
            const response = await movieController.deleteMovieInDbController({id: id})
            res.status(200).json(response)   
          }else{
            res.status(401).json(`No tiene acceso aqui, lo sentimos`)
          }
        }catch(err){
          res.status(500).json(err)      
        }
    }else{
        res.status(403).json(`No has ingresado ningun nombre de Pelicula a eliminar o Email y Password para authenticar el acceso`)
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
        res.status(500).json(err)
    }
}

module.exports = {
    changedMovies,
    deleteMovieInDb,
    searchMovie
};