-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: findu
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `lost_found_post`
--

DROP TABLE IF EXISTS `lost_found_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lost_found_post` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '게시글 고유 ID',
  `place_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL COMMENT '작성자 ID (UserInfo 참조)',
  `type` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL COMMENT '게시글 제목',
  `content` text COMMENT '게시글 내용',
  `image` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '작성일',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',
  `status` varchar(255) NOT NULL,
  `view_count` int DEFAULT '0' COMMENT '조회수',
  `like_count` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_post_user` (`user_id`),
  KEY `fk_post_place` (`place_id`),
  KEY `fk_post_category` (`category_id`),
  CONSTRAINT `fk_post_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `fk_post_place` FOREIGN KEY (`place_id`) REFERENCES `place` (`id`),
  CONSTRAINT `fk_post_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='분실물/습득물 게시글';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lost_found_post`
--

LOCK TABLES `lost_found_post` WRITE;
/*!40000 ALTER TABLE `lost_found_post` DISABLE KEYS */;
INSERT INTO `lost_found_post` VALUES (1,2,6,40,'습득','만년필을 주웠습니다','고가의 물건 같은데 연락주세요','http://localhost:8080/uploaded_images/1765428395640_image 150.png','2025-12-11 10:51:54',NULL,'진행중',52,2),(2,6,6,40,'분실','할아버지가 주신 소중한 시계입니다...ㅠ','할아버지가 예전에 본인이 쓰시던 시계를 주셨는데 제게는 아주 소중한 거에요ㅠㅠㅠ\n꼭 좀 찾아주세요','http://localhost:8080/uploaded_images/1765428410068_Rectangle 117.png','2025-12-11 10:53:08',NULL,'진행중',36,2),(3,1,4,41,'분실','잃어버린 에어팟 찾습니다','도서관에서 공부하다가 까먹고 그냥 두고 왔습니다. 4층에서 마지막으로 사용한 걸로 기억하는데, 혹시 보신 분 계신가요..?\n오른쪽 아래에 작은 흠집 하나 있어요','http://localhost:8080/uploaded_images/1765428085461_Rectangle 118.png','2025-12-11 13:41:26',NULL,'진행중',32,2),(4,8,1,41,'습득','검정색 지갑 주인 찾습니다','제주몰빵 앞 엘리베이터에서 주웠습니다.\n안에 신분증에는 김XX 라고 되어있습니다','http://localhost:8080/uploaded_images/1765428617130_Rectangle 119.png','2025-12-11 13:50:17',NULL,'진행중',28,2),(5,6,6,42,'분실','애플워치 찾습니다','6호관 앞 잔디구장에서 운동하느라 잠깐 뺏었는데, 끝나고 보니 사라졌어요... ㅠㅠ 누구 보신 분 계시나요??','http://localhost:8080/uploaded_images/1765428750079_Rectangle 120.png','2025-12-11 13:52:30',NULL,'진행중',28,2),(6,2,6,42,'습득','노트 주인분?','2호관 1층 자습하는 곳(?) 거기에 떨어져 있었습니다.\n이름이 안 적혀있는데 내용을 보니 경영학부 학생 같습니다. 본인이시면 연락주세요.','http://localhost:8080/uploaded_images/1765428858408_Rectangle 146 (2).png','2025-12-11 13:54:18',NULL,'진행중',18,2),(7,3,2,43,'습득','아이폰 잃어버리신분??','3호관 1층 화장실 두 번째 칸에서 주웠습니다.\n본인 거면 얘기해주세요','http://localhost:8080/uploaded_images/1765429459683_Rectangle 146.png','2025-12-11 14:04:20',NULL,'진행중',60,1);
/*!40000 ALTER TABLE `lost_found_post` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-18 13:50:56
