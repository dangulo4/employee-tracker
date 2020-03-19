# Employee Tracker

[![HitCount](http://hits.dwyl.com/{username}/{project}.svg)](http://hits.dwyl.com/{username}/{project})
[![NPM Version](https://img.shields.io/npm/v/npm.svg?style=flat)]()

## Description

- The application will create an application that makes interfaces easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as **C**ontent **M**anagement **S**ystems. In this homework assignment, your challenge is to architect and build a solution for managing a company's employees using node, inquirer, and MySQL.:

![Questions](/assets/images/employeeTracker.gif)]

## Table of Contents

- [Installation](#Installation)
- [Usage](#Usage)
- [License](#License)
- [Contributing](#Contributing)
- [Test](#Test)
- [Questions](#Questions)

## Installation

- The following installations are required:
- Use the [MySQL](https://www.npmjs.com/package/mysql) NPM package to connect to your MySQL database and perform queries.

- This is a Node.js module available through the npm registry.
  Before installing, download and install Node.js. Node.js 0.6 or higher is required.
  Installation is done using the npm install command:
  \$ npm install mysql

- Use [InquirerJs](https://www.npmjs.com/package/inquirer/v/0.2.3) NPM package to interact with the user via the command-line.

- Installation
  npm install inquirer
  var inquirer = require("inquirer");
  inquirer.prompt([/* Pass your questions in here */], function( answers ) {
  // Use user feedback for... whatever!!
  });

- Use [console.table](https://www.npmjs.com/package/console.table) to print MySQL rows to the console. There is a built-in version of `console.table`, but the NPM package formats the data a little better for our purposes.

- nstall
  npm install console.table --save
  bower install console.table --save
  Use in Node
  // call once somewhere in the beginning of the app
  const cTable = require('console.table');
  console.table([
  {
  name: 'foo',
  age: 10
  }, {
  name: 'bar',
  age: 20
  }
  ]);

  // prints
  name age

  ***

  foo 10
  bar 20

## Usage

- node index.js
- node express

## License

- This project is licensed under the MIT License - see the LICENSE.md file for details

## Contributing

- dangulo4

## Tests

- You can use any text editor. There are plugins for many editors (e.g. Atom, Emacs, Sublime Text, Vim, and Visual Studio Code) that allow you to preview Markdown while you are editing it

- Application should allow users to create and save notes.

- Application should allow users to view previously saved notes.

- Application should allow users to delete previously saved notes.

## Questions

- Please don't hesitate to open an issue or pull request. You can also send me a message on Github
