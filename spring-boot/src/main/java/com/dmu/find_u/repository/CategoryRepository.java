package com.dmu.find_u.repository;

import com.dmu.find_u.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findById(Long id);

    List<Category>  findAllByOrderByIdAsc();
}

