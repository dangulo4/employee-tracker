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
    
