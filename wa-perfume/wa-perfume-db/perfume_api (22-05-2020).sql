-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 22, 2020 at 08:21 AM
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
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order` (
  `id` varchar(255) NOT NULL,
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
  `orderId` varchar(255) NOT NULL,
  `productId` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`),
  KEY `productId` (`productId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `perfume`
--

DROP TABLE IF EXISTS `perfume`;
CREATE TABLE IF NOT EXISTS `perfume` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `price` int(255) DEFAULT '0',
  `sale` int(2) DEFAULT '0',
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
-- Dumping data for table `perfume`
--

INSERT INTO `perfume` (`id`, `name`, `image`, `price`, `sale`, `description`, `style`, `gender`, `musk`, `lastLong`, `releasedAt`, `comeFrom`, `status`, `brandId`) VALUES
('6e859de0-db81-46af-9150-ef1a96097122', 'Nước hoa C', NULL, 3000000, 10, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit odio tenetur libero et delectus alias laudantium magnam iusto deleniti vero adipisci itaque in similique, rem quis maxime. Quia, neque autem.', 'Năng động', 2, 'Thơm phức', '13 hours', '2020-04-02T13:46:23.385Z', 'Korea', 0, 'c46cb58c-ea14-4c3e-898a-04bc527e0f65'),
('8a768df2-2af0-4cd6-b291-a35a1c38ab79', 'Nước hoa E', NULL, 6900000, 69, 'eeeeeeeeeeeee', 'Lịch lãm', 1, 'Mùi đặc trưng', '12 hours', '2020-04-03T06:25:31.278Z', 'America', 1, 'cb1f177a-77d7-4379-89f7-6ebd47232383'),
('aa573c27-74df-4b8c-bf51-53a1f8364047', 'Nước hoa A', NULL, 10000000, 5, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit odio tenetur libero et delectus alias laudantium magnam iusto deleniti vero adipisci itaque in similique, rem quis maxime. Quia, neque autem.', 'Xì tin', 0, 'Mùi hương nồng nàn', '12 hours', '2020-04-02T13:46:23.385Z', 'Vietnam', 1, '2b34f1b4-03b8-4807-934b-5a9e19ca3296'),
('b25a46d7-095c-4fec-aea5-bb6f2605190e', 'Nước hoa F', NULL, 900000, 20, 'fffffffffffff', 'Phong cách A', 2, 'Mùi của F', '16 hours', '2020-04-03T05:25:31.278Z', 'Brazil', 1, 'cb1f177a-77d7-4379-89f7-6ebd47232383'),
('daaf7144-d46d-49e7-8b52-9b32e50fc3ac', 'Nước hoa B', NULL, 36000000, 50, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit odio tenetur libero et delectus alias laudantium magnam iusto deleniti vero adipisci itaque in similique, rem quis maxime. Quia, neque autem.', 'Trẻ trung', 1, 'Quyến rũ', '10 hours', '2020-04-02T13:46:23.385Z', 'Japan', 1, 'cb1f177a-77d7-4379-89f7-6ebd47232383'),
('f2e59c6c-1aaf-4471-9ab7-c572c535fcd6', 'Nước hoa D', NULL, 2999000, 0, 'dddddddddddddd', 'Tự tin khoe cá tính', 1, 'Mùi hoa', '24 hours', '2020-04-03T05:25:31.278Z', 'Russian', 1, '2b34f1b4-03b8-4807-934b-5a9e19ca3296'),
('f97d3f62-4e4d-48f3-921c-1905ed6c4637', 'Nước hoa G', NULL, 5352000, 0, 'dddddddddddddddddddddddddd', 'Gascascascasasdasdasd', 0, NULL, '5 hour', '2020-04-06T13:19:47.727Z', 'England', 1, '97a8f0cf-2dce-4728-ba3f-a9ea13b11bbf');

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
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` varchar(255) NOT NULL,
  `size` int(10) NOT NULL,
  `quantity` int(255) NOT NULL DEFAULT '0',
  `perfumeId` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `perfumeId` (`perfumeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `phone`, `firstName`, `lastName`, `password`, `email`, `dateOfBirth`, `address`, `status`, `point`, `createdAt`) VALUES
('9a0df649-0f88-416c-84d2-cc110b337a20', '0931830894', 'Vinh', 'Lam', '123456', 'vinhdeptrai@mail.com', NULL, 'asasd', 1, 1000, '2020-04-02T13:46:23.385Z'),
('e2a451a8-16ff-4755-9b9a-2ad4fece3145', '121', 'aab', '', '123', 'testing@gmail.com', NULL, 'cc', 1, 2147483647, '2020-04-07T11:48:45.316Z');

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
  ADD CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `perfume`
--
ALTER TABLE `perfume`
  ADD CONSTRAINT `perfume_ibfk_1` FOREIGN KEY (`brandId`) REFERENCES `brand` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`perfumeId`) REFERENCES `perfume` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`producerId`) REFERENCES `producer` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `transaction_detail`
--
ALTER TABLE `transaction_detail`
  ADD CONSTRAINT `transaction_detail_ibfk_2` FOREIGN KEY (`perfumeId`) REFERENCES `perfume` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_detail_ibfk_3` FOREIGN KEY (`transactionId`) REFERENCES `transaction` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
