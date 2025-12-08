package com.dmu.find_u.service;

import com.dmu.find_u.entity.Dept;
import com.dmu.find_u.entity.UserInfo;
import com.dmu.find_u.repository.DeptRepository;
import com.dmu.find_u.repository.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserInfoRepository userInfoRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final DeptRepository deptRepository;

    public UserInfo register(String uid, String rawPassword, String name, String phone) {
        // 중복 체크
        if (userInfoRepository.findByUid(uid).isPresent()) {
            throw new RuntimeException("이미 존재하는 아이디입니다.");
        }

        UserInfo user = new UserInfo();
        user.setUid(uid);
        user.setName(name);
        user.setPhone(phone);
        user.setPassword(passwordEncoder.encode(rawPassword));

        // 학과 기본값 없으면 null 처리
        user.setDept(null);

        return userInfoRepository.save(user);
    }

    // 로그인
    public boolean login(String uid, String rawPassword) {
        Optional<UserInfo> userOpt = userInfoRepository.findByUid(uid);
        if (userOpt.isPresent()) {
            UserInfo user = userOpt.get();
            return passwordEncoder.matches(rawPassword, user.getPassword());
        }
        return false;
    }
    // 유저 아이디 반환
    public UserInfo findByUid(String uid) {
        return userInfoRepository.findByUid(uid).orElse(null);
    }

    public Dept findDeptByName(String deptName) {
        if(deptName == null || deptName.isEmpty()) return null;
        return deptRepository.findByName(deptName).orElse(null);
    }

    public void updatePassword(String uid, String newPassword) {
        UserInfo user = userInfoRepository.findByUid(uid).orElseThrow(
                () -> new RuntimeException("사용자 없음"));
        user.setPassword(passwordEncoder.encode(newPassword));
        userInfoRepository.save(user);
    }

    public void deleteUser(Long id) {
        userInfoRepository.deleteById(id);
    }


}