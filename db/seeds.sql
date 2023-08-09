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
