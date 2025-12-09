package com.dmu.find_u.controller;

import com.dmu.find_u.service.LostFoundPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
            @RequestParam(required = false) String type,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "15") int size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String place,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate
    ) {
        Map<String, Object> response = new HashMap<>();

        Page<Map<String, Object>> postsPage = lostFoundPostService.getAllPosts(
                type, page, size, sortBy, place, category, startDate, endDate
        );


        response.put("success", true);
        response.put("posts", postsPage.getContent());
        response.put("currentPage", postsPage.getNumber());
        response.put("totalPages", postsPage.getTotalPages());
        response.put("totalElements", postsPage.getTotalElements());

        return ResponseEntity.ok(response);
    }
}

