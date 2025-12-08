package com.dmu.find_u.repository;

import com.dmu.find_u.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    Optional<UserInfo> findByUid(String uid); // 변경: findByUsername → findByUid

}
