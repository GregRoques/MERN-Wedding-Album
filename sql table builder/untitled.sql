CREATE TABLE `currLoggedIn`.`currLoggedIn` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `ip` VARCHAR(45) NOT NULL,
  `browser` VARCHAR(45) NOT NULL,
  `token` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));