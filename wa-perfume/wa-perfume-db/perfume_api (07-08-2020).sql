-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 07, 2020 at 08:28 AM
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

DELIMITER $$
--
-- Procedures
--
DROP PROCEDURE IF EXISTS `loop_array`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `loop_array` (IN `order_id` VARCHAR(255))  begin
	declare group_id_od text;
	declare start_position int;
	declare end_position int;
    declare id_order_detail varchar(255);
    declare countOd int;
    
	SET group_id_od = (SELECT GROUP_CONCAT(id) as string from order_detail where order_detail.orderId = order_id);
    SET countOd = (select count(id) from order_detail where order_detail.orderId = order_id);
    set start_position = 1;
    set end_position = locate(",", group_id_od);
	if ( countOd > 1 ) then
		loop_update_od: LOOP
			IF end_position = 0 then
				set id_order_detail = substring(group_id_od, start_position, CHAR_LENGTH(group_id_od) - start_position +1);
				call update_perfume_quan(id_order_detail);
				leave loop_update_od;
			end if;
			set id_order_detail = substring(group_id_od, start_position, end_position-start_position);
			call update_perfume_quan(id_order_detail);
			set start_position = end_position+1;
			set end_position = locate(",", group_id_od, end_position+1);
		end LOOP;
	else
		call update_perfume_quan(group_id_od);
    end if;
END$$

DROP PROCEDURE IF EXISTS `update_perfume_price`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_perfume_price` (`pd_id` VARCHAR(255))  BEGIN
	select price from perfume as p where p.perfumeDetailId = pd_id;
end$$

DROP PROCEDURE IF EXISTS `update_perfume_quan`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_perfume_quan` (`id_order_detail` VARCHAR(255))  begin
	UPDATE `perfume` set quantity = (
		quantity + (select quantity from `order_detail` as od where od.id = id_order_detail)
	) where `perfume`.id = (
		select perfumeId 
		from `order_detail` as od
		where od.id = id_order_detail
	);
end$$

DELIMITER ;

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
('5166484b-3956-407c-8549-ff4755afb689', '0931830894', 'Admin Vince', '$2b$10$5wd695LXJmmJrHvjAhQsJue/Lll1fUOufhNNcHCfUJVYjxnzCq2ea', 'vinhadmin@gmail.com', '2020-04-02T13:46:23.385Z', 1);

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
('2b34f1b4-03b8-4807-934b-5a9e19ca3296', 'Gucci', 'http://res.cloudinary.com/dza0es8zq/image/upload/v1595991713/f3hcqbfzojuznx8ejsho.jpg', 'asdvasca'),
('7601a192-96b3-4c4d-9944-c165bd97cdc2', 'Dior', 'http://res.cloudinary.com/dza0es8zq/image/upload/v1595788777/eq6l9jnklym71ctt4eof.jpg', 'ascascasdasdsadsadasd'),
('84dcb751-2672-46e4-8cb3-5297d3052856', 'Burberrry', 'http://res.cloudinary.com/dza0es8zq/image/upload/v1595816005/mffsbkvl8kfsq4glibxo.png', 'as45sa4sa45d45sa4c54sa5c'),
('97a8f0cf-2dce-4728-ba3f-a9ea13b11bbf', 'Channel', 'http://res.cloudinary.com/dza0es8zq/image/upload/v1596357586/dwxljlw6x94jwkee8iz8.png', '123ssss'),
('c46cb58c-ea14-4c3e-898a-04bc527e0f65', 'D&G (Dolce & Gabbana)', 'https://res.cloudinary.com/dza0es8zq/image/upload/v1595743328/79272961_1041345149546781_4786370554628145152_n_aoq74e.jpg', 'sacascasc'),
('cb1f177a-77d7-4379-89f7-6ebd47232383', 'Jo Malone London', 'http://res.cloudinary.com/dza0es8zq/image/upload/v1595926881/y25vi7s0vkfrnrkomg8k.jpg', 'abc'),
('ef07ffeb-f02b-4700-b806-b17b07617ee4', 'Guerlain.', 'http://res.cloudinary.com/dza0es8zq/image/upload/v1595785124/i95yuxx7cwumet4h54un.png', 'test upload image');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `id` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `createdAt` varchar(255) NOT NULL,
  `star` int(1) NOT NULL DEFAULT '0' COMMENT '0: 0 star, 1: 1 star, 2: 2 star, ...',
  `status` int(1) NOT NULL DEFAULT '1',
  `parentId` varchar(255) DEFAULT NULL,
  `perfumeDetailId` varchar(255) NOT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `adminId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `perfumeDetailId` (`perfumeDetailId`),
  KEY `userId` (`userId`),
  KEY `adminId` (`adminId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `discount`
--

