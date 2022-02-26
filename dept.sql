

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";





CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



INSERT INTO `department` (`id`, `name`) VALUES
(4, 'Marketing'),
(5, 'Sales'),
(6, 'Development'),
(7, 'Research');



CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `role_id` int(11) NOT NULL,
  `manager_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



INSERT INTO `employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES
(3, 'Sam', 'Parker', 5, 4),
(4, 'David', 'Jones', 7, NULL),
(5, 'Peter', 'K.', 4, NULL),
(6, 'Tasha', 'Kim', 6, NULL),
(7, 'Bestow', 'Rynes', 5, 4),
(8, 'Drake', 'Jhons', 8, 6),
(9, 'Lara', 'P.', 9, 4);



CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `title` varchar(30) NOT NULL,
  `salary` decimal(10,0) NOT NULL,
  `department_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



INSERT INTO `role` (`id`, `title`, `salary`, `department_id`) VALUES
(4, 'Marketing manager', '1000', 4),
(5, 'Developer', '1200', 6),
(6, 'Sales manager', '1000', 5),
(7, 'Team Lead', '1000', 6),
(8, 'Seller', '500', 5),
(9, 'Researcher', '1500', 7),
(10, 'Testers', '900', 5);




ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `manager_id` (`manager_id`);


ALTER TABLE `role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `department_id` (`department_id`);



ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;


ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;


ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;


ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`manager_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE `role`
  ADD CONSTRAINT `role_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

