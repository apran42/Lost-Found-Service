package com.dmu.find_u.controller;

import com.dmu.find_u.service.LostFoundPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class LostFoundPostController {

    private final LostFoundPostService lostFoundPostService;

    // 게시물 불러오기
    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> getAllPosts(
            @RequestParam(required = false) String type
    ) {
        Map<String, Object> response = new HashMap<>();

        List<Map<String, Object>> posts = lostFoundPostService.getAllPosts(type);

        response.put("success", true);
        response.put("posts", posts);
        return ResponseEntity.ok(response);
    }
}

