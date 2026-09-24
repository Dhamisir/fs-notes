CREATE DATABASE IF NOT EXISTS api_protection;
USE api_protection;
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
CREATE TABLE categories (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(80) NOT NULL UNIQUE);
CREATE TABLE products (id INT PRIMARY KEY AUTO_INCREMENT, category_id INT NOT NULL, name VARCHAR(180) NOT NULL, description VARCHAR(255) NOT NULL, price DECIMAL(10,2) NOT NULL, popularity INT NOT NULL DEFAULT 0, CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories(id), INDEX idx_products_category (category_id));
CREATE TABLE inventory (product_id INT PRIMARY KEY, quantity INT NOT NULL, warehouse VARCHAR(80) NOT NULL, CONSTRAINT fk_inventory_product FOREIGN KEY (product_id) REFERENCES products(id));
