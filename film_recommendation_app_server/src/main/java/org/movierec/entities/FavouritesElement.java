package org.movierec.entities;

import jakarta.persistence.*;

@Entity
public class FavouritesElement {
    @Id
    @GeneratedValue
    private Long id;
    @Column(name = "user_id")
    private String userId;


    @ManyToOne(fetch = FetchType.EAGER)
    private Movie movie;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }



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
