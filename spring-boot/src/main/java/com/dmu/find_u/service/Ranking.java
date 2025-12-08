package com.dmu.find_u.service;

import com.dmu.find_u.entity.UserInfo;
import com.dmu.find_u.repository.PostLikeRepository;
import com.dmu.find_u.repository.UserInfoRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class Ranking {

    private final PostLikeRepository postLikeRepository;
    private final UserInfoRepository userRepository;

    // 하트 랭킹 퍼센트 계산
    public  double calculateHeartRankPercent(Long userId) {

        // 전체 유저 조회
        List<UserInfo> users = userRepository.findAll();

        // 유저별 받은 좋아요 수 계산 + 정렬
        List<UserHeart> ranking = users.stream()
                .map(u -> new UserHeart(u.getId(), postLikeRepository.countLikesReceived(u.getId())))
                .sorted((a, b) -> b.heart - a.heart)
                .toList();

        // 타겟 유저의 순위 찾기
        int rank = 0;
        for (int i = 0; i < ranking.size(); i++) {
            if (ranking.get(i).userId.equals(userId)) {
                rank = i + 1;
                break;
            }
        }

        int total = ranking.size();

        double percent = (double) rank / total * 100;

        return Math.round(percent * 100) / 100.0;
    }

    // 내부 데이터 클래스
    @Getter
    @AllArgsConstructor
    static class UserHeart {
        Long userId;
        int heart;
    }
}
