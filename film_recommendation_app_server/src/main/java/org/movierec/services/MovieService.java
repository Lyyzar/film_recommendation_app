package org.movierec.services;

import org.json.JSONArray;
import org.json.JSONObject;
import org.movierec.GenreResponse;
import org.movierec.entities.Movie;
import org.movierec.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${tmdb.api.key}")
    private String apiKey;

    private HashMap<Integer, String> genreMap = new HashMap<>();


    public String searchForMovies(String keyword){
        String urlKeyword = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey +"&query=" + keyword;
        ResponseEntity<String> response = restTemplate.getForEntity(urlKeyword,String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            return response.getBody();
        }
        return "Fail";
    }


    public void fetchGenres() {
        String url = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + apiKey + "&language=en-US";
        ResponseEntity<GenreResponse> response = restTemplate.getForEntity(url, GenreResponse.class);

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            GenreResponse genreResponse = response.getBody();
            genreResponse.getGenres().forEach(genre -> genreMap.put(genre.getId(), genre.getName()));
        }

    }

    public ResponseEntity<List<Movie>> fetchAndSavePopularMovies() {
        String url = "https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        List<Movie> movieList = new ArrayList<>();

        if (response.getStatusCode() == HttpStatus.OK) {
            JSONObject jsonResponse = new JSONObject(response.getBody());
            JSONArray moviesArray = jsonResponse.getJSONArray("results");

            for (int i = 0; i < moviesArray.length(); i++) {
                JSONObject movieObject = moviesArray.getJSONObject(i);
                System.out.println(movieObject);
                Movie movie = new Movie();
                movie.setTitle(movieObject.getString("title"));
                movie.setOverview(movieObject.getString("overview"));
                movie.setReleaseDate(movieObject.getString("release_date"));
                movie.setRating(movieObject.getDouble("vote_average"));
                movie.setPosterUrl(movieObject.getString("poster_path"));

                fetchGenres();
                JSONArray genreIdsArray = movieObject.getJSONArray("genre_ids");
                StringBuilder movieGenres = new StringBuilder();
                for (int j = 0; j < genreIdsArray.length(); j++) {
                    if (j > 0) {
                        movieGenres.append(", ");
                    }
                    movieGenres.append(genreMap.get(genreIdsArray.getInt(j)));
                }

                movie.setGenre(movieGenres.toString());

                movieRepository.save(movie);
                movieList.add(movie);
            }
        }
        return ResponseEntity.ok(movieList);
    }
}
