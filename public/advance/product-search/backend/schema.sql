CREATE DATABASE IF NOT EXISTS product_search;

USE product_search;

CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  price DECIMAL(12, 2) NOT NULL
);

INSERT INTO products (name, price) VALUES
  ('Laptop Pro', 68000.00),
  ('Gaming Laptop', 82000.00),
  ('Laptop Stand', 1200.00),
  ('Laptop Bag', 1800.00),
  ('Wireless Mouse', 900.00);
