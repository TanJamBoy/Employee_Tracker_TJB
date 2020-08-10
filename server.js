const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Champhomieyog16",
    database: "company_db"
});

connection.connect((err) => {
    console.log("connected as id " + connection.threadId);
    mainMenu();
});

function mainMenu(){
    inquirer
        .prompt([
            {
                message: "What would you like to do?",
                type: "list",
                choices: ["Add Employee", "Add Role", "Add Department", "View All Employees", "View All Roles", "View All Departments", "Update Employee Role"],
                name: "main"
            }
        ]).then(e => {
            switch(e.main) {
                case "Add Employee":
                    addEmployee();
                break;
                case "Add Role":
                    addRole();
                break;
                case "Add Department":
                    addDepartment();
                break; 
                case "View All Employees":
                    orm.view("employee");
                break;
                case "View All Roles":
                    orm.view("role");
                break;
                case "View All Departments":
                    orm.view("department");
                break;
                case "Update Employee Role":
                    updateEmployeeRole();
                break;
            };
        });
};

const orm = {
    add: function(table, tableParams, values) {
        let queryString = "insert into " + table;
        queryString += tableParams;
        queryString += " values(?)";
        connection.query(queryString, [values], (err) => {
            if (err) throw err;
            mainMenu();
        });
    },
    view: function(table) {
        connection.query("select * from ??", [table], (err, result) => {
            if (err) throw err;
            console.log("");
            console.table(result);
            mainMenu();
        });
    },
    update: function(table, columnName) {
        let queryString = "update " + table;
        queryString += " set ";
        queryString += columnName;
        connection.query("update employee set role = newrole where id = employeeId", [], (err) => {
            if (err) throw err;
            mainMenu();
        });
    },
    updateEmployeeRole: function(newRoleId, employeeId) {
        let queryString = "update employee";
        queryString += " set role_id = ";
        queryString += newRoleId;
        queryString += " where id = ?"
        connection.query(queryString, [employeeId], (err) => {
            if (err) throw err;
            mainMenu();
        });
    },
};

function addEmployee(){
    let roles = [];
    let managers = [];
    let roleChoices = [];
    let managerChoices = ["none"];
    connection.query("select title, id from role", (err, result) => {
        roles = result;
        roles.forEach(e => {
            roleChoices.push(e.title);
        });
    });
    connection.query("select first_name, last_name, id from employee", (err, result) => {
        managers = result;
        managers.forEach(e => {
            managerChoices.push(e.first_name + " " + e.last_name);
        });
    });
    inquirer
        .prompt([
            {
                message: "What is the employee's first name?",
                type: "input",
                name: "firstName"
            },
            {
                message: "What is the employee's last name?",
                type: "input",
                name: "lastName"
            },
            {
                message: "What is the employee's role?",
                type: "list",
                choices: roleChoices,
                name: "role"
            },
            {
                message: "Who is the employee's manager?",
                type: "list",
                choices: managerChoices,
                name: "manager"
            },
        ]).then(answer => {
            let selectedRole;
            let selectedManager;
            roles.forEach(e => {
                if(answer.role === e.title){
                    selectedRole = e.id;
                };
            });
            managers.forEach(e => {
                if(answer.manager === e.first_name + " " + e.last_name){
                    selectedManager = e.id;
                };
            });
            orm.add("employee", "(first_name, last_name, role_id, manager_id)", [answer.firstName, answer.lastName, selectedRole, selectedManager]);
        });
};

function addRole(){
    let departments = [];
    let departmentChoices = [];
    connection.query("select * from department", (err, result) => {
        departments = result;
        departments.forEach(e => {
            departmentChoices.push(e.name);
        });
    });
    inquirer
        .prompt([
            {
                message: "What is the title of the role?",
                type: "input",
                name: "title"
            },
            {
                message: "What is the salary of the role?",
                type: "input",
                name: "salary"
            },
            {
                message: "What department is this role in?",
                type: "list",
                choices: departmentChoices,
                name: "department"
            },
        ]).then(answer => {
            let selectedDepartment;
            departments.forEach(e => {
                if(answer.department === e.name){
                    selectedDepartment = e.id;
                };
            });
            orm.add("role", "(title, salary, department_id)", [answer.title, answer.salary, selectedDepartment]);
        });
};

function addDepartment(){
    inquirer
        .prompt([
            {
                message: "What is the name of the department?",
                type: "input",
                name: "name"
            },
        ]).then(answer => {
            orm.add("department", "(name)", [answer.name]);
        });
};

function updateEmployeeRole(){
    let roles = [];
    let employees = [];
    let roleChoices = [];
    let employeeChoices = [];
    connection.query("select title, id from role", (err, result) => {
        roles = result;
        roles.forEach(e => {
            roleChoices.push(e.title);
        });
        connection.query("select first_name, last_name, id from employee", (err, result) => {
            employees = result;
            employees.forEach(e => {
                employeeChoices.push(e.first_name + " " + e.last_name);
            });
            inquirer
                .prompt([
                    {
                        message: "Who's role do you want to change?",
                        type: "list",
                        choices: employeeChoices,
                        name: "employee"
                    },
                    {
                        message: "What is the employee's new role?",
                        type: "list",
                        choices: roleChoices,
                        name: "role"
                    },
                ]).then(answer => {
                    let selectedRole;
                    let selectedEmployee;
                    roles.forEach(e => {
                        if(answer.role === e.title){
                            selectedRole = e.id;
                        };
                    });
                    employees.forEach(e => {
                        if(answer.employee === e.first_name + " " + e.last_name){
                            selectedEmployee = e.id;
                        };
                    });
                    orm.updateEmployeeRole(selectedRole, selectedEmployee);
                });
        });
    });
    
};