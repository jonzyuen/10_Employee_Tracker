const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const connection = mysql.createConnection(
  {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_db'
  }
);

connection.connect((err) => {
  if (err) throw err;

  console.log('Connected');
  prompts();
});

function prompts() {
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
  
  connection.query('SELECT * FROM department',
  function (err, res) {
    if (err) throw err;

    console.table(res);
    prompts();
  });
};

function viewAllRoles() {
  connection.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department on role.department_id = department.id',
  function (err, res) {
    if (err) throw err;

    console.table(res);
    prompts();
  });
};

function viewAllEmployees() {
  connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee JOIN role ON employee.role_id=role.id JOIN department ON role.department_id = department.id`,
  function (err, res) {
    if (err) throw err;

    console.table(res);
    prompts();
  });
};

function addDepartment() {
  inquirer.prompt([
    {
      name: 'departmentName',
      type: 'input',
      message: 'Enter new Department name.'
    }
  ])
  .then(function(res) {
    connection.query('INSERT INTO department SET ?',
    {name: res.departmentName},
    function(err, res) {
      if (err) throw err;

      console.table(res);
      prompts();
    });
  });
};

function addRole() {
  inquirer.prompt([
    {
      name: 'roleName',
      type: 'input',
      message: 'Enter new Role name.'
    },
    {
      name: 'roleSalary',
      type: 'number',
      message: 'Enter new Role salary.'
    },
    {
      name: 'roleDepartment',
      type: 'number',
      message: 'Enter new Role department ID.'
    }
  ])
  .then(function(res) {
    connection.query('INSERT INTO role SET ?',
    {
      title: res.roleName,
      salary: res.roleSalary,
      department_id: res.roleDepartment
    },
    function(err, res) {
      if (err) throw err;
      console.table(res);
      prompts();
    });
  });
};

function addEmployee() {
  inquirer.prompt([
    {
      name: 'employeeFName',
      type: 'input',
      message: 'Enter new Employee first name.'
    },
    {
      name: 'employeeLName',
      type: 'input',
      message: 'Enter new Employee last name.'
    },
    {
      name: 'employeeRole',
      type: 'number',
      message: 'Enter new Employee Role ID.'
    },
    {
      name: 'employeeManager',
      type: 'confirm',
      message: 'Does new Employee have a Manager?',
      default: false
    }, 
    {
      when: (res) => res.employeeManager === true,
      name: 'employeeManagerChoice',
      type: 'number',
      message: "Select new Employee's Manager ID"
    }
  ])
  .then(function(res) {
    connection.query('INSERT INTO employee SET ?',
    {
      first_name: res.employeeFName,
      last_name: res.employeeLName,
      role_id: res.employeeRole,
      manager_id : res.employeeManagerChoice
    },
    function(err, res) {
      if (err) throw err;
      console.table(res);
      prompts();
    });
  });
};

function updateEmployee() {
  let employeeList = [];

  connection.query('SELECT * FROM employee',
  function(err, res) {
    if (err) throw err;

    for (let i = 0; i < res.length; i++) {
      let employeeChoice = 
        res[i].id + ' ' + res[i].first_name + ' ' + res[i].last_name;
        employeeList.push(employeeChoice);
    };

    inquirer.prompt([
      {
        type: 'input',
        name: 'employeeIdUpdate',
        message: 'Enter Employee ID.',
      },
      {
        type: 'input',
        name: 'roleIdUpdate',
        message: 'Enter new Role ID.'
      }
    ])
    .then(function(res) {
      connection.query('UPDATE employee SET role_id = ? WHERE id = ?',
      [
        res.roleIdUpdate,
        res.employeeIdUpdate
      ],
      (err, res) => {
        if (err) throw err;

        console.table(res);
        prompts();
      });
    });
  });
};