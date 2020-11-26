-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 26, 2020 at 02:09 PM
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
-- Database: `clothes_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `cate_id` int(4) UNSIGNED NOT NULL AUTO_INCREMENT,
  `cate_name` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`cate_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`cate_id`, `cate_name`) VALUES
(1, 'Áo'),
(2, 'Quần'),
(3, 'Đầm'),
(4, 'Áo Dài'),
(5, 'Váy');

-- --------------------------------------------------------

--
-- Table structure for table `cloth`
--

DROP TABLE IF EXISTS `cloth`;
CREATE TABLE IF NOT EXISTS `cloth` (
  `cloth_id` int(4) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `cloth_name` varchar(10) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `img_1` varchar(255) NOT NULL,
  `img_2` varchar(255) NOT NULL,
  `img_3` varchar(255) NOT NULL,
  `status` int(4) NOT NULL,
  `cate_id` int(4) UNSIGNED NOT NULL,
  `supp_id` int(4) UNSIGNED NOT NULL,
  PRIMARY KEY (`cloth_id`),
  KEY `cate_id` (`cate_id`),
  KEY `supp_id` (`supp_id`),
  KEY `status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cloth`
--

INSERT INTO `cloth` (`cloth_id`, `cloth_name`, `description`, `brand`, `img_1`, `img_2`, `img_3`, `status`, `cate_id`, `supp_id`) VALUES
(0001, 'áo sơ mi 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla porttitor massa id neque aliquam vestibulum morbi. Consectetur lorem donec massa sapien faucibus et molestie ac. Mattis molestie a iaculis at erat pellentesque. Odio facilisis mauris sit amet massa vitae tortor condimentum. Blandit cursus risus at ultrices mi tempus imperdiet. Convallis tellus id interdum velit. Nisl pretium fusce id velit ut tortor pretium. Nec feugiat in fermentum posuere urna nec. Pharetra diam sit amet nisl suscipit adipiscing.', 'brand 12', 'img2.png', 'img2.jpg', 'img3.jpg', 1, 1, 1),
(0002, 'quần dài 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla porttitor massa id neque aliquam vestibulum morbi. Consectetur lorem donec massa sapien faucibus et molestie ac. Mattis molestie a iaculis at erat pellentesque. Odio facilisis mauris sit amet massa vitae tortor condimentum. Blandit cursus risus at ultrices mi tempus imperdiet. Convallis tellus id interdum velit. Nisl pretium fusce id velit ut tortor pretium. Nec feugiat in fermentum posuere urna nec. Pharetra diam sit amet nisl suscipit adipiscing.', 'brand 2', 'img1.jpg', 'img2.jpg', 'img3.jpg', 2, 2, 2),
(0003, 'váy 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla porttitor massa id neque aliquam vestibulum morbi. Consectetur lorem donec massa sapien faucibus et molestie ac. Mattis molestie a iaculis at erat pellentesque. Odio facilisis mauris sit amet massa vitae tortor condimentum. Blandit cursus risus at ultrices mi tempus imperdiet. Convallis tellus id interdum velit. Nisl pretium fusce id velit ut tortor pretium. Nec feugiat in fermentum posuere urna nec. Pharetra diam sit amet nisl suscipit adipiscing.', 'brand 3', 'img1.jpg', 'img2.jpg', 'img3.jpg', 3, 5, 1),
(0004, 'đầm 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla porttitor massa id neque aliquam vestibulum morbi. Consectetur lorem donec massa sapien faucibus et molestie ac. Mattis molestie a iaculis at erat pellentesque. Odio facilisis mauris sit amet massa vitae tortor condimentum. Blandit cursus risus at ultrices mi tempus imperdiet. Convallis tellus id interdum velit. Nisl pretium fusce id velit ut tortor pretium. Nec feugiat in fermentum posuere urna nec. Pharetra diam sit amet nisl suscipit adipiscing.', 'brand 4', 'img1.jpg', 'img2.jpg', 'img3.jpg', 3, 3, 2),
(0005, 'áo dài 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla porttitor massa id neque aliquam vestibulum morbi. Consectetur lorem donec massa sapien faucibus et molestie ac. Mattis molestie a iaculis at erat pellentesque. Odio facilisis mauris sit amet massa vitae tortor condimentum. Blandit cursus risus at ultrices mi tempus imperdiet. Convallis tellus id interdum velit. Nisl pretium fusce id velit ut tortor pretium. Nec feugiat in fermentum posuere urna nec. Pharetra diam sit amet nisl suscipit adipiscing.', 'brand 5', 'img1.jpg', 'img2.jpg', 'img3.jpg', 3, 4, 1),
(0006, 'Áo thun 1', 'cccc', 'brand 2', 'img1.jpg', 'img2.jpg', 'img3.jpg', 2, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
CREATE TABLE IF NOT EXISTS `colors` (
  `color_id` int(4) UNSIGNED NOT NULL AUTO_INCREMENT,
  `color` varchar(255) NOT NULL,
  PRIMARY KEY (`color_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`color_id`, `color`) VALUES
(1, 'đỏ'),
(2, 'cam'),
(3, 'đen'),
(4, 'trắng');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` int(4) NOT NULL AUTO_INCREMENT,
  `total_cost` int(20) NOT NULL,
  `order_time` date NOT NULL,
  `od_id` int(4) UNSIGNED NOT NULL,
  `user_id` int(4) UNSIGNED NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `od_id` (`od_id`),
  KEY `cus_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
CREATE TABLE IF NOT EXISTS `order_detail` (
  `od_id` int(4) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `quantity` int(4) UNSIGNED NOT NULL,
  `variant_id` int(4) UNSIGNED NOT NULL,
  PRIMARY KEY (`od_id`),
  KEY `variant_id` (`variant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
CREATE TABLE IF NOT EXISTS `sizes` (
  `size_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `size` varchar(255) NOT NULL,
  PRIMARY KEY (`size_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sizes`
--

INSERT INTO `sizes` (`size_id`, `size`) VALUES
(1, 'xs'),
(2, 's'),
(3, 'm'),
(4, 'l'),
(5, 'xl'),
(7, 'xxl');

-- --------------------------------------------------------

--
-- Table structure for table `status_list`
--

DROP TABLE IF EXISTS `status_list`;
CREATE TABLE IF NOT EXISTS `status_list` (
  `status_id` int(255) NOT NULL AUTO_INCREMENT,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `status_list`
--

INSERT INTO `status_list` (`status_id`, `status`) VALUES
(1, 'Sale'),
(2, 'Out of order'),
(3, 'Normal');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
CREATE TABLE IF NOT EXISTS `supplier` (
  `supp_id` int(4) UNSIGNED NOT NULL AUTO_INCREMENT,
  `supp_name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `supp_phone` int(11) NOT NULL,
  `supp_address` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  PRIMARY KEY (`supp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`supp_id`, `supp_name`, `supp_phone`, `supp_address`) VALUES
(1, 'Supplier 1', 123456789, 'Supplier 1\'s address'),
(2, 'Supplier 2', 987654321, 'Supplier 2\'s address'),
(3, 'Supplier 3', 147258369, 'Supplier 3\'s address'),
(4, 'Supplier 4', 96385271, 'Supplier 4\'s address');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(4) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `last_name` int(11) NOT NULL,
  `phone` int(15) UNSIGNED NOT NULL,
  `address` varchar(255) NOT NULL,
  `role` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `email`, `password`, `first_name`, `last_name`, `phone`, `address`, `role`) VALUES
(0001, 'vi.vinh0312@gmail.com', '123456', 'vinh', 0, 113, '1jhjhjhjhjhhjhj', 1),
(0002, 'dungdo1165@gmail.com', 'duydung', 'Duy Dung', 0, 113, '111111111111', 0),
(0008, 'vinh123', '123456', 'vince', 0, 123456, '0123456', 0),
(0009, '123', '123', '123', 0, 123, '123', 0),
(0010, '122222', '12222', '112222', 0, 11111111, '11111', 0);

-- --------------------------------------------------------

--
-- Table structure for table `variant`
--

DROP TABLE IF EXISTS `variant`;
CREATE TABLE IF NOT EXISTS `variant` (
  `variant_id` int(4) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `variant_stock` int(10) UNSIGNED NOT NULL,
  `price` int(10) UNSIGNED NOT NULL,
  `sold` int(10) UNSIGNED NOT NULL,
  `cloth_id` int(4) UNSIGNED ZEROFILL NOT NULL,
  `size_id` int(4) UNSIGNED NOT NULL,
  `color_id` int(4) UNSIGNED NOT NULL,
  PRIMARY KEY (`variant_id`),
  UNIQUE KEY `variant_id` (`variant_id`),
  KEY `cloth_id` (`cloth_id`),
  KEY `size_id` (`size_id`),
  KEY `color_id` (`color_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `variant`
--

INSERT INTO `variant` (`variant_id`, `variant_stock`, `price`, `sold`, `cloth_id`, `size_id`, `color_id`) VALUES
(0001, 9, 69000, 0, 0003, 2, 2),
(0002, 2, 96000, 0, 0002, 1, 1),
(0003, 9, 50000, 0, 0001, 1, 3),
(0004, 9, 23000, 3, 0001, 1, 4),
(0005, 10, 1000000, 0, 0001, 3, 1),
(0006, 10, 30000, 0, 0001, 1, 2),
(0007, 10, 30000, 0, 0001, 5, 1),
(0008, 10, 30000, 0, 0002, 1, 1),
(0009, 10, 20000, 0, 0002, 2, 1),
(0010, 10, 90000, 0, 0002, 3, 1),
(0011, 10, 45000, 0, 0002, 5, 1),
(0012, 10, 60900, 0, 0003, 1, 2),
(0013, 10, 30000, 0, 0003, 3, 2),
(0014, 10, 30000, 0, 0003, 4, 1),
(0015, 10, 30000, 0, 0003, 5, 2),
(0016, 10, 30000, 0, 0004, 1, 1),
(0017, 10, 30000, 0, 0004, 2, 2),
(0018, 10, 30000, 0, 0004, 3, 1),
(0019, 10, 30000, 0, 0004, 4, 2),
(0020, 10, 30000, 0, 0004, 5, 2),
(0021, 10, 30000, 0, 0005, 1, 1),
(0022, 10, 30000, 0, 0005, 2, 2),
(0023, 10, 30000, 0, 0005, 3, 2),
(0024, 10, 30000, 0, 0005, 4, 1),
(0025, 10, 30000, 0, 0005, 5, 2),
(0028, 2, 69000, 20, 0001, 1, 4),
(0031, 1, 96000, 0, 0001, 1, 1);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cloth`
--
ALTER TABLE `cloth`
  ADD CONSTRAINT `cloth_ibfk_2` FOREIGN KEY (`cate_id`) REFERENCES `category` (`cate_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cloth_ibfk_3` FOREIGN KEY (`status`) REFERENCES `status_list` (`status_id`),
  ADD CONSTRAINT `cloth_ibfk_4` FOREIGN KEY (`supp_id`) REFERENCES `supplier` (`supp_id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`od_id`) REFERENCES `order_detail` (`od_id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`variant_id`) REFERENCES `variant` (`variant_id`);

--
-- Constraints for table `variant`
--
ALTER TABLE `variant`
  ADD CONSTRAINT `variant_ibfk_1` FOREIGN KEY (`cloth_id`) REFERENCES `cloth` (`cloth_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `variant_ibfk_2` FOREIGN KEY (`color_id`) REFERENCES `colors` (`color_id`),
  ADD CONSTRAINT `variant_ibfk_3` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`size_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
