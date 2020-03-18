USE employee_db;

/* Insert 4 Rows into your new table */
INSERT INTO department (name)
VALUES ("System Services"),
	("Information Technology"),
    ("Finance"),
    ("Product Services")
    ;

/* Insert 11 Rows into your new table */
INSERT INTO role (title, salary, department_id)
VALUES ("Developer", 8000.00, 2),
	("Engineer", 9500.00, 2),
    ("Financial Analyst", 6000.00, 3),
    ("Manager", 8000.00, 1),
    ("Salesman", 3000.00, 4),
    ("Vice President", 12000.00, 1),
    ("Vice President", 13000.00, 2),
    ("Director", 105000.00, 3),
    ("Admin", 40000.00, 1),
    ("President", 15000.00, 1),
    ("Analyst", 15000.00, 2);
    

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kayling", "Blaze", 1, 2),
	("Jonas", "Wade", 3, 7),
    ("Kayling", "Blaze", 2, 5),
    ("Scarlet", "Lane", 1, 3),
    ("Adelyn", "Mitchek", 4, 4),
    ("Kayling", "Blaze", 5, 6),
    ("Clare", "Jimenz", 2, 3),
    ("Frank", "Boss", 4, 2);

select * FROM employee;
select * from department;
select * from role;