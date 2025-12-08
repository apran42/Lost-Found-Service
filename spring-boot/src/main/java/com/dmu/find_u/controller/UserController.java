package com.dmu.find_u.controller;

import com.dmu.find_u.entity.Dept;
import com.dmu.find_u.entity.LostFoundPost;
import com.dmu.find_u.entity.UserInfo;
import com.dmu.find_u.repository.DeptRepository;
import com.dmu.find_u.repository.PostLikeRepository;
import com.dmu.find_u.repository.UserInfoRepository;
import com.dmu.find_u.service.LostFoundPostService;
import com.dmu.find_u.service.Ranking;
import com.dmu.find_u.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // React 포트
public class UserController {

    private final UserService userService;
    private final UserInfoRepository userInfoRepository;
    private final DeptRepository deptRepository;
    private final LostFoundPostService lostFoundPostService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final PostLikeRepository postLikeRepository;
    private final Ranking ranking;

    // 로그인 API (React에서 POST JSON 요청)
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginData, HttpSession session) {
        String uid = loginData.get("uid");
        String password = loginData.get("password");

        Map<String, Object> response = new HashMap<>();

        if (uid == null || password == null) {
            response.put("success", false);
            response.put("message", "아이디 또는 비밀번호를 입력해주세요.");
            return ResponseEntity.badRequest().body(response);
        }

        boolean success = userService.login(uid, password);

        if (!success) {
            response.put("success", false);
            response.put("message", "아이디 또는 비밀번호가 잘못되었습니다");
            return ResponseEntity.badRequest().body(response);
        }

        UserInfo user = userService.findByUid(uid);
        session.setAttribute("login", user);

        response.put("success", true);
        response.put("message", "로그인 성공");
        response.put("name",user.getName());
        return ResponseEntity.ok(response);
    }

    // 회원가입 API
    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody Map<String, String> signupData) {

        String name = signupData.get("name");
        String uid = signupData.get("uid");
        String password = signupData.get("password");
        String phone = signupData.get("phone");

        Map<String, Object> response = new HashMap<>();

        // register() 호출 (암호화 처리됨)
        UserInfo savedUser = userService.register(uid, password, name, phone);

        response.put("success", true);
        response.put("message", "회원가입이 완료되었습니다.");

        return ResponseEntity.ok(response);
    }

    // 로그인된 상태인지 확인
    @GetMapping("/check")
    public ResponseEntity<Map<String, Object>> checkLogin(HttpSession session) {
        Map<String, Object> response = new HashMap<>();

        UserInfo user = (UserInfo) session.getAttribute("login");

        if (user == null) {
            response.put("success", false);
            return ResponseEntity.ok(response);
        }

        response.put("loggedIn", true);
        response.put("uid", user.getUid());
        response.put("id", user.getId());
        response.put("name", user.getName());

        return  ResponseEntity.ok(response);
    }

    // 이미 저장된 개인정보를 가져옴
    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getProfile(HttpSession session) {
        Map<String, Object> response = new HashMap<>();

        UserInfo user = (UserInfo) session.getAttribute("login"); // 세션에 저장된 유저

        // 하트 랭킹 계산
        double rankPercent = ranking.calculateHeartRankPercent(user.getId());

        if (user == null) {
            response.put("success", false);
            response.put("message", "로그인 필요");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        response.put("success", true);
        response.put("uid", user.getUid());
        response.put("name", user.getName());
        response.put("heart", postLikeRepository.countLikesReceived(user.getId()));
        response.put("rankPercent", rankPercent);
        return ResponseEntity.ok(response);
    }

    // 개인정보 업데이트
    @PutMapping("/profile")
    public ResponseEntity<Map<String, Object>> updateProfile(@RequestBody Map<String, String> updateData,
            HttpSession session) {

        Map<String, Object> response = new HashMap<>();
        UserInfo user = (UserInfo) session.getAttribute("login"); // 세션에 저장된 유저

        if (user == null) {
            response.put("success", false);
            response.put("message", "로그인 필요");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        // DB에서 다시 조회 (권장)
        UserInfo dbUser = userService.findByUid(user.getUid());

        // 변경할 값만 업데이트
        if (updateData.containsKey("name") && !updateData.get("name").isEmpty()) {
            dbUser.setName(updateData.get("name"));
        }

        if (updateData.containsKey("phone") && !updateData.get("phone").isEmpty()) {
            dbUser.setPhone(updateData.get("phone"));
        }

        if (updateData.containsKey("studentNo") && !updateData.get("studentNo").isEmpty()) {
            dbUser.setNumber(updateData.get("studentNo"));
        }

        if (updateData.containsKey("department") && !updateData.get("department").isEmpty()) {
            dbUser.setDept(userService.findDeptByName(updateData.get("department")));
        }


        userInfoRepository.save(dbUser);

        // 세션 정보도 업데이트
        session.setAttribute("login", dbUser);

        response.put("success", true);
        response.put("message", "개인정보 수정 완료");
        return ResponseEntity.ok(response);
    }

    // 모든학과 정보 반환
    @GetMapping("/departments")
    public ResponseEntity<Map<String, Object>> getDepartments() {
        Map<String, Object> response = new HashMap<>();
        List<Dept> deptList = deptRepository.findAll();

        List<String> deptNames = deptList.stream()
                .map(Dept::getName)
                .collect(Collectors.toList());

        response.put("success", true);
        response.put("departments", deptNames);

        return ResponseEntity.ok(response);
    }

    // 비밀번호 변경
    @PutMapping("/password")
    public ResponseEntity<Map<String, Object>> changePassword(
            @RequestBody Map<String, String> body,
            HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        UserInfo user = (UserInfo) session.getAttribute("login");

        if (user == null) {
            response.put("success", false);
            response.put("message", "로그인이 필요합니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        String newPassword = body.get("newPassword");
        if (newPassword == null || newPassword.isEmpty()) {
            response.put("success", false);
            response.put("message", "새 비밀번호를 입력해주세요.");
            return ResponseEntity.badRequest().body(response);
        }

        userService.updatePassword(user.getUid(), newPassword);
        response.put("success", true);
        response.put("message", "비밀번호 변경 완료");
        return ResponseEntity.ok(response);
    }

    // 계정 삭제
    @DeleteMapping("/deleteAccount")
    public ResponseEntity<Map<String, Object>> deleteAccount(
            @RequestBody Map<String, String> body,
            HttpSession session) {

        Map<String, Object> response = new HashMap<>();

        String inputPassword = body.get("password");

        // 세션에서 로그인 정보 가져오기
        UserInfo loginUser = (UserInfo) session.getAttribute("login");

        if (loginUser == null) {
            response.put("success", false);
            response.put("message", "로그인이 필요합니다.");
            return ResponseEntity.status(401).body(response);
        }

        // 비밀번호 확인
        if (!passwordEncoder.matches(inputPassword, loginUser.getPassword())) {
            response.put("success", false);
            response.put("message", "비밀번호가 일치하지 않습니다.");
            return ResponseEntity.status(400).body(response);
        }

        // DB에서 계정 삭제
        userService.deleteUser(loginUser.getId());

        // 🔥 세션 삭제 (중요!)
        session.invalidate();

        response.put("success", true);
        response.put("message", "계정이 삭제되었습니다.");
        return ResponseEntity.ok(response);
    }

    // 마이페이지 api
    @GetMapping("/mypage")
    public ResponseEntity<Map<String, Object>> getMyPage(HttpSession session) {
        Map<String, Object> response = new HashMap<>();

        UserInfo user = (UserInfo) session.getAttribute("login");
        if (user == null) {
            response.put("success", false);
            response.put("message", "로그인이 필요합니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        // 사용자 기본 정보
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("name", user.getName());
        userInfo.put("studentNo", user.getNumber());
        userInfo.put("department", user.getDept() != null ? user.getDept().getName() : "");
        userInfo.put("heart", 0); // 좋아요 합계는 추후 계산
        userInfo.put("rankPercent", 0); // 사용자 순위도 추후 계산

        // 사용자가 작성한 게시글 목록
        List<Map<String, Object>> myPosts = lostFoundPostService.getPostsByUser(user.getId());

        response.put("success", true);
        response.put("user", userInfo);
        response.put("posts", myPosts);

        return ResponseEntity.ok(response);
    }

    // 내가 올린 게시물

}

