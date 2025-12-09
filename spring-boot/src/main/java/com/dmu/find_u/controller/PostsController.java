package com.dmu.find_u.controller;

import com.dmu.find_u.entity.LostFoundPost;
import com.dmu.find_u.repository.LostFoundPostRepository;
import com.dmu.find_u.service.LostFoundPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // React 포트
public class PostsController {

    private final LostFoundPostService postService;
    private final LostFoundPostRepository lostFoundPostRepository;

    // 1) 내가 올린 게시물 전체
    @GetMapping("/my")
    public List<Map<String, Object>> getMyPosts(@RequestParam Long userId) {
        return postService.getPostsByUser(userId);
    }

    // 2) 내가 올린 "습득물" 게시물
    @GetMapping("/my-found")
    public List<Map<String, Object>> getMyFoundPosts(@RequestParam Long userId) {
        return postService.getPostsByUserAndType(userId, "습득");
    }

    // 3) 내가 올린 "분실물" 게시물
    @GetMapping("/my-lost")
    public List<Map<String, Object>> getMyLostPosts(@RequestParam Long userId) {
        return postService.getPostsByUserAndType(userId, "분실");
    }

    // 4) 게시물의 아이디를 기반으로 조회
    @GetMapping("/post/{postId}")
    public Map<String, Object> getPostById(@PathVariable Long postId) {
        return postService.getPostById(postId);

    }

}
