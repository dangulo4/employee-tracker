// Dependencies
const mysql       = require('mysql');
const inquirer    = require('inquirer');

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
      'Quit'
      ]
  })
  .then(function(answer) {
    switch (answer.choice) {
    case 'View All Employees':
        viewAllEmployees();
        break;

    case 'Quit':
      connection.end();
      break;
    }
  });
}

function viewAllEmployees() {
    // var query = 'SELECT * FROM employee';
    connection.query('SELECT * FROM employee', function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + '| ' + res[i].first_name + '|' + res[i].last_name );
            
            // console.log(res);
          }
        runSearch();
    });
}
    