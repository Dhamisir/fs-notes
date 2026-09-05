CREATE DATABASE IF NOT EXISTS secure_student_registration;

USE secure_student_registration;

CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  password VARCHAR(255) NOT NULL,
  course VARCHAR(100) NOT NULL
);

