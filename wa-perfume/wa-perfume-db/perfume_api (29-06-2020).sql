-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 29, 2020 at 04:59 PM
-- Server version: 8.0.18
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `perfume_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` varchar(255) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` varchar(255) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `phone`, `name`, `password`, `email`, `createdAt`, `status`) VALUES
('5166484b-3956-407c-8549-ff4755afb689', '0931830894', 'Admin Vince', '654321', 'vinhadmin@mail.com', '2020-04-02T13:46:23.385Z', 1);

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
CREATE TABLE IF NOT EXISTS `brand` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`id`, `name`, `image`, `description`) VALUES
('2b34f1b4-03b8-4807-934b-5a9e19ca3296', 'Nhãn A', NULL, 'asdvasca'),
('97a8f0cf-2dce-4728-ba3f-a9ea13b11bbf', 'Nhãn D', NULL, 'dddd'),
('c46cb58c-ea14-4c3e-898a-04bc527e0f65', 'Nhãn C', NULL, 'sacasc'),
('cb1f177a-77d7-4379-89f7-6ebd47232383', 'Nhãn B', NULL, 'abc');

-- --------------------------------------------------------

--
-- Table structure for table `discount`
--

DROP TABLE IF EXISTS `discount`;
CREATE TABLE IF NOT EXISTS `discount` (
  `id` varchar(255) NOT NULL,
  `discount` int(2) DEFAULT NULL,
  `isLimited` int(1) NOT NULL DEFAULT '0' COMMENT '0 for false, 1 for true',
  `limitQuantity` int(255) DEFAULT NULL COMMENT 'limit number for discount',
  `startAt` varchar(255) NOT NULL,
  `endAt` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `list_discount`
--

DROP TABLE IF EXISTS `list_discount`;
CREATE TABLE IF NOT EXISTS `list_discount` (
  `id` varchar(255) NOT NULL,
  `discountId` varchar(255) NOT NULL,
  `perfumeDetailId` varchar(255) NOT NULL,
  `sizeId` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order` (
  `id` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `createdAt` varchar(255) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  `total` int(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
CREATE TABLE IF NOT EXISTS `order_detail` (
  `id` varchar(255) NOT NULL,
  `quantity` int(255) NOT NULL,
  `discountedPrice` int(255) DEFAULT NULL,
  `discountId` varchar(255) NOT NULL,
  `orderId` varchar(255) NOT NULL,
  `productId` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`),
  KEY `productId` (`productId`),
  KEY `discountId` (`discountId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `perfume`
--

DROP TABLE IF EXISTS `perfume`;
CREATE TABLE IF NOT EXISTS `perfume` (
  `id` varchar(255) NOT NULL,
  `price` int(255) NOT NULL,
  `quantity` int(255) NOT NULL,
  `sizeId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `perfumeDetailId` varchar(255) NOT NULL,
  `producerId` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `perfumeDetailId` (`perfumeDetailId`),
  KEY `producerId` (`producerId`),
  KEY `sizeId` (`sizeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `perfume`
--

INSERT INTO `perfume` (`id`, `price`, `quantity`, `sizeId`, `perfumeDetailId`, `producerId`) VALUES
('0740aae4-8c0d-4d74-af79-3d00bb8960d0', 29000, 10, '30ml', '10c52f2a-4253-4f94-bd08-1b4bc6cbbe14', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('09554eb3-17f2-4a5e-b23b-06f858a4ab5e', 39000, 10, '40ml', '10c52f2a-4253-4f94-bd08-1b4bc6cbbe14', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('115bd829-f24e-485d-8e4d-580e26dc03aa', 49000, 10, '30ml', '0d4cddce-6736-4a5e-8164-7b386e274ca6', '50b96132-063e-4106-93aa-a356c07571ac'),
('13420404-44d0-4f05-baf3-6ad5ded51470', 65000, 10, '55ml', '10c52f2a-4253-4f94-bd08-1b4bc6cbbe14', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('153b4f17-b39d-4c80-941e-698bdef5877c', 39000, 10, '20ml', '0d4cddce-6736-4a5e-8164-7b386e274ca6', '50b96132-063e-4106-93aa-a356c07571ac'),
('1fa12812-8b25-4944-b137-53fc3139a308', 35000, 10, '35ml', '10c52f2a-4253-4f94-bd08-1b4bc6cbbe14', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('7905b2cb-ea32-437d-a8df-b30464896321', 9000, 10, '15ml', '10c52f2a-4253-4f94-bd08-1b4bc6cbbe14', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('8929fb03-4144-4f8a-adbd-f11339df4f54', 7900000, 10, '100ml', '0d4cddce-6736-4a5e-8164-7b386e274ca6', '50b96132-063e-4106-93aa-a356c07571ac'),
('912a879f-025c-463a-a0ec-4401778a83e4', 69000, 10, '50ml', '0d4cddce-6736-4a5e-8164-7b386e274ca6', '50b96132-063e-4106-93aa-a356c07571ac'),
('989a5a78-7144-4489-9731-058e62d9b787', 89000, 10, '75ml', '10c52f2a-4253-4f94-bd08-1b4bc6cbbe14', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('a8210235-7e33-473c-aa2e-075e407d9913', 59000, 10, '50ml', '10c52f2a-4253-4f94-bd08-1b4bc6cbbe14', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('ac290eed-9242-47c7-9655-d11bdfc9222c', 29000, 10, '15ml', '0d4cddce-6736-4a5e-8164-7b386e274ca6', '50b96132-063e-4106-93aa-a356c07571ac'),
('b767aa02-4bd3-4fb1-86d0-23f0c82f8e74', 19000, 10, '20ml', '10c52f2a-4253-4f94-bd08-1b4bc6cbbe14', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('c1def52c-3da2-41c3-8e67-830dd5740f00', 1800000, 10, '100ml', '10c52f2a-4253-4f94-bd08-1b4bc6cbbe14', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('cd494ae9-77ad-45a3-a5a6-0bc1aa044132', 69000, 10, '65ml', '0d4cddce-6736-4a5e-8164-7b386e274ca6', '50b96132-063e-4106-93aa-a356c07571ac'),
('d070ab93-768f-49c8-b652-9220142cc357', 55000, 10, '35ml', '0d4cddce-6736-4a5e-8164-7b386e274ca6', '50b96132-063e-4106-93aa-a356c07571ac'),
('d07f3ca7-321c-43b7-b57b-f9d922004dbc', 79000, 10, '65ml', '10c52f2a-4253-4f94-bd08-1b4bc6cbbe14', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('d42cff66-b76a-4c1f-a265-cc0eb4b2468b', 59000, 10, '40ml', '0d4cddce-6736-4a5e-8164-7b386e274ca6', '50b96132-063e-4106-93aa-a356c07571ac'),
('d933d43b-a2d6-4f90-b4d9-4a9c491c79d4', 69000, 10, '55ml', '0d4cddce-6736-4a5e-8164-7b386e274ca6', '50b96132-063e-4106-93aa-a356c07571ac'),
('ef85f6c1-3980-43d3-aa61-e0d7daadcbd3', 79000, 10, '75ml', '0d4cddce-6736-4a5e-8164-7b386e274ca6', '50b96132-063e-4106-93aa-a356c07571ac');

-- --------------------------------------------------------

--
-- Table structure for table `perfume_detail`
--

DROP TABLE IF EXISTS `perfume_detail`;
CREATE TABLE IF NOT EXISTS `perfume_detail` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `style` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `gender` int(1) NOT NULL DEFAULT '2',
  `musk` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `lastLong` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `releasedAt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `comeFrom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  `brandId` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `brand_id` (`brandId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `perfume_detail`
--

INSERT INTO `perfume_detail` (`id`, `name`, `image`, `description`, `style`, `gender`, `musk`, `lastLong`, `releasedAt`, `comeFrom`, `status`, `brandId`) VALUES
('0d4cddce-6736-4a5e-8164-7b386e274ca6', 'Nước hoa Nhảm Nhí', NULL, 'aaaaa', 'Nhảm nhí nhảm nhí', 0, 'Cực kì nhảm nhí', '18 hours', '2020-06-25T08:30:23.629Z', 'Nhảm nhí land', 1, '97a8f0cf-2dce-4728-ba3f-a9ea13b11bbf'),
('10c52f2a-4253-4f94-bd08-1b4bc6cbbe14', 'Nước hoa H', NULL, NULL, 'Phong cách trưởng thành', 1, 'mùi hương mùi hương mùi hương mùi hương', '18 hours', '2020-06-25T17:19:48.408Z', 'Trưởng thành land', 0, '97a8f0cf-2dce-4728-ba3f-a9ea13b11bbf'),
('644687c6-cd92-451a-a9ec-5d7cb3cab960', 'Nước hoa Siêu Nhảm Nhí', NULL, NULL, 'Nhảm nhí nhảm nhí', 0, 'Cực kì nhảm nhí', '18 hours', '2020-06-25T16:54:12.825Z', 'Nhảm nhí land', 0, '97a8f0cf-2dce-4728-ba3f-a9ea13b11bbf'),
('6e859de0-db81-46af-9150-ef1a96097122', 'Nước hoa C', NULL, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit odio tenetur libero et delectus alias laudantium magnam iusto deleniti vero adipisci itaque in similique, rem quis maxime. Quia, neque autem.', 'Năng động', 2, 'Thơm phức', '13 hours', '2020-04-02T13:46:23.385Z', 'Korea', 0, 'c46cb58c-ea14-4c3e-898a-04bc527e0f65'),
('8a768df2-2af0-4cd6-b291-a35a1c38ab79', 'Nước hoa E', NULL, 'Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nư', 'Lịch lãm', 1, 'Mùi đặc trưng', '12 hours', '2020-04-03T06:25:31.278Z', 'America', 1, 'cb1f177a-77d7-4379-89f7-6ebd47232383'),
('9ebd7376-0624-4a27-832d-42c36b6a5f25', 'Nước hoa I', NULL, NULL, 'Phong cách quý sờ tộc', 1, 'Mùi hương nam tính lịch lãm', '18 hours', '2020-06-25T17:21:13.174Z', 'Quý sờ tộc', 0, 'c46cb58c-ea14-4c3e-898a-04bc527e0f65'),
('aa573c27-74df-4b8c-bf51-53a1f8364047', 'Nước hoa A', NULL, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit odio tenetur libero et delectus alias laudantium magnam iusto deleniti vero adipisci itaque in similique, rem quis maxime. Quia, neque autem.', 'Xì tin', 0, 'Mùi hương nồng nàn', '12 hours', '2020-04-02T13:46:23.385Z', 'Vietnam', 1, '2b34f1b4-03b8-4807-934b-5a9e19ca3296'),
('b25a46d7-095c-4fec-aea5-bb6f2605190e', 'Nước hoa F', NULL, 'Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nư', 'Phong cách A', 2, 'Mùi của F', '16 hours', '2020-04-03T05:25:31.278Z', 'Brazil', 1, 'cb1f177a-77d7-4379-89f7-6ebd47232383'),
('daaf7144-d46d-49e7-8b52-9b32e50fc3ac', 'Nước hoa B', NULL, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit odio tenetur libero et delectus alias laudantium magnam iusto deleniti vero adipisci itaque in similique, rem quis maxime. Quia, neque autem.', 'Trẻ trung', 1, 'Quyến rũ', '10 hours', '2020-04-02T13:46:23.385Z', 'Japan', 1, 'cb1f177a-77d7-4379-89f7-6ebd47232383'),
('f2e59c6c-1aaf-4471-9ab7-c572c535fcd6', 'Nước hoa D', NULL, 'Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nư', 'Tự tin khoe cá tính', 1, 'Mùi hoa', '24 hours', '2020-04-03T05:25:31.278Z', 'Russian', 1, '2b34f1b4-03b8-4807-934b-5a9e19ca3296'),
('f97d3f62-4e4d-48f3-921c-1905ed6c4637', 'Nước hoa G', NULL, 'Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nư', 'Gascascascasasdasdasd', 0, NULL, '5 hours', '2020-04-06T13:19:47.727Z', 'England', 1, '97a8f0cf-2dce-4728-ba3f-a9ea13b11bbf');

-- --------------------------------------------------------

--
-- Table structure for table `producer`
--

DROP TABLE IF EXISTS `producer`;
CREATE TABLE IF NOT EXISTS `producer` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `producer`
--

INSERT INTO `producer` (`id`, `name`, `address`, `phone`) VALUES
('50b96132-063e-4106-93aa-a356c07571ac', 'Nhà cung cấp A', 'aaaaaa', '113'),
('6d296e91-f11e-4c58-866b-4bdb6fc93fcb', 'Nhà cung cấp B', NULL, '11300');

-- --------------------------------------------------------

--
-- Table structure for table `size`
--

DROP TABLE IF EXISTS `size`;
CREATE TABLE IF NOT EXISTS `size` (
  `id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `size`
--

INSERT INTO `size` (`id`) VALUES
('100ml'),
('15ml'),
('20ml'),
('30ml'),
('35ml'),
('40ml'),
('50ml'),
('55ml'),
('65ml'),
('75ml');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
CREATE TABLE IF NOT EXISTS `transaction` (
  `id` varchar(255) NOT NULL,
  `createdAt` varchar(255) NOT NULL,
  `total` int(255) NOT NULL,
  `producerId` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `producerId` (`producerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transaction_detail`
--

DROP TABLE IF EXISTS `transaction_detail`;
CREATE TABLE IF NOT EXISTS `transaction_detail` (
  `id` varchar(255) NOT NULL,
  `quantity` int(255) NOT NULL,
  `size` int(10) NOT NULL,
  `entryPrice` int(255) NOT NULL,
  `transactionId` varchar(255) NOT NULL,
  `perfumeId` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `transactionId` (`transactionId`),
  KEY `perfumeId` (`perfumeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` varchar(255) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `firstName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `dateOfBirth` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT '1',
  `point` int(25) NOT NULL DEFAULT '0',
  `createdAt` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `phone`, `firstName`, `lastName`, `password`, `email`, `dateOfBirth`, `address`, `status`, `point`, `createdAt`) VALUES
('e060bbe7-b6a8-41a1-b9fb-400817888ab2', '0931830894', 'vince', 'lam', '$2b$10$sTJuBaY9JIupXfMQBee/T.ugRGaSFMFX8FPO3CKD18DjtzY32Bft.', 'vi.vinh0312@gmail.com', NULL, '123456', 1, 0, '2020-06-29T07:11:35.622Z');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user` ADD FULLTEXT KEY `phone_2` (`phone`);
ALTER TABLE `user` ADD FULLTEXT KEY `phone_3` (`phone`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `perfume` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `order_detail_ibfk_3` FOREIGN KEY (`discountId`) REFERENCES `discount` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `perfume`
--
ALTER TABLE `perfume`
  ADD CONSTRAINT `perfume_ibfk_2` FOREIGN KEY (`perfumeDetailId`) REFERENCES `perfume_detail` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `perfume_ibfk_3` FOREIGN KEY (`producerId`) REFERENCES `producer` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `perfume_ibfk_4` FOREIGN KEY (`sizeId`) REFERENCES `size` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `perfume_detail`
--
ALTER TABLE `perfume_detail`
  ADD CONSTRAINT `perfume_detail_ibfk_1` FOREIGN KEY (`brandId`) REFERENCES `brand` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`producerId`) REFERENCES `producer` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `transaction_detail`
--
ALTER TABLE `transaction_detail`
  ADD CONSTRAINT `transaction_detail_ibfk_2` FOREIGN KEY (`perfumeId`) REFERENCES `perfume_detail` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_detail_ibfk_3` FOREIGN KEY (`transactionId`) REFERENCES `transaction` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
