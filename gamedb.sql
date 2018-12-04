DROP DATABASE IF EXISTS `gamedb`;
CREATE DATABASE `gamedb`;
USE `gamedb`;

-- gamedb_user aanmaken
CREATE USER 'gamedb_user'@'%' IDENTIFIED BY 'secret';
CREATE USER 'gamedb_user'@'localhost' IDENTIFIED BY 'secret';

-- geef in een keer alle rechten - soort administrator!
GRANT ALL ON `gamedb`.* TO 'gamedb_user'@'%';
GRANT ALL ON `gamedb`.* TO 'gamedb_user'@'localhost';

-- -----------------------------------------------------
-- Table `games`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `games` ;
CREATE TABLE IF NOT EXISTS `games` (
	`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`title` VARCHAR(32) NOT NULL,
	`producer` VARCHAR(32) NOT NULL,
	`year` INT UNSIGNED NOT NULL,
	`Type` ENUM(
		'FIRST_PERSON_SHOOTER',
		'THIRD_PERSON_SHOOTER',
		'ADVENTURE','PUZZLE',
		'COMBAT',
		'UNKNOWN'
	) NOT NULL DEFAULT 'UNKNOWN',
	`LaatstGewijzigdOp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`ID`)
) 
ENGINE = InnoDB;

INSERT INTO `games` (`title`, `producer`, `year`, `type`) VALUES
('Battlefield 5', 'EA', 2018, 'FIRST_PERSON_SHOOTER'),
('Fortnite', 'Epic Games', 2017, 'THIRD_PERSON_SHOOTER'),
('Minecraft', 'Mojang', 2009, 'ADVENTURE');