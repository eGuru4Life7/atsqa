-- User Table
CREATE TABLE `med_erp`.`med_user` (
  `user_id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_fname` VARCHAR(45) NULL,
  `user_lname` VARCHAR(45) NULL,
  `user_gender` VARCHAR(10) NULL,
  `user_email` VARCHAR(45) NULL,
  `user_cnic` VARCHAR(45) NULL,
  `user_dob` VARCHAR(45) NULL,
  `user_mobile_number` VARCHAR(45) NULL,
  `user_home_number` VARCHAR(45) NULL,
  `user_address` VARCHAR(45) NULL,
  `user_city_id` BIGINT NULL,
  `user_state_id` BIGINT NULL,
  `user_password` VARCHAR(45) NULL,
  `user_created_at` VARCHAR(45) NULL DEFAULT 'current_timestamp',
  `user_modified_at` VARCHAR(45) NULL DEFAULT 'current_timestamp',
  `user_created_by` VARCHAR(45) NULL,
  `user_modified_by` VARCHAR(45) NULL,
  `user_active` TINYINT NULL DEFAULT 1,
  `user_is_deleted` TINYINT NULL DEFAULT 0,
  `user_token` VARCHAR(45) NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_email_UNIQUE` (`user_email` ASC),
  UNIQUE INDEX `user_cnic_UNIQUE` (`user_cnic` ASC));
DROP TRIGGER IF EXISTS `med_erp`.`med_user_AFTER_UPDATE`;

DELIMITER $$
USE `med_erp`$$
CREATE DEFINER = CURRENT_USER TRIGGER `med_erp`.`med_user_AFTER_UPDATE` AFTER UPDATE ON `med_user` FOR EACH ROW
BEGIN
	UPDATE `med_erp.`.`med_user`
	SET updatedat = current_timestamp
	WHERE user_id = NEW.user_id;
END$$
DELIMITER ;
