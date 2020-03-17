/* Schema for SQL database/table */
DROP database if exists employee_db;

/* Create database */
CREATE database employee_db;

USE employee_db;

/* Create department table */
CREATE table department(
id int not null auto_increment, 
name varchar(30), 
primary key(id)
);

/* Create role table */
CREATE table role(
id int not null auto_increment, 
title varchar(30), 
salary decimal, 
department_id int, 
primary key(id), 
foreign key(department_id) references department(id)
);

/* Create manager table */
CREATE table manager(
id int auto_increment,
employee_id int,
primary key(id)
);

/* Create employee table */
CREATE table employee(
id int not null auto_increment,
first_name varchar(30),
last_name varchar(30),
role_id int,
manager_id int,
primary key(id),
foreign key(role_id) references role(id),
foreign key(manager_id) references manager(id)
);