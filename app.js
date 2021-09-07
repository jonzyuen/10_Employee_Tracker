const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const connection = mysql.createConnection(
  {
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: '',
    database: 'employee_db'
  }
);

connection.connect(() => {
  console.log('Connected');
  prompts();
});

const prompts = () => {
  inquirer.prompt([
    {
      name: 'home',
      type: 'list',
      message: 'Select an option:',
      choices: [
        'View all Departments',
        'View all Roles',
        'View all Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update Employee Role',
        'Exit'
      ]
    }
  ])
  .then(function(answer) {
    switch (answer.home) {
      case 'View all Departments':
        viewAllDepartments();
        break;

      case 'View all Roles':
        viewAllRoles();
        break;

      case 'View all Employees':
        viewAllEmployees();
        break;

      case 'Add a Department':
        addDepartment();
        break;

      case 'Add a Role':
        addRole();
        break;

      case 'Add an Employee':
        addEmployee();
        break;

      case 'Update Employee Role':
        updateEmployee();
        break;

      case 'Exit':
        connection.end();
        break;
    }
  });
};


function viewAllDepartments() {
  connection.query('SELECT * FROM department;',
  function (res) {
    console.table(res);
    prompts();
  });
};

function viewAllRoles() {
  connection.query('SELECT * FROM role;',
  function (res) {
    console.table(res);
    prompts();
  });
};