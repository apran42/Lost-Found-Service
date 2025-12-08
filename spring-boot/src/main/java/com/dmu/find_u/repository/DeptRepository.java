package com.dmu.find_u.repository;

import com.dmu.find_u.entity.Dept;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DeptRepository extends JpaRepository<Dept, Integer> {
    Optional<Dept> findByName(String name);
}
