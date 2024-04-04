-- Adminer 4.8.1 MySQL 8.3.0 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `cargoes`;
CREATE TABLE `cargoes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `weight` float NOT NULL,
  `invoice_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `invoice_id` (`invoice_id`),
  CONSTRAINT `cargoes_ibfk_1` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `cities`;
CREATE TABLE `cities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `cities` (`id`, `name`) VALUES
(1,	'муром'),
(2,	'владимир'),
(3,	'александров'),
(4,	'нижний-новгород'),
(5,	'Москва'),
(6,	'санкт-петербург');

DROP TABLE IF EXISTS `invoices`;
CREATE TABLE `invoices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender` bigint NOT NULL,
  `recipient` bigint NOT NULL,
  `end_point` int NOT NULL,
  `status` int NOT NULL,
  `price` decimal(10,0),
  PRIMARY KEY (`id`),
  KEY `sender` (`sender`),
  KEY `recipient` (`recipient`),
  KEY `end_point` (`end_point`),
  KEY `status` (`status`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`sender`) REFERENCES `users` (`id`),
  CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`recipient`) REFERENCES `users` (`id`),
  CONSTRAINT `invoices_ibfk_3` FOREIGN KEY (`end_point`) REFERENCES `stocks` (`id`),
  CONSTRAINT `invoices_ibfk_4` FOREIGN KEY (`status`) REFERENCES `statuses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `role` (`id`, `name`) VALUES
(1,	'client'),
(2,	'admin');

DROP TABLE IF EXISTS `statuses`;
CREATE TABLE `statuses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `statuses` (`id`, `name`) VALUES
(1,	'new'),
(2,	'payment'),
(3,	'paid'),
(4,	'delivers'),
(5,	'reseived'),
(6,	'end');

DROP TABLE IF EXISTS `stocks`;
CREATE TABLE `stocks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `city_id` (`city_id`),
  CONSTRAINT `stocks_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `document_number` varchar(255) NOT NULL,
  `role_id` int DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `document_number` (`document_number`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE SET DEFAULT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `users` (`id`, `name`, `surname`, `lastname`, `email`, `document_number`, `role_id`, `password`) VALUES
(1,	'Чернышев',	'Анатолий',	'Евгеньевич',	'kayn23@yandex.ru',	'2747363738',	2,	'232111');

-- 2024-04-02 00:37:43
