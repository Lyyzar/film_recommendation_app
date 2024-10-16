package org.movierec;

import org.movierec.entities.Movie;

public class MovieRequestParam {
    private String userId;
    private Movie movie;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }
}
