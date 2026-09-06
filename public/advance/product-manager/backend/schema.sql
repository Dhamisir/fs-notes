CREATE DATABASE IF NOT EXISTS product_manager;

USE product_manager;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  account_type ENUM('admin', 'user') NOT NULL DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT NOT NULL
);

INSERT INTO users (name, email, password, account_type)
SELECT 'Store Admin', 'admin@example.com', 'admin123', 'admin'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@example.com');

INSERT INTO users (name, email, password, account_type)
SELECT 'Demo User', 'user@example.com', 'user123', 'user'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'user@example.com');

INSERT INTO products (name, price, description)
SELECT 'Wireless Keyboard', 49.99, 'A compact keyboard for a clean workspace.'
WHERE NOT EXISTS (SELECT 1 FROM products);

INSERT INTO products (name, price, description)
SELECT 'Desk Lamp', 32.50, 'An adjustable lamp with warm and cool light modes.'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Desk Lamp');

