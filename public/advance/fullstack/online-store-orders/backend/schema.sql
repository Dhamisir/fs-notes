CREATE DATABASE IF NOT EXISTS online_store_orders;

USE online_store_orders;

CREATE TABLE IF NOT EXISTS customers (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  price DECIMAL(12, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY,
  customer_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT IGNORE INTO customers (id, name) VALUES
  (1, 'Rahul'),
  (2, 'Priya'),
  (3, 'Kabir');

INSERT IGNORE INTO products (id, name, price) VALUES
  (1, 'Laptop', 50000.00),
  (2, 'Headphones', 3500.00),
  (3, 'Mechanical Keyboard', 6200.00);

INSERT IGNORE INTO orders (id, customer_id, product_id, quantity) VALUES
  (101, 1, 1, 2),
  (102, 2, 2, 1),
  (103, 1, 3, 1),
  (104, 3, 2, 2);

