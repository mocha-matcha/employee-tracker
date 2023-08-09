DROP DATABASE IF EXISTS user_db;

CREATE DATABASE user_db;

CREATE TABLE department(

  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- Makes a string column called "name" which cannot contain null --
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role(

  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- Makes a string column called "name" which cannot contain null --
  title VARCHAR(30) NOT NULL,

  salary DECIMAL,

  department_id INT,
FOREIGN KEY(department_id) 
REFERENCES department(id) 
ON DELETE SET NULL

);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- Makes a string column called "name" which cannot contain null --
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT ,
  manager_id INT,
FOREIGN KEY(role_id) 
REFERENCES role(id) 
ON DELETE SET NULL,
FOREIGN KEY(manager_id) 
REFERENCES employee(id) 
ON DELETE SET NULL
);


