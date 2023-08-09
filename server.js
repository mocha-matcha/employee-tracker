const express = require('express');
const routes = require('./routes/index');
const inquirer = require('inquirer');
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs')
const db = require('./connection');
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',routes);
const SEEDS = fs.readFileSync(path.join(__dirname,`./db/seeds.sql`)).toString();
console.log(SEEDS);
db.query('DELETE FROM department',  (err, result) => {
        if (err){
             throw err;
        }else{
            console.log("Query run successfully");
        }
    
        });

db.query('DELETE FROM role',  (err, result) => {
        if (err){
             throw err;
        }else{
            console.log("Query run successfully");
        }
    
        });

db.query('DELETE FROM employee',  (err, result) => {
        if (err){
             throw err;
        }else{
            console.log("Query run successfully");
        }
    
        });

db.query(`INSERT INTO department (id,name)
VALUES (1,"Sales"),
(2,"Engineering"),
(3,"Finance"),
(4,"Legal");`,  (err, result) => {
        if (err){
             throw err;
        }else{
            console.log("Query run successfully");
        }
    
        });


db.query(`INSERT INTO role(id,title,salary,department_id)
VALUES (1,"Role 1",10000,1),
(2,"Role 1",10000,1),
(3,"Role 1",10000,1),
(4,"Role 1",10000,1);`,  (err, result) => {
        if (err){
             throw err;
        }else{
            console.log("Query run successfully");
        }
    
        });


db.query(`INSERT INTO employee(id,first_name,last_name,role_id,manager_id)
VALUES (1,"John","Doe",1,1),
(2,"Mimi","Mal",4,1),
(3,"Zoo","Wee",3,1),
(4,"Person","Nosrep",1,1);`,  (err, result) => {
        if (err){
             throw err;
        }else{
            console.log("Query run successfully");
        }
    
        });


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

