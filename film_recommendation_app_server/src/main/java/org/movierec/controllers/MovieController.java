package org.movierec.controllers;

import org.movierec.entities.Movie;
import org.movierec.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/fetch-movies")
    public ResponseEntity<List<Movie>> fetchMovies(){
        System.out.println("Popular movies fetched!");
        return movieService.fetchAndSavePopularMovies();
    }

    @GetMapping("/search")
    public String searchMovies(@RequestParam("keyword") String keyword){
        return movieService.searchForMovies(keyword);
    }
}
