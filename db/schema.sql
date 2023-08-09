DROP DATABASE IF EXISTS user_db;

CREATE DATABASE user_db;

use user_db;
CREATE TABLE department(

  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- Makes a string column called "name" which cannot contain null --
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role(

  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- Makes a string column called "name" which cannot contain null --
  title VARCHAR(30) NOT NULL,

  salary DECIMAL NOT NULL,

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

INSERT INTO department (id,name)
VALUES (1,"name1"),
(2,"name2"),
(3,"name3");

INSERT INTO role (id,title,salary,department_id)
VALUES (1,"title",15.0,1),
(2,"title1",15.0,1),
(3,"title2",15.0,1);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
VALUES (1,"first_name","last_name",1,1),
(2,"first_name","last_name",1,2),
(3,"first_name","last_name",1,1);
