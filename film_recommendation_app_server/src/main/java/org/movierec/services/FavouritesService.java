package org.movierec.services;

import org.movierec.entities.FavouritesElement;
import org.movierec.entities.Movie;
import org.movierec.repositories.FavouritesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class FavouritesService {

    @Autowired
    private FavouritesRepository favouritesRepository;

    public void saveMovieToFavourites(String userId, Movie movie) {
        FavouritesElement favouritesElement = new FavouritesElement();
        favouritesElement.setUserId(userId);
        favouritesElement.setMovie(movie);
        System.out.println(movie.getTitle() + userId);
        favouritesRepository.save(favouritesElement);
    }

    public void deleteMovieFromFavourites(String userId, Movie movie){
        favouritesRepository.deleteByTitleAndGenreAndUserId(movie.getTitle(), movie.getReleaseDate(),userId);
    }

    public List<Movie> getAllFilmsFromFavourites(String userId){
        String newUserId = userId.substring(0, userId.length() - 1); //= gets added after sending from frontend
        List<FavouritesElement> favouritesElementList = favouritesRepository.findByUserId(newUserId);
        return favouritesElementList.stream().map(FavouritesElement::getMovie).collect(Collectors.toList());
    }

    public boolean isMovieInFavourites(String userId, Movie movie){
        List<FavouritesElement> favouritesElementList = favouritesRepository.findByUserId(userId);
        List<Movie> movies = favouritesElementList.stream().map(FavouritesElement::getMovie).toList();

        return movies.stream().anyMatch(movie1 -> movie.getTitle().equals(movie1.getTitle()) && movie.getReleaseDate().equals(movie1.getReleaseDate()));
    }
}
