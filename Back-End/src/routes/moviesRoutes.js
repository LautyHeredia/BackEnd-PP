const {Router} = require('express')
const Movies = require('../databaseModel/moviesModel/moviesModel')
const refreshMoviesHandler = require('../handlers/moviesHandler')
const searchMoviesHandler = require('../handlers/moviesHandler')

const movieRoutes = Router()

movieRoutes.get('/', async (req, res) => {
 const {search} = req.query;

 try{
    if(search !== undefined && search !== ''){
        const result = await searchMoviesHandler.searchMovie({search: search})
        res.status(200).json(result)
    }else{
        const moviesAll = await Movies.find({})
        res.status(200).json(moviesAll)
    }
 }catch(err){
    res.status(500).json({error: err.message})
 }
})


movieRoutes.post('/refreshDbMovies', refreshMoviesHandler.changedMovies)
movieRoutes.delete('/deleteMoviesDb', refreshMoviesHandler.deleteMovieInDb)

module.exports = movieRoutes;