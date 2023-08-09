const mysql = require('mysql2');
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


module.exports = db;
