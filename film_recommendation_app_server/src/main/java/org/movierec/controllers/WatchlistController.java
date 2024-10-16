package org.movierec.controllers;


import org.movierec.MovieRequestParam;
import org.movierec.entities.Movie;
import org.movierec.services.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
public class WatchlistController {

    @Autowired
    private WatchlistService watchlistService;


    @PostMapping("/saveFilmToWatchlist")
    public void saveMovie(@RequestBody MovieRequestParam payload){
        String userId = payload.getUserId();
        Movie movie = payload.getMovie();

        watchlistService.saveMovieToWatchlist(userId,movie);
    }

    @PostMapping("/deleteFilmFromWatchlist")
    public void deleteMovie(@RequestBody MovieRequestParam payload){
        String userId = payload.getUserId();
        Movie movie = payload.getMovie();

        watchlistService.deleteMovieFromWatchlist(userId,movie);
    }

    @PostMapping("/getAllFilmsFromWatchlist")
    public List<Movie> fetchAll(@RequestBody String userId){
        return watchlistService.getAllFilmsFromWatchlist(userId);
    }

    @PostMapping("/isInWatchlist")
    public boolean isMovieInWatchlist(@RequestBody MovieRequestParam payload){
        String userId = payload.getUserId();
        Movie movie = payload.getMovie();
        return watchlistService.isMovieInWatchlist(userId,movie);
    }

}
