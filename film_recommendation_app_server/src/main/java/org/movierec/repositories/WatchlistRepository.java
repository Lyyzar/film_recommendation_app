package org.movierec.repositories;

import jakarta.transaction.Transactional;
import org.movierec.entities.WatchlistElement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WatchlistRepository extends JpaRepository<WatchlistElement,Long> {
    List<WatchlistElement> findByUserId(String userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM WatchlistElement w WHERE w.movie.title = :title AND w.movie.releaseDate = :releaseDate AND w.userId = :userId")
    void deleteByTitleAndGenreAndUserId(String title, String releaseDate, String userId);


}
