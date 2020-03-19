// Dependencies
const mysql       = require('mysql');
const inquirer    = require('inquirer');
const cTable      = require('console.table');

// Create database connections
var connection  = mysql.createConnection({
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
    if(err) throw err;
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
      'View Employees By Department',
      'View Employees By Roles',
      'Add New Department',
      'Add New Role',
      'Quit'
      ]
  })
  .then(function(answer) {
    switch (answer.choice) {
    case 'View All Employees':
        vAllEmployees();
        break;
    
    case 'View Employees By Department':
    vByDepartment();
    break;

    case 'View Employees By Roles':
    vByRoles();
    break;

    case 'Add New Department':
    addDept();
    break;
    
    case 'Add New Role':
    addRole();
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
    var query = 'SELECT department.name AS Department_Name, employee.id AS EmployeeID, employee.first_name AS First_Name, employee.last_name AS Last_Name FROM employee '
        query += 'LEFT JOIN role ON employee.role_id = role.id ' 
        query += 'LEFT JOIN department ON role.department_id = department.id '
        query += 'GROUP BY EmployeeID ' 
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
    var query = 'SELECT role.title AS Title, employee.id AS EmployeeID, employee.first_name AS First_Name, employee.last_name AS Last_Name '
        query += 'FROM employee LEFT JOIN role ON employee.role_id = role.id ' 
        query += 'GROUP BY EmployeeID ' 
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
                console.log('The new role Title has been added');
                console.log('============================================');
                ;
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
