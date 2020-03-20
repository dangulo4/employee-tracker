// Dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Create database connections
var connection = mysql.createConnection({
  host: 'localhost',

  // Port
  port: 3306,

  // Username
  user: 'root',

  // Password
  password: 'root',
  database: 'employee_db'
});

// Check for connection errors
// If no errors, console log successful message
connection.connect(function(err) {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: 'choice',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'View All Departments',
        'View All Roles',
        'View Employees By Department',
        'View Employees By Roles',
        'Add New Employee',
        'Add New Department',
        'Add New Role',
        'Search Employee By Last Name',
        'Quit'
      ]
    })
    .then(function(answer) {
      switch (answer.choice) {
        case 'View All Employees':
          vAllEmployees();
          break;

        case 'View All Departments':
          vAllDept();
          break;

        case 'View All Roles':
          vAllRoles();
          break;

        case 'View Employees By Department':
          vByDepartment();
          break;

        case 'View Employees By Roles':
          vByRoles();
          break;

        case 'Add New Employee':
          addEmp();
          break;

        case 'Add New Department':
          addDept();
          break;

        case 'Add New Role':
          addRole();
          break;

        case 'Search Employee By Last Name':
          searchEmpByLn();
          break;

        case 'Quit':
          connection.end();
          break;
      }
    });
}

function vAllEmployees() {
  var query = 'SELECT * FROM employee';
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

function vByDepartment() {
  var query =
    'SELECT department.name AS Department_Name, employee.id AS EmployeeID, employee.first_name AS First_Name, employee.last_name AS Last_Name FROM employee ';
  query += 'LEFT JOIN role ON employee.role_id = role.id ';
  query += 'LEFT JOIN department ON role.department_id = department.id ';
  query += 'GROUP BY EmployeeID ';
  query += 'ORDER BY Department_Name';
  // query += 'INNER JOIN department ON (role.department_id = department.id)';
  // query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

function vByRoles() {
  var query =
    'SELECT role.title AS Title, employee.id AS EmployeeID, employee.first_name AS First_Name, employee.last_name AS Last_Name ';
  query += 'FROM employee LEFT JOIN role ON employee.role_id = role.id ';
  query += 'GROUP BY EmployeeID ';
  query += 'ORDER BY Title';
  // query += 'INNER JOIN department ON (role.department_id = department.id)';
  // query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

function addDept() {
  inquirer
    .prompt([
      {
        name: 'department',
        type: 'input',
        message: 'What is the new department name?'
      }
    ])
    .then(function(answer) {
      connection.query(
        'INSERT INTO department SET ?',
        {
          name: answer.department
        },
        function(err) {
          if (err) throw err;
          console.log('The new department has been added');
          console.log('==================================');
          vAllDept();
        }
      );
    });
}

function vAllDept() {
  var query = 'SELECT * FROM department';
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: 'What is the new role title?'
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the salary for the new role?',
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: 'departmentId',
        type: 'input',
        message: 'What is the Department Id?',
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      connection.query(
        'INSERT INTO role SET ?',
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.departmentId
        },
        function(err) {
          if (err) throw err;
          console.log('The new role has been added');
          console.log('===================================================');
          vAllRoles();
        }
      );
    });
}

function vAllRoles() {
  var query = 'SELECT * FROM role';
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

function addEmp() {
  inquirer
    .prompt([
      {
        name: 'firstName',
        type: 'input',
        message: 'Enter first name'
      },
      {
        name: 'lastName',
        type: 'input',
        message: 'Enter last name'
      },
      {
        name: 'roleId',
        type: 'input',
        message: 'Enter the role Id',
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: 'managerId',
        type: 'input',
        message: 'Enter the manager Id',
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      connection.query(
        'INSERT INTO employee SET ?',
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleId,
          manager_id: answer.managerId
        },
        function(err) {
          if (err) throw err;
          console.log('The new Employee has been added');
          console.log('============================================');
          vAllEmployees();
        }
      );
    });
}

function searchEmpByLn() {
  inquirer
    .prompt({
      name: 'employee',
      type: 'input',
      message: 'Enter the Employee Last Name'
    })
    .then(function(answer) {
      var query = 'SELECT first_name, last_name, id FROM employee WHERE ?';
      connection.query(query, { last_name: answer.employee }, function(
        err,
        res
      ) {
        for (var i = 0; i < res.length; i++) {
          console.table(res);
        }
        runSearch();
      });
    });
}
