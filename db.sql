DROP Database IF EXISTS `wdc`;
CREATE Database `wdc`;

USE `wdc`;

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Profiles`;
CREATE TABLE `Profiles` (
  `user_id` INT UNSIGNED,
  `name` VARCHAR(255) DEFAULT NULL,
  -- `dob` DATE DEFAULT NULL,
  `phone` VARCHAR(255) DEFAULT NULL,
  `address_line_1` VARCHAR(255) DEFAULT NULL,
  `address_line_2` VARCHAR(255) DEFAULT NULL,
  `city` VARCHAR(255) DEFAULT NULL,
  `state` VARCHAR(255) DEFAULT NULL,
  `zipcode` VARCHAR(255) DEFAULT NULL,
  `country` VARCHAR(255) DEFAULT NULL,
  `school` VARCHAR(255) DEFAULT NULL,
  `degree` VARCHAR(255) DEFAULT NULL,
  `student_id` VARCHAR(255) DEFAULT NULL,
  `hobbies` TEXT DEFAULT NULL,
  `bio` TEXT DEFAULT NULL,
  `profile_picture` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `profiles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Clubs`;
CREATE TABLE `Clubs` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `manager_id` int unsigned NOT NULL,
  `thumbnail` text NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `clubs_manager_id_foreign` FOREIGN KEY (`manager_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Updates`;
CREATE TABLE `Updates` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `club_id` int unsigned NOT NULL,
  `creator_id` int unsigned NOT NULL,
  `text` text NOT NULL,
  `time_created` datetime NOT NULL,
  `is_public` tinyint(1) NOT NULL,
  `likes` int NOT NULL DEFAULT 0,
  `prev_likes` int NOT NULL DEFAULT 0,
  `is_clicked` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT `updates_club_id_foreign` FOREIGN KEY (`club_id`) REFERENCES `Clubs` (`id`) ON DELETE CASCADE,
  CONSTRAINT `updates_creator_id_foreign` FOREIGN KEY (`creator_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Events`;
CREATE TABLE `Events` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `club_id` int unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `thumbnail` text NOT NULL,
  `creator_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `events_club_id_foreign` FOREIGN KEY (`club_id`) REFERENCES `Clubs` (`id`) ON DELETE CASCADE,
  CONSTRAINT `events_creator_id_foreign` FOREIGN KEY (`creator_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `RSVPs`;
CREATE TABLE `RSVPs` (
  `event_id` int unsigned NOT NULL,
  `participant_id` int unsigned NOT NULL,
  PRIMARY KEY (`event_id`, `participant_id`),
  CONSTRAINT `rsvps_event_id_foreign` FOREIGN KEY (`event_id`) REFERENCES `Events` (`id`) ON DELETE CASCADE,
  CONSTRAINT `rsvps_participant_id_foreign` FOREIGN KEY (`participant_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Memberships`;
CREATE TABLE `Memberships` (
  `club_id` int unsigned NOT NULL,
  `member_id` int unsigned NOT NULL,
  `mail_noti_event` int DEFAULT 0,
  `mail_noti_update` int DEFAULT 0,
  PRIMARY KEY (`club_id`, `member_id`),
  CONSTRAINT `memberships_club_id_foreign` FOREIGN KEY (`club_id`) REFERENCES `Clubs` (`id`) ON DELETE CASCADE,
  CONSTRAINT `memberships_clubs_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Likes`;
CREATE TABLE `Likes` (
  `post_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  PRIMARY KEY (`post_id`, `user_id`),
  CONSTRAINT `likes_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `Updates` (`id`) ON DELETE CASCADE,
  CONSTRAINT `likes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (4,'a1829913@adelaide.edu.au','$2b$10$frm1vFjA9a8IweTRwu6YOe8wQQGr9.3b3cDiVXt7Xk5fGUW3s1.bm',1),(5,'quocdat.ngo@student.adelaide.edu.au','$2b$10$sKq2uRr2NSce/U2mxmKTmeUeOD7hPBGPLdY.8mqwqPpCcp.Cc15Ym',0),(6,'tuanminh.nguyen@student.adelaide.edu.au','$2b$10$U2lO9Lv6aA4ZGeJjnIntMOh9um6Uf/cSDTnc.ZruLOjWSwW83dpAa',0),(7,'vuanhquan.nguyen@student.adelaide.edu.au','$2b$10$Q/YkKUB8P2v0HCLLT7ocp.L5HyrCguyrvUlE9f3LyL9Knvkm3D.gK',0),(8,'noname@123','$2b$10$/JBVKE8kxT1BeFe/HIbqf.tPXviFqEMZ.ZVSFVFs6KxRwKo.X1PGO',0),(9,'w@w','$2b$10$jUpNeZOOayKmiJ0LO.dS6eL9krcHAvLTDBl2z/8xG1LwrMnQ13P7e',0),(10,'quangnguyentechno@gmail.com','@#@!(#*@)$#*$)(#@$*)@(#*@)#!@)(#',0),(11,'quangnguyenpro2609@gmail.com','@#@!(#*@)$#*$)(#@$*)@(#*@)#!@)(#',0);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `Clubs` WRITE;
/*!40000 ALTER TABLE `Clubs` DISABLE KEYS */;
INSERT INTO `Clubs` VALUES (3,'Computer Science Club','geeks for geeks','faculty','Adelaide',5,'https://csclub.org.au/images/logo.png'),(4,'Competitive Programming Club','ICPC','faculty','Adelaide',5,'https://youx.org.au/asset/Organisation/6792/3491325_2_cpc%20png.png?thumbnail_width=375&thumbnail_height=375&resize_type=CropToFit'),(5,'Adelaide Uni Mountain Club','hiking climbing kayaking','faculty','Adelaide',5,'https://cdn.revolutionise.com.au/logos/emp41tiozsitswtz.png'),(6,'QN33','Flexing chi la vo tinh','hobby','Adelaide',4,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH2O-R_tDmTbowfqLva_lnii9fXVxvV6zvMA&usqp=CAU');
/*!40000 ALTER TABLE `Clubs` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `Events` WRITE;
/*!40000 ALTER TABLE `Events` DISABLE KEYS */;
INSERT INTO `Events` VALUES (1,3,'Capture the Flag','welcome to the CLF biggest in the southern hemisphere','education','Duck Louge','2023-05-20 00:22:00','2023-05-21 00:22:00','https://thehackernews.com/images/-NM_eOkZF-n4/VzMaExTocvI/AAAAAAAAoCE/p6fvQFI2LmwWHVrqHRC186CzVaK4bg5KwCLcB/w0/facebook-capture-the-flag-ctf.png.png',5),(2,5,'Dinosaur Island','Welcome to the dinosaur park. Stay Alive !!','entertainment','Dinosaur heaven','2023-05-21 00:19:00','2023-05-27 00:19:00','https://upload.wikimedia.org/wikipedia/commons/8/81/Artificial_Intelligence_%26_AI_%26_Machine_Learning_-_30212411048.jpg',4),(3,3,'Intro to AI','Teaching about Machine Learning','education','Intro to AI','2023-05-20 00:33:00','2023-05-21 00:33:00','https://image.cnbcfm.com/api/v1/image/107191176-1675871046625-gettyimages-1246879777-raa-openaich230207_npTfk.jpeg?v=1676484288',4),(4,6,'FLEXING 101','HOW TO LOW-KEY FLEX','entertainment','UniLodge City Garden','2023-05-27 19:15:00','2023-05-28 19:15:00','https://storage.googleapis.com/cdn-entrade/bovagau-meme/340627190_757249655814119_8925653233023559102_n_1681047840',4),(5,3,'Programming till noon','Intro to programming','education','IW 114','2023-06-11 12:37:00','2023-06-18 12:37:00','data:image/jpeg;base64,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',5);

/*!40000 ALTER TABLE `Events` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `Updates` WRITE;
/*!40000 ALTER TABLE `Updates` DISABLE KEYS */;
INSERT INTO `Updates` VALUES (1,6,4,'grazie ragazzi','2023-06-03 17:45:00',1,2,0,0),(2,6,4,'mamma mia','2023-06-03 17:45:00',0,0,0,0), (3,5,5,'hiking to where ?','2023-06-03 19:45:00', 1,0,0,0), (4,3, 5,'Coding now at IW 114','2023-06-03 20:45:00', 1,0,0,0);
/*!40000 ALTER TABLE `Updates` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `Likes` WRITE;
/*!40000 ALTER TABLE `Likes` DISABLE KEYS */;
INSERT INTO `Likes` VALUES (1,4),(1,7);
/*!40000 ALTER TABLE `Likes` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `RSVPs` WRITE;
/*!40000 ALTER TABLE `RSVPs` DISABLE KEYS */;
INSERT INTO `RSVPs` VALUES (1,6),(2,6),(3,6),(4,6),(1,9),(2,9),(3,9),(4,9),(5,9),(1,10),(2,10),(3,10),(5,10);
/*!40000 ALTER TABLE `RSVPs` ENABLE KEYS */;
UNLOCK TABLES;


LOCK TABLES `Memberships` WRITE;
/*!40000 ALTER TABLE `Memberships` DISABLE KEYS */;
INSERT INTO `Memberships` VALUES (3,4,0,0),(3,6,0,0),(3,9,0,0),(3,10,0,0),(4,4,0,0),(4,6,0,0),(4,9,0,0),(5,4,0,0),(5,9,0,0),(6,4,0,0),(6,6,0,0),(6,9,0,0),(6,10,0,0);
/*!40000 ALTER TABLE `Memberships` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `Profiles` WRITE;
/*!40000 ALTER TABLE `Profiles` DISABLE KEYS */;
INSERT INTO `Profiles` VALUES (4,'Quang Nguyen',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'Dat Ngo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'Minh Nguyen',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,'Anh Quan',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,'test user',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,'winner',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,'quang google',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,'quang pro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Profiles` ENABLE KEYS */;
UNLOCK TABLES;