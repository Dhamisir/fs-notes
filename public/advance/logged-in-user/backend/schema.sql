CREATE DATABASE IF NOT EXISTS logged_in_user;

USE logged_in_user;

CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  password VARCHAR(255) NOT NULL,
  course VARCHAR(100) NOT NULL
);

INSERT INTO students (name, email, password, course)
SELECT 'Aarav Sharma', 'learner@example.com', 'learn123', 'Full-Stack Development'
WHERE NOT EXISTS (
  SELECT 1 FROM students WHERE email = 'learner@example.com'
);

