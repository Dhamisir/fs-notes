CREATE DATABASE IF NOT EXISTS bank_account_api;

USE bank_account_api;

CREATE TABLE IF NOT EXISTS accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner_name VARCHAR(100) NOT NULL,
  balance DECIMAL(12, 2) NOT NULL DEFAULT 0
);

INSERT INTO accounts (owner_name, balance)
SELECT 'Aditi Mehta', 2500.00
WHERE NOT EXISTS (SELECT 1 FROM accounts WHERE owner_name = 'Aditi Mehta');

INSERT INTO accounts (owner_name, balance)
SELECT 'Rohan Verma', 1200.00
WHERE NOT EXISTS (SELECT 1 FROM accounts WHERE owner_name = 'Rohan Verma');

