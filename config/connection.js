const mysql = require('mysql2');

const connection = mysql.createConnection(
  {
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

module.exports = connection;
