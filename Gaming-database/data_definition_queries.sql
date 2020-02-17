-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: May 06, 2019 at 08:58 PM
-- Server version: 10.3.13-MariaDB-log
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs290_perryco`
--

-- --------------------------------------------------------

--
-- Table structure for table `Audience`
--

CREATE TABLE `Audience` (
  `Audience_ID` int(11) NOT NULL,
  `Audience_Age` int(11) NOT NULL,
  `Audience_Location` varchar(100) NOT NULL,
  `Audience_Gender` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `Audience`:
--

--
-- Dumping data for table `Audience`
--

INSERT INTO `Audience` (`Audience_ID`, `Audience_Age`, `Audience_Location`, `Audience_Gender`) VALUES
(1, 20, 'San Fransisco CA ', 'M'),
(2, 21, 'New York, NY', 'F');

-- --------------------------------------------------------

--
-- Table structure for table `Audience_Hardware`
--

CREATE TABLE `Audience_Hardware` (
  `Hardware_ID` int(11) NOT NULL,
  `Audience_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `Audience_Hardware`:
--

--
-- Dumping data for table `Audience_Hardware`
--

INSERT INTO `Audience_Hardware` (`Hardware_ID`, `Audience_ID`) VALUES
(1, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `Controls`
--

CREATE TABLE `Controls` (
  `Controls_ ID` int(11) NOT NULL,
  `Controls_Key_Board` tinyint(1) NOT NULL,
  `Controls_Mouse` tinyint(1) NOT NULL,
  `Controls_Controler` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `Controls`:
--

--
-- Dumping data for table `Controls`
--

INSERT INTO `Controls` (`Controls_ ID`, `Controls_Key_Board`, `Controls_Mouse`, `Controls_Controler`) VALUES
(1, 1, 0, 0),
(2, 0, 1, 0),
(3, 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Games`
--

CREATE TABLE `Games` (
  `Games_ID` int(2) NOT NULL,
  `Games_Game_title` varchar(500) NOT NULL,
  `Games_Relese_date` varchar(11) NOT NULL,
  `Games_Rating` char(5) NOT NULL,
  `Games_Current_Version` varchar(10) NOT NULL,
  `Games_Creators` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `Games`:
--

--
-- Dumping data for table `Games`
--

INSERT INTO `Games` (`Games_ID`, `Games_Game_title`, `Games_Relese_date`, `Games_Rating`, `Games_Current_Version`, `Games_Creators`) VALUES
(1, 'tester', '01/05/2018', 'E', '1.0', 'name of main character and some supporting cast'),
(2, 'tester2', '01/05/2018', 'E', '1.0', 'name of main character and some supporting cast');

-- --------------------------------------------------------

--
-- Table structure for table `Game_Game_Play`
--

CREATE TABLE `Game_Game_Play` (
  `Game_ID` int(11) NOT NULL,
  `Game_Game_Play_type` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `Game_Game_Play`:
--

--
-- Dumping data for table `Game_Game_Play`
--

INSERT INTO `Game_Game_Play` (`Game_ID`, `Game_Game_Play_type`) VALUES
(1, 0),
(2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Game_Hardware`
--

CREATE TABLE `Game_Hardware` (
  `Game_ID` int(11) NOT NULL,
  `Hardware_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `Game_Hardware`:
--

--
-- Dumping data for table `Game_Hardware`
--

INSERT INTO `Game_Hardware` (`Game_ID`, `Hardware_ID`) VALUES
(1, 2),
(2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Game_Play`
--

CREATE TABLE `Game_Play` (
  `Game_play_ID` int(11) NOT NULL,
  `Game_play_Camera_View` varchar(20) NOT NULL,
  `Game_Game_Play_type` tinyint(1) NOT NULL,
  `Game_play_Caracters` varchar(100) NOT NULL,
  `Game_play_Worlds` tinyint(1) NOT NULL,
  `Hardware_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `Game_Play`:
--

--
-- Dumping data for table `Game_Play`
--

INSERT INTO `Game_Play` (`Game_play_ID`, `Game_play_Camera_View`, `Game_Game_Play_type`, `Game_play_Caracters`, `Game_play_Worlds`, `Hardware_ID`) VALUES
(1, 'first person', 1, 'im bob and friends', 1, 1),
(2, 'third person', 0, 'jan dou and the ganag', 0, 2);

-- --------------------------------------------------------

--
-- Table structure for table `Genre`
--

CREATE TABLE `Genre` (
  `Genre_ID` int(11) NOT NULL,
  `Genre_Action` tinyint(1) NOT NULL,
  `Genre_Action-adventure` tinyint(1) NOT NULL,
  `Genre_Adventure` tinyint(1) NOT NULL,
  `Genre_Strategy` tinyint(1) NOT NULL,
  `Genre_Sport` tinyint(1) NOT NULL,
  `Genre_Party` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `Genre`:
--

--
-- Dumping data for table `Genre`
--

INSERT INTO `Genre` (`Genre_ID`, `Genre_Action`, `Genre_Action-adventure`, `Genre_Adventure`, `Genre_Strategy`, `Genre_Sport`, `Genre_Party`) VALUES
(1, 1, 1, 1, 0, 0, 0),
(2, 0, 0, 1, 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `Hardware`
--

CREATE TABLE `Hardware` (
  `Hardware_ID` int(11) NOT NULL,
  `Platformes_ID` int(11) NOT NULL,
  `Hardware_Game_Cartdge` varchar(100) NOT NULL,
  `Controls_ ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `Hardware`:
--

--
-- Dumping data for table `Hardware`
--

INSERT INTO `Hardware` (`Hardware_ID`, `Platformes_ID`, `Hardware_Game_Cartdge`, `Controls_ ID`) VALUES
(1, 1, 'disk', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Platformes`
--

CREATE TABLE `Platformes` (
  `Platformes_ID` int(11) NOT NULL,
  `Platformes_PC` tinyint(1) NOT NULL,
  `Platformes_XBOX_One` tinyint(1) NOT NULL,
  `Platformes_PS4` tinyint(1) NOT NULL,
  `Platformes_Switch` tinyint(1) NOT NULL,
  `Platformes_Wii_U` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELATIONSHIPS FOR TABLE `Platformes`:
--

--
-- Dumping data for table `Platformes`
--

INSERT INTO `Platformes` (`Platformes_ID`, `Platformes_PC`, `Platformes_XBOX_One`, `Platformes_PS4`, `Platformes_Switch`, `Platformes_Wii_U`) VALUES
(1, 1, 0, 0, 0, 0),
(2, 1, 0, 0, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Audience`
--
ALTER TABLE `Audience`
  ADD PRIMARY KEY (`Audience_ID`);

--
-- Indexes for table `Audience_Hardware`
--
ALTER TABLE `Audience_Hardware`
  ADD KEY `Hardware_ID` (`Hardware_ID`),
  ADD KEY `Audience_ID` (`Audience_ID`);

--
-- Indexes for table `Controls`
--
ALTER TABLE `Controls`
  ADD PRIMARY KEY (`Controls_ ID`);

--
-- Indexes for table `Games`
--
ALTER TABLE `Games`
  ADD PRIMARY KEY (`Games_ID`);

--
-- Indexes for table `Game_Game_Play`
--
ALTER TABLE `Game_Game_Play`
  ADD KEY `Game_ID` (`Game_ID`);

--
-- Indexes for table `Game_Hardware`
--
ALTER TABLE `Game_Hardware`
  ADD KEY `Game_ID` (`Game_ID`),
  ADD KEY `Hardware_ID` (`Hardware_ID`);

--
-- Indexes for table `Game_Play`
--
ALTER TABLE `Game_Play`
  ADD PRIMARY KEY (`Game_play_ID`),
  ADD KEY `Hardware_ID` (`Hardware_ID`);

--
-- Indexes for table `Genre`
--
ALTER TABLE `Genre`
  ADD PRIMARY KEY (`Genre_ID`);

--
-- Indexes for table `Hardware`
--
ALTER TABLE `Hardware`
  ADD PRIMARY KEY (`Hardware_ID`),
  ADD KEY `Platformes_ID` (`Platformes_ID`),
  ADD KEY `Controls_ ID` (`Controls_ ID`);

--
-- Indexes for table `Platformes`
--
ALTER TABLE `Platformes`
  ADD PRIMARY KEY (`Platformes_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Audience`
--
ALTER TABLE `Audience`
  MODIFY `Audience_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Genre`
--
ALTER TABLE `Genre`
  MODIFY `Genre_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Hardware`
--
ALTER TABLE `Hardware`
  MODIFY `Hardware_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Platformes`
--
ALTER TABLE `Platformes`
  MODIFY `Platformes_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
