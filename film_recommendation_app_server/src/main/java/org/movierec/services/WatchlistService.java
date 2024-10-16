package org.movierec.services;

import org.movierec.entities.Movie;
import org.movierec.entities.WatchlistElement;
import org.movierec.repositories.WatchlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class WatchlistService {

    @Autowired
    private WatchlistRepository watchlistRepository;


    public void saveMovieToWatchlist(String userId,Movie movie){
        WatchlistElement watchlistElement = new WatchlistElement();
        watchlistElement.setUserId(userId);
        watchlistElement.setMovie(movie);
        watchlistRepository.save(watchlistElement);
    }

    public void deleteMovieFromWatchlist(String userId, Movie movie){
        watchlistRepository.deleteByTitleAndGenreAndUserId(movie.getTitle(),movie.getReleaseDate(),userId);
    }

    public List<Movie> getAllFilmsFromWatchlist(String userId){
        String newUserId = userId.substring(0, userId.length() - 1); //= gets added after sending from frontend

        List<WatchlistElement> watchlistElements = watchlistRepository.findByUserId(newUserId);
        return watchlistElements.stream()
                .map(WatchlistElement::getMovie)
                .collect(Collectors.toList());
    }

    public boolean isMovieInWatchlist(String userId,Movie movie){
        List<WatchlistElement> watchlistElements = watchlistRepository.findByUserId(userId);
        List<Movie> movies = watchlistElements.stream()
                .map(WatchlistElement::getMovie)
                .toList();
        return movies.stream().anyMatch(movie1 -> movie.getTitle().equals(movie1.getTitle()) && movie.getReleaseDate().equals(movie1.getReleaseDate()));



    }
}
