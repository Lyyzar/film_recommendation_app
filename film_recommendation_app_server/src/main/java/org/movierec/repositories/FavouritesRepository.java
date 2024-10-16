package org.movierec.repositories;

import jakarta.transaction.Transactional;
import org.movierec.entities.FavouritesElement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavouritesRepository extends JpaRepository<FavouritesElement,Long> {
    List<FavouritesElement> findByUserId(String userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM FavouritesElement f WHERE f.movie.title = :title AND f.movie.releaseDate = :releaseDate AND f.userId = :userId")
    void deleteByTitleAndGenreAndUserId(String title, String releaseDate, String userId);
}