DROP TABLE IF EXISTS `discount`;
CREATE TABLE IF NOT EXISTS `discount` (
  `id` varchar(255) NOT NULL,
  `discount` int(2) DEFAULT NULL,
  `quantityLimit` int(255) DEFAULT NULL COMMENT 'null is not limit',
  `startAt` varchar(255) NOT NULL,
  `endAt` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `discount`
--

INSERT INTO `discount` (`id`, `discount`, `quantityLimit`, `startAt`, `endAt`) VALUES
('1', 30, NULL, '2020-07-14T16:41:09.918Z', '2020-09-23T16:41:09.918Z'),
('2', 99, NULL, '2020-05-14T16:45:43.817Z', '2020-06-14T16:45:43.817Z');

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
  PRIMARY KEY (`id`),
  KEY `discountId` (`discountId`),
  KEY `perfumeDetailId` (`perfumeDetailId`),
  KEY `sizeId` (`sizeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `list_discount`
--

INSERT INTO `list_discount` (`id`, `discountId`, `perfumeDetailId`, `sizeId`) VALUES
('1', '1', '0d4cddce-6736-4a5e-8164-7b386e274ca6', '15ml'),
('2', '2', '0d4cddce-6736-4a5e-8164-7b386e274ca6', '15ml'),
('3', '1', '10c52f2a-4253-4f94-bd08-1b4bc6cbbe14', '100ml');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order` (
  `id` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `createdAt` varchar(255) NOT NULL,
  `message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  `userId` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `address`, `createdAt`, `message`, `status`, `userId`) VALUES
('05f72731-494b-40ec-bc64-b51fcc1b37eb', 'aaas', '2020-07-17T16:36:32.021Z', NULL, 1, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2'),
('0964ef73-89fe-46c9-bfe6-0c86bbabd545', 'aaas', '2020-07-19T15:59:12.697Z', NULL, 1, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2'),
('123a4573-bd0d-44f2-97e2-3eab4f5b31ea', 'yes yes yes', '2020-07-25T07:46:56.382Z', 'user canceled order', 2, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2'),
('25b12a80-36bd-4bbd-8bac-ceefc0e4790b', 'qwerty', '2020-07-26T14:28:29.442Z', 'user canceled order', 2, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2'),
('40fdb321-600c-4d65-9b2b-30e40b7f92bc', 'aaas', '2020-07-18T06:55:59.827Z', NULL, 1, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2'),
('49030e7c-fbb2-4d30-a5d9-ac88770884f0', '12', '2020-07-21T05:58:46.233Z', NULL, 1, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2'),
('5d06cd15-0efb-456c-9b10-d1685157c4de', 'asasd', '2020-07-26T05:21:06.357Z', 'user canceled order', 2, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2'),
('6332f7d2-69a2-44af-8cb6-031d24964c76', '555', '2020-08-02T08:38:39.587Z', 'user canceled order', 2, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2'),
('69b225f0-9a4a-4fe8-830a-179ad1344418', 'testing', '2020-07-28T09:29:05.250Z', 'testing', 2, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2'),
('715ebd09-8b60-4092-8c12-0904bb47209b', '123', '2020-07-21T06:09:29.201Z', 'không bán', 3, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2'),
('7aacab60-967b-4e1f-957c-41fcd42ff962', 'My house ♥', '2020-07-20T16:54:33.048Z', NULL, 3, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2'),
('82d53806-dd88-4641-84e8-61bf7a2aff08', 'đố biết địa chỉ', '2020-07-24T06:41:19.884Z', NULL, 1, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2'),
('84eed610-bec4-4156-8122-5bb7bfa6808f', '11', '2020-07-28T09:35:43.913Z', 'user canceled order', 2, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2'),
('85d2d501-f9e5-4d91-97fc-06d95cad7cb3', '456465465465', '2020-07-24T10:47:32.974Z', 'lại tính bùng hàng chứ giề?', 3, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2'),
('8bd203fb-4547-4077-b11d-a400b7e221bd', 'asd', '2020-07-20T16:37:57.232Z', NULL, 1, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2'),
('9c104832-b382-4e41-92b8-ec4b3c9a19c0', 'hhjhjhhj', '2020-07-29T03:36:15.808Z', 'user canceled order', 2, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2'),
('b3358915-ee68-4718-b525-bd9837f40307', 'testing', '2020-07-28T11:47:57.350Z', NULL, 3, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2'),
('b422822b-59e2-447e-bda9-1696f2a7a05d', 'aaas', '2020-07-18T08:09:26.680Z', 'bùng hàng', 2, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2'),
('b47e9d19-5996-4aeb-829e-69358700013b', 'LET\'S ME HAVE IT!!!!', '2020-07-28T09:38:51.987Z', NULL, 1, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2'),
('b9ee4183-a620-4c69-a835-df74f6c2ab2e', '554545', '2020-08-05T12:51:43.962Z', 'user canceled order', 2, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2'),
('bb27ae19-676b-4966-8d9e-28011af7d0a9', '4444', '2020-07-29T03:03:39.220Z', 'ok', 1, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2'),
('c81efd8a-e61a-414e-8a20-5efd223fa1e3', 'testing', '2020-07-25T16:02:10.304Z', NULL, 1, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2'),
('cea50238-fd2d-4a14-b0ed-e44dd48aca26', 'đồn công an', '2020-07-20T16:30:41.448Z', NULL, 3, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2'),
('db58c5cb-a237-439d-afee-c823ce05c67e', 'aaas', '2020-07-17T17:45:27.675Z', NULL, 3, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2'),
('e04c3754-89ad-4331-a70a-29f97a34b80a', 'ascascascs', '2020-07-26T06:18:44.161Z', 'ok', 1, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2'),
('ee400b94-b700-4eeb-afd7-9ca97d9b25e5', '7', '2020-08-07T08:05:15.324Z', NULL, 0, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2'),
('fa75fa58-6c68-4d96-8b1c-bc90b352975d', 'test', '2020-08-05T14:27:51.257Z', 'mua cc', 3, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2'),
('fb6260cc-d7a7-48ef-9a6b-7374d4b60283', '12213', '2020-07-29T03:54:21.821Z', NULL, 1, 'e060bbe7-b6a8-41a1-b9fb-400817888ab2');

--
-- Triggers `order`
--
DROP TRIGGER IF EXISTS `trg_after_update_order`;
DELIMITER $$
CREATE TRIGGER `trg_after_update_order` AFTER UPDATE ON `order` FOR EACH ROW BEGIN
	IF ( OLD.status = 0 ) THEN
		IF (NEW.status <> 1 AND NEW.status <> 0) THEN
			call loop_array(NEW.id);
        END IF;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
CREATE TABLE IF NOT EXISTS `order_detail` (
  `id` varchar(255) NOT NULL,
  `quantity` int(255) NOT NULL,
  `discountedPrice` int(255) DEFAULT NULL,
  `discountId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `orderId` varchar(255) NOT NULL,
  `perfumeId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`),
  KEY `productId` (`perfumeId`),
  KEY `discountId` (`discountId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`id`, `quantity`, `discountedPrice`, `discountId`, `orderId`, `perfumeId`) VALUES
('03b1978c-2d2c-46af-a556-829e32cc3843', 1, NULL, NULL, 'cea50238-fd2d-4a14-b0ed-e44dd48aca26', '13420404-44d0-4f05-baf3-6ad5ded51470'),
('07682963-62e7-4470-81cc-974a7f63ddf8', 5, 3710000, '1', '123a4573-bd0d-44f2-97e2-3eab4f5b31ea', 'c1def52c-3da2-41c3-8e67-830dd5740f00'),
('08b3069d-8653-43a9-a020-7e0183502098', 1, NULL, NULL, '7aacab60-967b-4e1f-957c-41fcd42ff962', '989a5a78-7144-4489-9731-058e62d9b787'),
('0909cf7b-ea04-4e58-9414-59539dbdd857', 1, NULL, NULL, 'fa75fa58-6c68-4d96-8b1c-bc90b352975d', 'ff11254e-0d49-4b81-ba1e-f3e88c0357ba'),
('0dbaead0-d696-4947-a951-84a6aa3fb9e5', 1, NULL, NULL, '8bd203fb-4547-4077-b11d-a400b7e221bd', '8929fb03-4144-4f8a-adbd-f11339df4f54'),
('16bb9ad0-bbf1-4c56-a81e-641f9df23c9b', 1, NULL, NULL, 'cea50238-fd2d-4a14-b0ed-e44dd48aca26', '7905b2cb-ea32-437d-a8df-b30464896321'),
('19e0168e-e31d-491d-8f1d-6b1733ad58a7', 5, NULL, NULL, '8bd203fb-4547-4077-b11d-a400b7e221bd', '8afc47bf-c78c-11ea-8612-0492260b6292'),
('1c8d42f8-9dde-4e58-a470-959dd58cd901', 2, NULL, NULL, 'c81efd8a-e61a-414e-8a20-5efd223fa1e3', '13420404-44d0-4f05-baf3-6ad5ded51470'),
('21230326-00ad-4d46-9a9b-e84d367b9992', 1, NULL, NULL, 'ee400b94-b700-4eeb-afd7-9ca97d9b25e5', '11a277d7-ddb6-4b36-acfb-b7b306aa641a'),
('223d370b-0c11-4a89-9ee5-6cf30489bead', 1, NULL, NULL, 'c81efd8a-e61a-414e-8a20-5efd223fa1e3', '8929fb03-4144-4f8a-adbd-f11339df4f54'),
('2c684ab8-8549-45fe-a70c-5c6e4e9fff75', 1, NULL, NULL, '5d06cd15-0efb-456c-9b10-d1685157c4de', '09554eb3-17f2-4a5e-b23b-06f858a4ab5e'),
('2f04c8a7-a661-46b2-b1eb-9504a8e4eb97', 5, 3710000, '1', 'c81efd8a-e61a-414e-8a20-5efd223fa1e3', 'c1def52c-3da2-41c3-8e67-830dd5740f00'),
('31d28046-fc50-4bf3-9784-00e5adca3a2f', 1, NULL, NULL, '85d2d501-f9e5-4d91-97fc-06d95cad7cb3', '8afc47bf-c78c-11ea-8612-0492260b6292'),
('32b22f0e-016d-49ae-a726-f822077be73d', 5, 273000, '1', '6332f7d2-69a2-44af-8cb6-031d24964c76', 'ac290eed-9242-47c7-9655-d11bdfc9222c'),
('34dfab1d-ec8b-44af-8a3c-3e8c1357f256', 1, NULL, NULL, 'cea50238-fd2d-4a14-b0ed-e44dd48aca26', '09554eb3-17f2-4a5e-b23b-06f858a4ab5e'),
('36e0b0ba-b305-4ff1-b8e2-d67de560de84', 1, NULL, NULL, '5d06cd15-0efb-456c-9b10-d1685157c4de', 'd07f3ca7-321c-43b7-b57b-f9d922004dbc'),
('3914f761-15a4-45a6-b1fc-ca47f37ac708', 1, 3710000, '1', '82d53806-dd88-4641-84e8-61bf7a2aff08', 'c1def52c-3da2-41c3-8e67-830dd5740f00'),
('3d6dc313-6fdf-43d0-bc8a-93c589308ef8', 1, NULL, NULL, '85d2d501-f9e5-4d91-97fc-06d95cad7cb3', '09554eb3-17f2-4a5e-b23b-06f858a4ab5e'),
('3edc17d5-8147-4d82-817b-417dec93ae2d', 1, NULL, NULL, 'cea50238-fd2d-4a14-b0ed-e44dd48aca26', 'a8210235-7e33-473c-aa2e-075e407d9913'),
('42f034ac-b45f-41c2-98f1-c38ef03d20ce', 1, NULL, NULL, '25b12a80-36bd-4bbd-8bac-ceefc0e4790b', 'd07f3ca7-321c-43b7-b57b-f9d922004dbc'),
('4390334b-4ec1-499d-ad21-53a4efec9c12', 5, NULL, NULL, 'c81efd8a-e61a-414e-8a20-5efd223fa1e3', '87582bef-9d4c-4721-9b2b-d2371d12e757'),
('4775012d-5a7d-4cfa-86b9-3386d91dadb8', 1, NULL, NULL, 'cea50238-fd2d-4a14-b0ed-e44dd48aca26', 'd07f3ca7-321c-43b7-b57b-f9d922004dbc'),
('478f5293-0835-4654-afc8-cad445b1952d', 1, 273000, '1', 'b422822b-59e2-447e-bda9-1696f2a7a05d', 'ac290eed-9242-47c7-9655-d11bdfc9222c'),
('4798838c-6478-4529-9930-714e96465f8a', 1, NULL, NULL, 'fa75fa58-6c68-4d96-8b1c-bc90b352975d', '2ce78d6c-7bb7-4eca-8143-409eb5dfd3c6'),
('49c168d4-3767-41ba-aef1-a27b44063225', 1, NULL, NULL, 'cea50238-fd2d-4a14-b0ed-e44dd48aca26', '1fa12812-8b25-4944-b137-53fc3139a308'),
('4c0e4824-cb2d-417d-b43b-c8612f6512b7', 21, NULL, NULL, '7aacab60-967b-4e1f-957c-41fcd42ff962', '8afc47bf-c78c-11ea-8612-0492260b6292'),
('4da5716f-2f3f-4ccd-b7a5-7d4f4f4bcf69', 1, NULL, NULL, '25b12a80-36bd-4bbd-8bac-ceefc0e4790b', '1fa12812-8b25-4944-b137-53fc3139a308'),
('5894375e-528d-405f-aaef-7d95c8bdaf18', 4, NULL, NULL, 'db58c5cb-a237-439d-afee-c823ce05c67e', '8929fb03-4144-4f8a-adbd-f11339df4f54'),
('5a90da53-38f1-4b6f-9aec-9b3b1bd1cb2c', 1, 273000, '1', '8bd203fb-4547-4077-b11d-a400b7e221bd', 'ac290eed-9242-47c7-9655-d11bdfc9222c'),
('5ac90b5c-7e9a-4baa-b104-2f0bbafaa5f9', 1, NULL, NULL, '5d06cd15-0efb-456c-9b10-d1685157c4de', 'a8210235-7e33-473c-aa2e-075e407d9913'),
('5eb300a8-6789-4b2b-befa-fcb1f66e62a4', 1, NULL, NULL, '25b12a80-36bd-4bbd-8bac-ceefc0e4790b', '09554eb3-17f2-4a5e-b23b-06f858a4ab5e'),
('61a2cdf0-a029-4acd-852e-e03e408f8bbf', 1, 273000, '1', 'c81efd8a-e61a-414e-8a20-5efd223fa1e3', 'ac290eed-9242-47c7-9655-d11bdfc9222c'),
('63070198-7a7d-4108-adbe-806d3f52c2f9', 1, NULL, NULL, 'c81efd8a-e61a-414e-8a20-5efd223fa1e3', '989a5a78-7144-4489-9731-058e62d9b787'),
('64593f1c-b349-4962-a46e-df8d79e7b364', 1, NULL, NULL, 'cea50238-fd2d-4a14-b0ed-e44dd48aca26', '989a5a78-7144-4489-9731-058e62d9b787'),
('6815ef64-c299-405b-b2e7-62105a24c314', 1, NULL, NULL, '25b12a80-36bd-4bbd-8bac-ceefc0e4790b', '13420404-44d0-4f05-baf3-6ad5ded51470'),
('68ef0620-db00-4e03-bdee-b9cc0cfe6d71', 1, 3710000, '1', '05f72731-494b-40ec-bc64-b51fcc1b37eb', 'c1def52c-3da2-41c3-8e67-830dd5740f00'),
('6d7fa644-b001-4503-9bb6-26adb1362b8d', 1, NULL, NULL, 'db58c5cb-a237-439d-afee-c823ce05c67e', '8afc47bf-c78c-11ea-8612-0492260b6292'),
('6de8be15-8d60-480c-bb49-6bd0e9b956c3', 1, NULL, NULL, 'b9ee4183-a620-4c69-a835-df74f6c2ab2e', 'e37b57c3-ef49-4280-95fd-fc03bbea6c60'),
('6f9d8501-e5c4-416b-90b2-a9b002b9b531', 1, NULL, NULL, '25b12a80-36bd-4bbd-8bac-ceefc0e4790b', 'a8210235-7e33-473c-aa2e-075e407d9913'),
('7364ca6d-ac93-4f03-b69f-74a4fba25237', 1, 3710000, '1', '9c104832-b382-4e41-92b8-ec4b3c9a19c0', 'c1def52c-3da2-41c3-8e67-830dd5740f00'),
('7aa11112-1a2b-40da-8721-67a2019cfac5', 35, NULL, NULL, 'b3358915-ee68-4718-b525-bd9837f40307', '0d63e5c4-15da-4570-bd62-cfc9b0549e2e'),
('7d6910a1-b2f4-412e-bef4-12fbd0469de7', 2, NULL, NULL, '0964ef73-89fe-46c9-bfe6-0c86bbabd545', '8afc47bf-c78c-11ea-8612-0492260b6292'),
('7fa9e6e8-de22-47d6-9d67-8bd9fda0136d', 1, NULL, NULL, 'fa75fa58-6c68-4d96-8b1c-bc90b352975d', 'e37b57c3-ef49-4280-95fd-fc03bbea6c60'),
('8145c3a6-e1ca-45eb-8470-23b82b1fd58e', 1, NULL, NULL, '82d53806-dd88-4641-84e8-61bf7a2aff08', '989a5a78-7144-4489-9731-058e62d9b787'),
('822720eb-7dbc-48d5-97ae-2ec413ca0f31', 2, 3710000, '1', '6332f7d2-69a2-44af-8cb6-031d24964c76', 'c1def52c-3da2-41c3-8e67-830dd5740f00'),
('82d32794-5038-4ffc-a954-cfe98492f410', 1, NULL, NULL, 'c81efd8a-e61a-414e-8a20-5efd223fa1e3', 'ef85f6c1-3980-43d3-aa61-e0d7daadcbd3'),
('8641da5e-5df2-4a2f-8a7f-38efaf2f7ab9', 3, NULL, NULL, '6332f7d2-69a2-44af-8cb6-031d24964c76', '8929fb03-4144-4f8a-adbd-f11339df4f54'),
('878fdf59-1fbc-4eb8-a1e2-e78d7ce83ba4', 1, NULL, NULL, '7aacab60-967b-4e1f-957c-41fcd42ff962', '7905b2cb-ea32-437d-a8df-b30464896321'),
('87a1ea37-ea80-458b-8368-d5a573bec731', 6, NULL, NULL, '84eed610-bec4-4156-8122-5bb7bfa6808f', '97fb2ccb-d0b5-11ea-99dd-0492260b6292'),
('8ad2c24f-ccc9-473f-a920-c84f2ac1744d', 2, 3710000, '1', '7aacab60-967b-4e1f-957c-41fcd42ff962', 'c1def52c-3da2-41c3-8e67-830dd5740f00'),
('8cfe6749-356d-4085-b71f-5d88f892e82e', 1, NULL, NULL, 'c81efd8a-e61a-414e-8a20-5efd223fa1e3', '8afc47bf-c78c-11ea-8612-0492260b6292'),
('8e176e33-d1e6-4f74-a6a8-af9007736831', 1, 273000, '1', 'db58c5cb-a237-439d-afee-c823ce05c67e', 'ac290eed-9242-47c7-9655-d11bdfc9222c'),
('94860419-1bd4-4c74-8205-b0f3297fad00', 1, NULL, NULL, 'fb6260cc-d7a7-48ef-9a6b-7374d4b60283', '153b4f17-b39d-4c80-941e-698bdef5877c'),
('975f9443-b936-42e6-b595-4cda4cc9836c', 1, NULL, NULL, 'b9ee4183-a620-4c69-a835-df74f6c2ab2e', '4647b247-ef60-4747-a25e-7320075b802a'),
('9abb9c01-f67f-4c4f-aff2-89caa2ac0bc3', 3, NULL, NULL, '715ebd09-8b60-4092-8c12-0904bb47209b', '87582bef-9d4c-4721-9b2b-d2371d12e757'),
('9ba64114-b145-49e7-b2d9-4d043773e72f', 23, NULL, NULL, 'b47e9d19-5996-4aeb-829e-69358700013b', '97fb2ccb-d0b5-11ea-99dd-0492260b6292'),
('a1f7fb10-bdd3-432b-a004-c1ee8b56a51e', 1, NULL, NULL, '82d53806-dd88-4641-84e8-61bf7a2aff08', '7905b2cb-ea32-437d-a8df-b30464896321'),
('a51bb2d4-86d3-4fa5-a68b-638be4875a47', 1, NULL, NULL, '8bd203fb-4547-4077-b11d-a400b7e221bd', '912a879f-025c-463a-a0ec-4401778a83e4'),
('a9bdcced-fcc8-4e01-a2e8-d4a7148a18ee', 1, NULL, NULL, '69b225f0-9a4a-4fe8-830a-179ad1344418', '87582bef-9d4c-4721-9b2b-d2371d12e757'),
('aa54f7bf-0c0d-4e76-98f6-793a8c9a6ad5', 1, NULL, NULL, '715ebd09-8b60-4092-8c12-0904bb47209b', 'e5a05918-e989-4507-b4ca-de58011fe1ac'),
('aaf9d32c-42dc-44ae-a0e1-8aecb9c04c11', 8, NULL, NULL, '49030e7c-fbb2-4d30-a5d9-ac88770884f0', 'e5a05918-e989-4507-b4ca-de58011fe1ac'),
('aeb890ba-1289-4087-b7f3-13aab9a5cc31', 4, NULL, NULL, 'bb27ae19-676b-4966-8d9e-28011af7d0a9', '97fb2ccb-d0b5-11ea-99dd-0492260b6292'),
('b7f78fee-9080-4ca4-a775-bc16ad9005bb', 1, NULL, NULL, '8bd203fb-4547-4077-b11d-a400b7e221bd', 'd070ab93-768f-49c8-b652-9220142cc357'),
('b89d695f-fa7f-435d-8289-6fffcf92946e', 10, NULL, NULL, 'b3358915-ee68-4718-b525-bd9837f40307', '153b4f17-b39d-4c80-941e-698bdef5877c'),
('b90b3d96-17bd-4049-9ed2-2c4ce9e280e5', 4, 3710000, '1', '25b12a80-36bd-4bbd-8bac-ceefc0e4790b', 'c1def52c-3da2-41c3-8e67-830dd5740f00'),
('bfb6003b-ade5-445f-a238-34987f5bec21', 1, NULL, NULL, 'e04c3754-89ad-4331-a70a-29f97a34b80a', '8afc47bf-c78c-11ea-8612-0492260b6292'),
('c3323026-ac1a-4695-8e7a-ffc08d1582f6', 1, NULL, NULL, 'b9ee4183-a620-4c69-a835-df74f6c2ab2e', '11a277d7-ddb6-4b36-acfb-b7b306aa641a'),
('c4a28fdb-1c63-4eaa-a801-68beddd37421', 5, NULL, NULL, 'c81efd8a-e61a-414e-8a20-5efd223fa1e3', 'd42cff66-b76a-4c1f-a265-cc0eb4b2468b'),
('c54e0152-e515-431c-90c5-80a68285859d', 1, NULL, NULL, '8bd203fb-4547-4077-b11d-a400b7e221bd', '115bd829-f24e-485d-8e4d-580e26dc03aa'),
('c6329523-f0c6-445c-9b60-e29e1caab49f', 1, NULL, NULL, 'fb6260cc-d7a7-48ef-9a6b-7374d4b60283', '0d63e5c4-15da-4570-bd62-cfc9b0549e2e'),
('ca008e3e-2a57-46e8-87ca-aabb89299b6f', 1, NULL, NULL, '5d06cd15-0efb-456c-9b10-d1685157c4de', '989a5a78-7144-4489-9731-058e62d9b787'),
('d4d153b7-2caa-47c7-bc4e-fffcfe90396d', 1, NULL, NULL, '82d53806-dd88-4641-84e8-61bf7a2aff08', '09554eb3-17f2-4a5e-b23b-06f858a4ab5e'),
('d51fb3dc-34c0-4203-9786-8acdad112cbe', 1, NULL, NULL, '40fdb321-600c-4d65-9b2b-30e40b7f92bc', 'e5a05918-e989-4507-b4ca-de58011fe1ac'),
('d6691c49-5a86-45f6-a623-f8ae69393c97', 1, NULL, NULL, '25b12a80-36bd-4bbd-8bac-ceefc0e4790b', '7905b2cb-ea32-437d-a8df-b30464896321'),
('d7fda28c-4127-4943-98e5-921af74a74f9', 1, NULL, NULL, '5d06cd15-0efb-456c-9b10-d1685157c4de', '7905b2cb-ea32-437d-a8df-b30464896321'),
('d842fa50-2e27-40a7-ba5a-e6472140eb0b', 2, NULL, NULL, 'c81efd8a-e61a-414e-8a20-5efd223fa1e3', '7905b2cb-ea32-437d-a8df-b30464896321'),
('e18d3941-b67f-402e-9157-a104c4a65808', 1, NULL, NULL, 'b9ee4183-a620-4c69-a835-df74f6c2ab2e', '8d003e24-c95c-4d8f-8326-1d234c26e871'),
('e251e2a5-58ee-4c38-8d1b-e85b3d60d1ea', 2, NULL, NULL, '6332f7d2-69a2-44af-8cb6-031d24964c76', '8afc47bf-c78c-11ea-8612-0492260b6292'),
('e2bdacfa-0d8e-4ae3-9d09-7f3b94bc9518', 1, NULL, NULL, '8bd203fb-4547-4077-b11d-a400b7e221bd', '0d63e5c4-15da-4570-bd62-cfc9b0549e2e'),
('e2f74d0c-5baf-4ab0-afef-82e571790cfd', 1, NULL, NULL, '8bd203fb-4547-4077-b11d-a400b7e221bd', 'd933d43b-a2d6-4f90-b4d9-4a9c491c79d4'),
('e35c44da-f814-47b6-908f-38c747935a18', 26, NULL, NULL, '5d06cd15-0efb-456c-9b10-d1685157c4de', '8afc47bf-c78c-11ea-8612-0492260b6292'),
('eaab9f88-cd92-4f53-8ceb-f41a22d8e372', 1, NULL, NULL, 'fa75fa58-6c68-4d96-8b1c-bc90b352975d', '87582bef-9d4c-4721-9b2b-d2371d12e757'),
('ec1d85f2-978c-4e35-831a-0e3e6c8444e5', 1, NULL, NULL, '8bd203fb-4547-4077-b11d-a400b7e221bd', 'd42cff66-b76a-4c1f-a265-cc0eb4b2468b'),
('f56050d4-499c-44fb-ae12-36aa28c0751a', 1, NULL, NULL, 'db58c5cb-a237-439d-afee-c823ce05c67e', 'e5a05918-e989-4507-b4ca-de58011fe1ac'),
('fb4e738e-6462-4eec-8dfd-204310da8b3c', 2, NULL, NULL, '6332f7d2-69a2-44af-8cb6-031d24964c76', '87582bef-9d4c-4721-9b2b-d2371d12e757'),
('fbcbc33d-6000-4cec-a819-66093e1e0e7e', 1, 3710000, '1', '5d06cd15-0efb-456c-9b10-d1685157c4de', 'c1def52c-3da2-41c3-8e67-830dd5740f00'),
('fcdb4e68-3dff-491a-9328-a6b0dfe55b34', 2, NULL, NULL, 'c81efd8a-e61a-414e-8a20-5efd223fa1e3', 'a8210235-7e33-473c-aa2e-075e407d9913'),
('fce918e0-b825-455f-8103-c31067b6d1f5', 1, NULL, NULL, '8bd203fb-4547-4077-b11d-a400b7e221bd', 'cd494ae9-77ad-45a3-a5a6-0bc1aa044132'),
('fd7d7ef9-6d6c-46e2-b34f-7b33b7dfa10a', 1, NULL, NULL, 'db58c5cb-a237-439d-afee-c823ce05c67e', 'ef85f6c1-3980-43d3-aa61-e0d7daadcbd3'),
('ffa8fd08-04e2-43c4-9584-4d0526cdbb06', 8, NULL, NULL, '7aacab60-967b-4e1f-957c-41fcd42ff962', '1fa12812-8b25-4944-b137-53fc3139a308');

--
-- Triggers `order_detail`
--
DROP TRIGGER IF EXISTS `trg_update_perfume`;
DELIMITER $$
CREATE TRIGGER `trg_update_perfume` AFTER INSERT ON `order_detail` FOR EACH ROW BEGIN
	-- Update perfume quantity
    UPDATE perfume
    SET perfume.quantity = perfume.quantity - NEW.quantity
    WHERE perfume.id = NEW.perfumeId;
	-- Update discount quantity
    IF NEW.discountId is not null THEN
            UPDATE discount
            SET	discount.quantityLimit = discount.quantityLimit - NEW.quantity
            WHERE discount.id = NEW.discountId;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `perfume`
--

DROP TABLE IF EXISTS `perfume`;
CREATE TABLE IF NOT EXISTS `perfume` (
  `id` varchar(255) NOT NULL,
  `price` int(255) NOT NULL,
  `quantity` int(255) UNSIGNED NOT NULL,
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
('00d8e43a-a5be-484d-8afc-f4771abc03ce', 15000000, 15, '30ml', 'f2e59c6c-1aaf-4471-9ab7-c572c535fcd6', '5e7e32e4-f55e-4f0e-94c7-2ec35af29094'),
('0740aae4-8c0d-4d74-af79-3d00bb8960d0', 1590000, 0, '30ml', '10c52f2a-4253-4f94-bd08-1b4bc6cbbe14', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('09554eb3-17f2-4a5e-b23b-06f858a4ab5e', 2120000, 13, '40ml', '10c52f2a-4253-4f94-bd08-1b4bc6cbbe14', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('0d63e5c4-15da-4570-bd62-cfc9b0549e2e', 520000, 0, '20ml', '0d4cddce-6736-4a5e-8164-7b386e274ca6', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('115bd829-f24e-485d-8e4d-580e26dc03aa', 780000, 10, '30ml', '0d4cddce-6736-4a5e-8164-7b386e274ca6', '50b96132-063e-4106-93aa-a356c07571ac'),
('11a277d7-ddb6-4b36-acfb-b7b306aa641a', 2625000, 49, '75ml', '9ebd7376-0624-4a27-832d-42c36b6a5f25', '50b96132-063e-4106-93aa-a356c07571ac'),
('13420404-44d0-4f05-baf3-6ad5ded51470', 2915000, 20, '55ml', '10c52f2a-4253-4f94-bd08-1b4bc6cbbe14', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('153b4f17-b39d-4c80-941e-698bdef5877c', 520000, 0, '20ml', '0d4cddce-6736-4a5e-8164-7b386e274ca6', '50b96132-063e-4106-93aa-a356c07571ac'),
('1fa12812-8b25-4944-b137-53fc3139a308', 1855000, 21, '35ml', '10c52f2a-4253-4f94-bd08-1b4bc6cbbe14', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('20646206-64f4-41d1-949e-0de0b297d0f9', 348450, 68, '50ml', '7ad9167b-c6d1-49e4-9570-b21284f6f850', '5e7e32e4-f55e-4f0e-94c7-2ec35af29094'),
('231f5c1d-a3dd-4c9a-a28a-bb43dcce7481', 452985, 69, '65ml', '7ad9167b-c6d1-49e4-9570-b21284f6f850', '5e7e32e4-f55e-4f0e-94c7-2ec35af29094'),
('2ce78d6c-7bb7-4eca-8143-409eb5dfd3c6', 5590000, 2, '65ml', 'daaf7144-d46d-49e7-8b52-9b32e50fc3ac', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('3a1c86dd-2708-4ddf-a934-7d8c4a7079ef', 1590000, 0, '30ml', '10c52f2a-4253-4f94-bd08-1b4bc6cbbe14', '50b96132-063e-4106-93aa-a356c07571ac'),
('41582b7e-0ee6-42b5-afdb-1e61dc1fe433', 315000, 0, '15ml', '6e859de0-db81-46af-9150-ef1a96097122', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('4647b247-ef60-4747-a25e-7320075b802a', 5000000, 50, '100ml', '8a768df2-2af0-4cd6-b291-a35a1c38ab79', '5e7e32e4-f55e-4f0e-94c7-2ec35af29094'),
('4ceec76a-1e6e-4112-9d21-7d751f8ef279', 1590000, 0, '30ml', '10c52f2a-4253-4f94-bd08-1b4bc6cbbe14', '5e7e32e4-f55e-4f0e-94c7-2ec35af29094'),
('5a297b1d-d3da-4eab-94a8-f0f8dbcd0527', 2600000, 69, '100ml', '0d4cddce-6736-4a5e-8164-7b386e274ca6', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('6e5fdc71-d0b5-11ea-99dd-0492260b6292', 29700000, 69, '30ml', 'f97d3f62-4e4d-48f3-921c-1905ed6c4637', '50b96132-063e-4106-93aa-a356c07571ac'),
('7905b2cb-ea32-437d-a8df-b30464896321', 795000, 13, '15ml', '10c52f2a-4253-4f94-bd08-1b4bc6cbbe14', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('87582bef-9d4c-4721-9b2b-d2371d12e757', 180000, 10, '15ml', '644687c6-cd92-451a-a9ec-5d7cb3cab960', '50b96132-063e-4106-93aa-a356c07571ac'),
('8929fb03-4144-4f8a-adbd-f11339df4f54', 2600000, 5, '100ml', '0d4cddce-6736-4a5e-8164-7b386e274ca6', '50b96132-063e-4106-93aa-a356c07571ac'),
('8afc47bf-c78c-11ea-8612-0492260b6292', 99000000, 86, '100ml', 'f97d3f62-4e4d-48f3-921c-1905ed6c4637', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('8d003e24-c95c-4d8f-8326-1d234c26e871', 1508000, 50, '20ml', 'b25a46d7-095c-4fec-aea5-bb6f2605190e', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('912a879f-025c-463a-a0ec-4401778a83e4', 1300000, 10, '50ml', '0d4cddce-6736-4a5e-8164-7b386e274ca6', '50b96132-063e-4106-93aa-a356c07571ac'),
('91c8cf83-a239-412e-9bbc-8fb9917e1b08', 5300000, 1, '100ml', '10c52f2a-4253-4f94-bd08-1b4bc6cbbe14', '50b96132-063e-4106-93aa-a356c07571ac'),
('97fb2ccb-d0b5-11ea-99dd-0492260b6292', 2036250, 72, '75ml', 'aa573c27-74df-4b8c-bf51-53a1f8364047', '50b96132-063e-4106-93aa-a356c07571ac'),
('989a5a78-7144-4489-9731-058e62d9b787', 3975000, 12, '75ml', '10c52f2a-4253-4f94-bd08-1b4bc6cbbe14', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('9fd1e832-a872-49c0-a4c2-c225d491e9ef', 104535, 1, '15ml', '7ad9167b-c6d1-49e4-9570-b21284f6f850', '50b96132-063e-4106-93aa-a356c07571ac'),
('a8210235-7e33-473c-aa2e-075e407d9913', 2650000, 11, '50ml', '10c52f2a-4253-4f94-bd08-1b4bc6cbbe14', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('ac290eed-9242-47c7-9655-d11bdfc9222c', 390000, 7, '15ml', '0d4cddce-6736-4a5e-8164-7b386e274ca6', '50b96132-063e-4106-93aa-a356c07571ac'),
('b767aa02-4bd3-4fb1-86d0-23f0c82f8e74', 1060000, 0, '20ml', '10c52f2a-4253-4f94-bd08-1b4bc6cbbe14', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('c1def52c-3da2-41c3-8e67-830dd5740f00', 5300000, 34, '100ml', '10c52f2a-4253-4f94-bd08-1b4bc6cbbe14', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('cd494ae9-77ad-45a3-a5a6-0bc1aa044132', 1690000, 9, '65ml', '0d4cddce-6736-4a5e-8164-7b386e274ca6', '50b96132-063e-4106-93aa-a356c07571ac'),
('d070ab93-768f-49c8-b652-9220142cc357', 910000, 10, '35ml', '0d4cddce-6736-4a5e-8164-7b386e274ca6', '50b96132-063e-4106-93aa-a356c07571ac'),
('d07f3ca7-321c-43b7-b57b-f9d922004dbc', 3445000, 13, '65ml', '10c52f2a-4253-4f94-bd08-1b4bc6cbbe14', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('d42cff66-b76a-4c1f-a265-cc0eb4b2468b', 1040000, 5, '40ml', '0d4cddce-6736-4a5e-8164-7b386e274ca6', '50b96132-063e-4106-93aa-a356c07571ac'),
('d933d43b-a2d6-4f90-b4d9-4a9c491c79d4', 1430000, 10, '55ml', '0d4cddce-6736-4a5e-8164-7b386e274ca6', '50b96132-063e-4106-93aa-a356c07571ac'),
('dda8edfb-1430-4968-9678-0dbd81b2a97c', 5300000, 15, '100ml', '10c52f2a-4253-4f94-bd08-1b4bc6cbbe14', '5e7e32e4-f55e-4f0e-94c7-2ec35af29094'),
('e012ee6e-52bc-4093-bd25-951c4bd7512e', 2600000, 12, '100ml', '0d4cddce-6736-4a5e-8164-7b386e274ca6', '5e7e32e4-f55e-4f0e-94c7-2ec35af29094'),
('e37b57c3-ef49-4280-95fd-fc03bbea6c60', 5590000, 2, '65ml', 'daaf7144-d46d-49e7-8b52-9b32e50fc3ac', '50b96132-063e-4106-93aa-a356c07571ac'),
('e5a05918-e989-4507-b4ca-de58011fe1ac', 180000, 20, '15ml', '644687c6-cd92-451a-a9ec-5d7cb3cab960', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('ef85f6c1-3980-43d3-aa61-e0d7daadcbd3', 1950000, 8, '75ml', '0d4cddce-6736-4a5e-8164-7b386e274ca6', '50b96132-063e-4106-93aa-a356c07571ac'),
('f33f3ce3-4623-45eb-b2bd-bda5ebfa915b', 780000, 10, '30ml', '0d4cddce-6736-4a5e-8164-7b386e274ca6', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('ff11254e-0d49-4b81-ba1e-f3e88c0357ba', 5590000, 2, '65ml', 'daaf7144-d46d-49e7-8b52-9b32e50fc3ac', '5e7e32e4-f55e-4f0e-94c7-2ec35af29094');

-- --------------------------------------------------------

--
-- Table structure for table `perfume_detail`
--

DROP TABLE IF EXISTS `perfume_detail`;
CREATE TABLE IF NOT EXISTS `perfume_detail` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `price` int(255) NOT NULL,
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

INSERT INTO `perfume_detail` (`id`, `name`, `image`, `price`, `description`, `style`, `gender`, `musk`, `lastLong`, `releasedAt`, `comeFrom`, `status`, `brandId`) VALUES
('0d4cddce-6736-4a5e-8164-7b386e274ca6', 'Channel N5', 'https://res.cloudinary.com/dza0es8zq/image/upload/v1594110790/Nuoc-hoa-CHANEL-N5-Red-Limited-Edition-Vivalust.vn-1-_sqtipt.jpg', 26000, 'aaaaa', 'Nhảm nhí nhảm nhí', 0, 'Cực kì nhảm nhí', '18 hours', '2020-06-24T17:00:00.000Z', 'Nhảm nhí land', 1, '97a8f0cf-2dce-4728-ba3f-a9ea13b11bbf'),
('10c52f2a-4253-4f94-bd08-1b4bc6cbbe14', 'Channel Narciso', 'https://res.cloudinary.com/dza0es8zq/image/upload/v1594110852/Nuoc-hoa-Narciso-phupngphuongshop-1_krekzv.jpg', 53000, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit odio tenetur libero et delectus alias laudantium magnam iusto deleniti vero adipisci itaque in similique, rem quis maxime. Quia, neque autem.', 'Phong cách trưởng thành', 1, 'mùi hương mùi hương mùi hương mùi hương', '18 hours', '2020-06-25T17:00:00.000Z', 'Trưởng thành land', 1, '97a8f0cf-2dce-4728-ba3f-a9ea13b11bbf'),
('644687c6-cd92-451a-a9ec-5d7cb3cab960', 'Channel Energy', 'https://res.cloudinary.com/dza0es8zq/image/upload/v1594110883/U8Vu9fW9qlzFF-Q9BuTSdCjqcXxz7vkLgoKfnfdkTAXY_fTbX3lQa-AbKrztHY_OpVpYr-DFBo0jj1LehrB8JJstIa6hCrCs8Qssl5epjTzm67gJc1iGeDtIn3eH-QlKMqqIx75fOWgIwq7Qew_mxzn97.png', 12000, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit odio tenetur libero et delectus alias laudantium magnam iusto deleniti vero adipisci itaque in similique, rem quis maxime. Quia, neque autem.', 'Nhảm nhí nhảm nhí', 0, 'Cực kì nhảm nhí', '18 hours', '2020-06-24T17:00:00.000Z', 'Nhảm nhí land', 1, '97a8f0cf-2dce-4728-ba3f-a9ea13b11bbf'),
('6e859de0-db81-46af-9150-ef1a96097122', 'D&G The Perfume', 'https://res.cloudinary.com/dza0es8zq/image/upload/v1594110912/N_C6_B0_E1_BB_9Bc-hoa-Dior-Addict-Eau-Fraiche-Eau-De-Toilette_uzlske.png', 21000, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit odio tenetur libero et delectus alias laudantium magnam iusto deleniti vero adipisci itaque in similique, rem quis maxime. Quia, neque autem.', 'Năng động', 2, 'Thơm phức', '13 hours', '2020-04-01T17:00:00.000Z', 'Korea', 1, 'c46cb58c-ea14-4c3e-898a-04bc527e0f65'),
('7ad9167b-c6d1-49e4-9570-b21284f6f850', 'Nước Hoa Test', 'http://res.cloudinary.com/dza0es8zq/image/upload/v1596619350/hqzrtkdnssrpymfdirda.jpg', 6969, 'lorem ipsum', '69', 2, '69', '6912', '1984-06-01T17:00:00.000Z', '69', 0, 'ef07ffeb-f02b-4700-b806-b17b07617ee4'),
('8a768df2-2af0-4cd6-b291-a35a1c38ab79', 'Jo Malone BVLGari', 'https://res.cloudinary.com/dza0es8zq/image/upload/v1594110921/1574299146-999-review-7-chai-nuoc-hoa-giup-cac-chang-hut-phai-dep-ngay-lap-tuc-1-1574246295-width650height390_sl9bwq.jpg', 50000, 'Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nước hoa E Nư', 'Lịch lãm', 1, 'Mùi đặc trưng', '12 hours', '2020-04-02T17:00:00.000Z', 'America', 1, 'cb1f177a-77d7-4379-89f7-6ebd47232383'),
('9ebd7376-0624-4a27-832d-42c36b6a5f25', 'D&G Miss Dior', 'https://res.cloudinary.com/dza0es8zq/image/upload/v1594110957/nuoc-hoa-ban-chay-nhat_swctzq.png', 35000, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit odio tenetur libero et delectus alias laudantium magnam iusto deleniti vero adipisci itaque in similique, rem quis maxime. Quia, neque autem.', 'Phong cách quý sờ tộc', 1, 'Mùi hương nam tính lịch lãm', '18 hours', '2020-06-25T17:00:00.000Z', 'Quý sờ tộc', 1, 'c46cb58c-ea14-4c3e-898a-04bc527e0f65'),
('aa573c27-74df-4b8c-bf51-53a1f8364047', 'Gucci Scandal', 'https://res.cloudinary.com/dza0es8zq/image/upload/v1594110975/nuoc-hoa-scandal---jean-paul-gaultier_b91749e67fd64ccf9b5932af3f67f03d_master_tm93zj.jpg', 27150, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit odio tenetur libero et delectus alias laudantium magnam iusto deleniti vero adipisci itaque in similique, rem quis maxime. Quia, neque autem.', 'Xì tin', 0, 'Mùi hương nồng nàn', '12 hours', '2020-04-01T17:00:00.000Z', 'Vietnam', 1, '2b34f1b4-03b8-4807-934b-5a9e19ca3296'),
('b25a46d7-095c-4fec-aea5-bb6f2605190e', 'Jo Malone Mita Pansy', 'https://res.cloudinary.com/dza0es8zq/image/upload/v1594110988/nuoc-hoa-phap-1_bmi9tv.png', 75400, 'Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nước hoa F Nư', 'Phong cách A', 2, 'Mùi của F', '16 hours', '2020-04-02T17:00:00.000Z', 'Brazil', 1, 'cb1f177a-77d7-4379-89f7-6ebd47232383'),
('daaf7144-d46d-49e7-8b52-9b32e50fc3ac', 'Jo Malone Charme Cool Water', 'https://res.cloudinary.com/dza0es8zq/image/upload/v1594111007/newly-perfume-nha-phan-phoi-nuoc-hoa-charme-cool-water-chinh-hang-uy-tin_athdfz.jpg', 86000, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit odio tenetur libero et delectus alias laudantium magnam iusto deleniti vero adipisci itaque in similique, rem quis maxime. Quia, neque autem.', 'Trẻ trung', 1, 'Quyến rũ', '10 hours', '2020-04-01T17:00:00.000Z', 'Japan', 1, 'cb1f177a-77d7-4379-89f7-6ebd47232383'),
('f2e59c6c-1aaf-4471-9ab7-c572c535fcd6', 'Gucci Charme', 'https://res.cloudinary.com/dza0es8zq/image/upload/v1594111032/nuoc-hoa-nu-charme-scandal-de-paris-100ml-made-in-france-1_drpn3f.jpg', 500000, 'Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nước hoa D Nư', 'Tự tin khoe cá tính', 1, 'Mùi hoa', '24 hours', '2020-04-02T17:00:00.000Z', 'Russian', 1, '2b34f1b4-03b8-4807-934b-5a9e19ca3296'),
('f97d3f62-4e4d-48f3-921c-1905ed6c4637', 'Channel GentleMan', 'https://res.cloudinary.com/dza0es8zq/image/upload/v1594111046/nuoc_20hoa_20givenchy_20gentleman-700x850_kr4pqg.jpg', 990000, 'Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nước hoa G Nư', 'Gascascascasasdasdasd', 0, '', '5 hours', '2020-04-05T17:00:00.000Z', 'England', 1, '97a8f0cf-2dce-4728-ba3f-a9ea13b11bbf');

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
('5e7e32e4-f55e-4f0e-94c7-2ec35af29094', 'Nhà cung cấp C', 'cccccccccccccccccccccccccccccccccccccccccccccccc', '111111'),
('6d296e91-f11e-4c58-866b-4bdb6fc93fcb', 'Nhà cung cấp B', 'asdasdasdad', '11300');

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
  `producerId` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `producerId` (`producerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `createdAt`, `producerId`) VALUES
('1', '2020-07-16T05:27:37.920Z', '6d296e91-f11e-4c58-866b-4bdb6fc93fcb'),
('2', '2020-07-28T09:31:47.313Z', '50b96132-063e-4106-93aa-a356c07571ac');

-- --------------------------------------------------------

--
-- Table structure for table `transaction_detail`
--

DROP TABLE IF EXISTS `transaction_detail`;
CREATE TABLE IF NOT EXISTS `transaction_detail` (
  `id` varchar(255) NOT NULL,
  `quantity` int(255) NOT NULL,
  `sizeId` varchar(255) NOT NULL,
  `transactionId` varchar(255) NOT NULL,
  `perfumeDetailId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `transactionId` (`transactionId`),
  KEY `perfumeId` (`perfumeDetailId`),
  KEY `sizeId` (`sizeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `transaction_detail`
--

INSERT INTO `transaction_detail` (`id`, `quantity`, `sizeId`, `transactionId`, `perfumeDetailId`) VALUES
('1', 1, '15ml', '1', '6e859de0-db81-46af-9150-ef1a96097122'),
('2', 69, '100ml', '1', 'f97d3f62-4e4d-48f3-921c-1905ed6c4637'),
('3', 69, '30ml', '2', 'f97d3f62-4e4d-48f3-921c-1905ed6c4637'),
('4', 99, '75ml', '2', 'aa573c27-74df-4b8c-bf51-53a1f8364047');

--
-- Triggers `transaction_detail`
--
DROP TRIGGER IF EXISTS `trg_after_insert_update_perfume`;
DELIMITER $$
CREATE TRIGGER `trg_after_insert_update_perfume` AFTER INSERT ON `transaction_detail` FOR EACH ROW IF ( NOT EXISTS(
    SELECT * 
    FROM perfume 
    WHERE perfume.sizeId = NEW.sizeId and 
    perfume.perfumeDetailId = NEW.perfumeDetailId AND
    perfume.producerId = (
        select producerId 
        from `transaction` 
        where transaction.id = NEW.transactionId
    ) )
) THEN
    INSERT INTO `perfume` (
        id,
        price,
        quantity,
        perfumeDetailId,
        sizeId,
        producerId
    ) VALUES (
        UUID(),
        (
            CAST( REPLACE(NEW.sizeId, "ml", "") as UNSIGNED) * CAST((SELECT price from perfume_detail where perfume_detail.id = NEW.perfumeDetailId) as UNSIGNED)
        ),
        NEW.quantity,
        NEW.perfumeDetailId,
        NEW.sizeId,
        (SELECT producerId from transaction where transaction.id = NEW.transactionId)
    );
ELSE
    UPDATE perfume
    SET perfume.quantity = NEW.quantity + perfume.quantity
    WHERE 
    	perfume.sizeId = NEW.sizeId and 
        perfume.perfumeDetailId = NEW.perfumeDetailId and 
        perfume.producerId = (
            select producerId 
            from `transaction` 
            where transaction.id = NEW.transactionId
        );
END IF
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` varchar(255) NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
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

INSERT INTO `user` (`id`, `avatar`, `phone`, `firstName`, `lastName`, `password`, `email`, `dateOfBirth`, `address`, `status`, `point`, `createdAt`) VALUES
('821c093a-832e-421a-94a1-080128018d34', 'https://res.cloudinary.com/dza0es8zq/image/upload/v1594135226/eg1ht7nsby0fjldqaywl.png', '113', 'Phu', 'Trong', '$2b$10$UBcPJEOthY2hTFEXjN0m5uizUsDEqIcx1aPeOPLh.6UdY4OYSf/hW', 'trongphulk1998@gmail.com', '1998-11-26T00:00:00.000Z', '123456', 1, 0, '2020-06-29T07:11:35.622Z'),
('97c0fdc8-952b-4251-a30c-9e9a5d6fe9d1', 'http://res.cloudinary.com/dza0es8zq/image/upload/v1595011583/thiufaaeookvk3nwnwj5.jpg', '0123456789', 'node', 'mailer308', '$2b$10$DLrSVdHyx3TgTHoozFaGZ.jK3mBuLrWhsPec00KMKvvbJgG5VIABy', 'nodemailertest308@gmail.com', '2020-07-23T00:00:00.000Z', '4444', 1, 0, '2020-07-17T18:40:51.784Z'),
('e060bbe7-b6a8-41a1-b9fb-400817888ab2', 'http://res.cloudinary.com/dza0es8zq/image/upload/v1595995117/uj3udikftgcnfepugwzf.jpg', '0931830894', 'Vince', 'Lam', '$2b$10$C9a4yKjMzioe1HQCpKM0b.Pq1wTHhKPtDWuZzSS7mUEgvsFT0pMP.', 'vi.vinh0312@gmail.com', '1998-11-26T00:00:00.000Z', '123456', 1, 0, '2020-06-29T07:11:35.622Z');

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
-- Constraints for table `list_discount`
--
ALTER TABLE `list_discount`
  ADD CONSTRAINT `list_discount_ibfk_1` FOREIGN KEY (`discountId`) REFERENCES `discount` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `list_discount_ibfk_2` FOREIGN KEY (`perfumeDetailId`) REFERENCES `perfume_detail` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `list_discount_ibfk_3` FOREIGN KEY (`sizeId`) REFERENCES `size` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
  ADD CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`perfumeId`) REFERENCES `perfume` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
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
  ADD CONSTRAINT `transaction_detail_ibfk_2` FOREIGN KEY (`perfumeDetailId`) REFERENCES `perfume_detail` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_detail_ibfk_3` FOREIGN KEY (`transactionId`) REFERENCES `transaction` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_detail_ibfk_4` FOREIGN KEY (`sizeId`) REFERENCES `size` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
