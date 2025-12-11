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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (6,'기타'),(3,'노트북'),(4,'에어팟'),(5,'열쇠'),(1,'지갑'),(2,'핸드폰');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(500) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `post_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6205ohrvan49o6twq3g1sd48e` (`post_id`),
  KEY `FK8kcum44fvpupyw6f5baccx25c` (`user_id`),
  CONSTRAINT `FK6205ohrvan49o6twq3g1sd48e` FOREIGN KEY (`post_id`) REFERENCES `lost_found_post` (`id`),
  CONSTRAINT `FK8kcum44fvpupyw6f5baccx25c` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'그거 혹시 검은색인가요?','2025-12-11 04:09:57.469075',NULL,47,41),(2,'헉... 비싸 보이는데 빨리 찾았으면 좋겠네요','2025-12-11 13:58:04.634346',NULL,1,42),(3,'혹시 창가 쪽 자리에 계셨나요? 그러면 도서관 근로학생한테 맡겨놨어요.','2025-12-11 13:58:50.726257',NULL,3,42),(4,'아이구 저런... 빨리 찾았으면 좋겠네요','2025-12-11 14:01:05.882702',NULL,5,40),(5,'그거 제거예요!! 내일 시간 되시면 찾으러 가도 될까요?','2025-12-11 14:01:34.687556',NULL,6,40),(6,'제 거요! 남자화장실 맞죠? ','2025-12-11 14:05:13.014289',NULL,7,40),(7,'여자 화장실입니다...','2025-12-11 14:05:54.499378',NULL,7,43);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dept`
--

DROP TABLE IF EXISTS `dept`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dept` (
  `id` int NOT NULL COMMENT '학과의 고유 아이디',
  `name` varchar(50) NOT NULL COMMENT '학과의 이름',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='학과 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dept`
--

LOCK TABLES `dept` WRITE;
/*!40000 ALTER TABLE `dept` DISABLE KEYS */;
INSERT INTO `dept` VALUES (5006,'AR·VR콘텐츠디자인과'),(5003,'건축과'),(6005,'경영정보학과'),(6001,'경영학과'),(1001,'기계공학과'),(1002,'기계설계공학과'),(2002,'로봇소프트에어과'),(5002,'바이오융합학과'),(3002,'반도체전자공학과'),(6006,'빅데이터경영과'),(5001,'생명화학공학과'),(6002,'세무회계학과'),(3004,'소방안전관리과'),(5005,'시각디자인과'),(5004,'실내건축디자인과'),(4001,'웹응용소프트웨어공학과'),(6003,'유통마케팅학과'),(4003,'인공지능소프트웨어학과'),(2001,'자동화공학과'),(3001,'전기공학과'),(3003,'정보통신공학과'),(4002,'컴퓨터소프트웨어공학과'),(6004,'호텔관광학과');
/*!40000 ALTER TABLE `dept` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lost_found_comment`
--

DROP TABLE IF EXISTS `lost_found_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lost_found_comment` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '댓글 ID',
  `post_id` bigint NOT NULL COMMENT '게시글 ID',
  `user_id` bigint NOT NULL COMMENT '댓글 작성자 ID',
  `content` text NOT NULL COMMENT '댓글 내용',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '작성일',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',
  PRIMARY KEY (`id`),
  KEY `fk_comment_post` (`post_id`),
  KEY `fk_comment_user` (`user_id`),
  CONSTRAINT `fk_comment_post` FOREIGN KEY (`post_id`) REFERENCES `lost_found_post` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_comment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='게시글 댓글';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lost_found_comment`
--

LOCK TABLES `lost_found_comment` WRITE;
/*!40000 ALTER TABLE `lost_found_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `lost_found_comment` ENABLE KEYS */;
UNLOCK TABLES;

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
INSERT INTO `lost_found_post` VALUES (1,2,6,40,'습득','만년필을 주웠습니다','고가의 물건 같은데 연락주세요','http://localhost:8080/uploaded_images/1765428395640_image 150.png','2025-12-11 10:51:54',NULL,'진행중',40,2),(2,6,6,40,'분실','할아버지가 주신 소중한 시계입니다...ㅠ','할아버지가 예전에 본인이 쓰시던 시계를 주셨는데 제게는 아주 소중한 거에요ㅠㅠㅠ\n꼭 좀 찾아주세요','http://localhost:8080/uploaded_images/1765428410068_Rectangle 117.png','2025-12-11 10:53:08',NULL,'진행중',32,2),(3,1,4,41,'분실','잃어버린 에어팟 찾습니다','도서관에서 공부하다가 까먹고 그냥 두고 왔습니다. 4층에서 마지막으로 사용한 걸로 기억하는데, 혹시 보신 분 계신가요..?\n오른쪽 아래에 작은 흠집 하나 있어요','http://localhost:8080/uploaded_images/1765428085461_Rectangle 118.png','2025-12-11 13:41:26',NULL,'진행중',16,2),(4,8,1,41,'습득','검정색 지갑 주인 찾습니다','제주몰빵 앞 엘리베이터에서 주웠습니다.\n안에 신분증에는 김XX 라고 되어있습니다','http://localhost:8080/uploaded_images/1765428617130_Rectangle 119.png','2025-12-11 13:50:17',NULL,'진행중',12,2),(5,6,6,42,'분실','애플워치 찾습니다','6호관 앞 잔디구장에서 운동하느라 잠깐 뺏었는데, 끝나고 보니 사라졌어요... ㅠㅠ 누구 보신 분 계시나요??','http://localhost:8080/uploaded_images/1765428750079_Rectangle 120.png','2025-12-11 13:52:30',NULL,'진행중',14,2),(6,2,6,42,'습득','노트 주인분?','2호관 1층 자습하는 곳(?) 거기에 떨어져 있었습니다.\n이름이 안 적혀있는데 내용을 보니 경영학부 학생 같습니다. 본인이시면 연락주세요.','http://localhost:8080/uploaded_images/1765428858408_Rectangle 146 (2).png','2025-12-11 13:54:18',NULL,'진행중',16,2),(7,3,2,43,'습득','아이폰 잃어버리신분??','3호관 1층 화장실 두 번째 칸에서 주웠습니다.\n본인 거면 얘기해주세요','http://localhost:8080/uploaded_images/1765429459683_Rectangle 146.png','2025-12-11 14:04:20',NULL,'진행중',10,1);
/*!40000 ALTER TABLE `lost_found_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lost_found_post_image`
--

DROP TABLE IF EXISTS `lost_found_post_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lost_found_post_image` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '이미지 ID',
  `post_id` bigint NOT NULL COMMENT '게시글 ID',
  `file_path` varchar(255) NOT NULL COMMENT '이미지 파일 경로',
  PRIMARY KEY (`id`),
  KEY `fk_image_post` (`post_id`),
  CONSTRAINT `fk_image_post` FOREIGN KEY (`post_id`) REFERENCES `lost_found_post` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='게시글 이미지 경로';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lost_found_post_image`
--

LOCK TABLES `lost_found_post_image` WRITE;
/*!40000 ALTER TABLE `lost_found_post_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `lost_found_post_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `place`
--

DROP TABLE IF EXISTS `place`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `place` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `place`
--

LOCK TABLES `place` WRITE;
/*!40000 ALTER TABLE `place` DISABLE KEYS */;
INSERT INTO `place` VALUES (1,'1호관'),(2,'2호관'),(3,'3호관'),(4,'4호관'),(5,'5호관'),(6,'6호관'),(7,'7호관'),(8,'8호관');
/*!40000 ALTER TABLE `place` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_like`
--

DROP TABLE IF EXISTS `post_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_like` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `post_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_post_user` (`post_id`,`user_id`),
  UNIQUE KEY `UKpmmko3h7yonaqhy5gxvnmdeue` (`post_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `post_like_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `lost_found_post` (`id`) ON DELETE CASCADE,
  CONSTRAINT `post_like_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=361 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_like`
--

LOCK TABLES `post_like` WRITE;
/*!40000 ALTER TABLE `post_like` DISABLE KEYS */;
INSERT INTO `post_like` VALUES (129,47,40,'2025-12-10 19:08:54'),(132,47,42,'2025-12-10 19:11:18'),(133,48,42,'2025-12-10 19:11:25'),(134,48,41,'2025-12-10 19:13:27'),(136,47,41,'2025-12-10 19:13:50'),(291,50,43,'2025-11-18 00:45:00'),(292,51,44,'2025-11-19 02:05:00'),(293,52,45,'2025-11-20 07:30:00'),(294,53,46,'2025-11-21 01:15:00'),(295,54,47,'2025-11-22 04:50:00'),(296,55,48,'2025-11-23 06:20:00'),(297,56,49,'2025-11-24 09:40:00'),(298,57,50,'2025-11-25 00:05:00'),(299,58,51,'2025-11-26 03:30:00'),(300,59,52,'2025-11-27 05:10:00'),(301,60,53,'2025-11-28 08:25:00'),(302,61,54,'2025-11-28 23:55:00'),(303,62,55,'2025-11-30 02:40:00'),(304,63,56,'2025-12-01 04:15:00'),(305,64,57,'2025-12-02 07:50:00'),(306,65,58,'2025-12-03 00:35:00'),(307,66,40,'2025-12-04 03:20:00'),(308,67,41,'2025-12-05 05:45:00'),(309,68,42,'2025-12-06 01:10:00'),(310,69,43,'2025-12-07 06:55:00'),(311,70,44,'2025-12-08 00:05:00'),(312,71,45,'2025-12-09 02:30:00'),(313,72,46,'2025-12-10 04:50:00'),(314,73,47,'2025-12-10 23:40:00'),(315,74,48,'2025-12-12 03:15:00'),(316,75,49,'2025-12-13 05:20:00'),(317,76,50,'2025-12-14 07:35:00'),(318,77,51,'2025-12-15 01:50:00'),(319,78,52,'2025-12-16 04:05:00'),(320,47,53,'2025-12-17 06:10:00'),(321,48,54,'2025-12-18 00:25:00'),(322,49,55,'2025-12-19 02:40:00'),(323,50,56,'2025-12-20 04:55:00'),(324,51,57,'2025-12-21 07:10:00'),(325,52,58,'2025-12-21 23:20:00'),(326,53,40,'2025-12-23 01:35:00'),(327,54,41,'2025-12-24 03:50:00'),(328,55,42,'2025-12-25 06:05:00'),(329,56,43,'2025-12-26 00:20:00'),(330,57,44,'2025-12-27 02:35:00'),(331,58,45,'2025-12-28 04:50:00'),(332,59,46,'2025-12-29 07:05:00'),(333,60,47,'2025-12-29 23:20:00'),(334,61,48,'2025-12-31 01:35:00'),(335,62,49,'2025-12-11 03:50:00'),(336,63,50,'2025-12-12 06:05:00'),(343,80,40,'2025-12-11 01:28:56'),(345,2,41,'2025-12-11 04:47:25'),(346,3,41,'2025-12-11 04:47:28'),(347,4,41,'2025-12-11 04:50:22'),(348,1,41,'2025-12-11 04:50:35'),(349,1,42,'2025-12-11 04:57:46'),(350,2,42,'2025-12-11 04:58:13'),(351,5,42,'2025-12-11 04:59:18'),(352,6,42,'2025-12-11 04:59:22'),(356,3,40,'2025-12-11 05:02:05'),(357,4,40,'2025-12-11 05:02:09'),(358,5,40,'2025-12-11 05:02:13'),(359,6,40,'2025-12-11 05:02:16'),(360,7,40,'2025-12-11 05:04:54');
/*!40000 ALTER TABLE `post_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `uid` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `number` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL COMMENT '사용자의 비밀번호',
  `dept` int DEFAULT NULL,
  `heart` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `phone_UNIQUE` (`phone`),
  UNIQUE KEY `uid_UNIQUE` (`uid`),
  KEY `dept_idx` (`dept`),
  CONSTRAINT `dept` FOREIGN KEY (`dept`) REFERENCES `dept` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='유저 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (40,'테스트','test1','010-0000-0000',NULL,'$2a$10$PVUw3Jz681plBMfRR2HUiuF2.zaGR/jj8zaxTJMBvpsmEffl6Wtry',NULL,0),(41,'테스트2','test2','010-1111-1111',NULL,'$2a$10$w2XHn8300aJ.4U7rz9Z8Vu3bFnr6tpwEvjEtt0JaaX3TCVeUSpD0G',NULL,0),(42,'테스트3','test3','010-2222-2222',NULL,'$2a$10$fyeJiaWSKg0kG4rlPg3P7OxDpNNcyYbRJiA1DJGREo6jLhR87zKhm',NULL,0),(43,'테스트4','test4','010-3333-3333',NULL,'$2a$10$wYnY5lhKVGYnK3LCgjzJ7e5UQ5Sqtrs4kDtkfqSViPOeGWkUXt21O',NULL,0),(44,'User1','user1','010-0000-0001',NULL,'1234',NULL,0),(45,'User2','user2','010-0000-0002',NULL,'1234',NULL,0),(46,'User3','user3','010-0000-0003',NULL,'1234',NULL,0),(47,'User4','user4','010-0000-0004',NULL,'1234',NULL,0),(48,'User5','user5','010-0000-0005',NULL,'1234',NULL,0),(49,'User6','user6','010-0000-0006',NULL,'1234',NULL,0),(50,'User7','user7','010-0000-0007',NULL,'1234',NULL,0),(51,'User8','user8','010-0000-0008',NULL,'1234',NULL,0),(52,'User9','user9','010-0000-0009',NULL,'1234',NULL,0),(53,'User10','user10','010-0000-0010',NULL,'1234',NULL,0),(54,'User11','user11','010-0000-0011',NULL,'1234',NULL,0),(55,'User12','user12','010-0000-0012',NULL,'1234',NULL,0),(56,'User13','user13','010-0000-0013',NULL,'1234',NULL,0),(57,'User14','user14','010-0000-0014',NULL,'1234',NULL,0),(58,'User15','user15','010-0000-0015',NULL,'1234',NULL,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `uid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK3mgdgq6k0sdhcfkbprlrerpd8` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-11 14:43:17
