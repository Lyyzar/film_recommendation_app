package org.movierec.controllers;

import org.movierec.MovieRequestParam;
import org.movierec.entities.Movie;
import org.movierec.services.FavouritesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FavouritesController {

    @Autowired
    private FavouritesService favouritesService;


    @PostMapping("/saveFilmToFavourites")
    public void saveMovie(@RequestBody MovieRequestParam payload){
        String userId = payload.getUserId();
        Movie movie = payload.getMovie();
        favouritesService.saveMovieToFavourites(userId,movie);
    }

    @PostMapping("/deleteMovieFromFavourites")
    public void deleteMovie(@RequestBody MovieRequestParam payload){
        String userId = payload.getUserId();
        Movie movie = payload.getMovie();
        favouritesService.deleteMovieFromFavourites(userId, movie);
    }

    @PostMapping("/getAllFilmsFromFavourites")
    public List<Movie> fetchAll(@RequestBody String userId){
        return favouritesService.getAllFilmsFromFavourites(userId);
    }

    @PostMapping("/isInFavourites")
    public boolean isMovieInFavourites(@RequestBody MovieRequestParam payload){
        String userId = payload.getUserId();
        Movie movie = payload.getMovie();

        return favouritesService.isMovieInFavourites(userId,movie);
    }
}
