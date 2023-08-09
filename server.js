const express = require('express');
const routes = require('./routes');
const inquirer = require('inquirer');
const app = express();
const PORT = process.env.PORT || 3001;
const mysql = require('mysql2');
const fs = require('fs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '123',
    database: 'user_db'
  },
  console.log(`Connected to the user_db database.`)
);
db.query('SELECT * FROM role', function (err, results,fields) {
  console.log(results);
	console.log(fields);
});

