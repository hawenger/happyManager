//const Manager = require("./lib/Manager");
//const Engineer = require("./lib/Engineer");
//const Intern = require("./lib/Intern");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "happyManagerDB"
});


const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");
const { ENETUNREACH } = require("constants");


//const OUTPUT_DIR = path.resolve(__dirname, "output");
//const outputPath = path.join(OUTPUT_DIR, "team.html");

//const render = require("./lib/htmlRenderer");
//const writeFileAsync = util.promisify(fs.writeFile);

//const employees = [];

//GENERATE TEAM.html

//function generateMyTeam() {
//const teamHTML = render(employees);
//writeFileAsync(outputPath, teamHTML);
//}
//FUNCTION TO BEGIN APPLICATION

function run() {
    addData();
};

//SEARCH FUNCTIONS
function searchEmployee() {
    inquirer
        .prompt([{
            type: 'confirm',
            name: 'search_emp',
            message: 'Search for employees?'
        }])
        .then(answers => {
            //if (answers.search_emp == "Yes") {
            connection.query("SELECT * FROM employee",
                    function(err, res) {
                        if (err) throw err;
                        console.log(res);
                        repeatPrompts();
                    }
                ) //}
        });
};

function searchDepartment() {};

function searchRole() {};

function addingEmployee() {};

function addingRole() {};

function addingDepartment() {};
//SESSION GOAL PROMPT

function addData() {
    inquirer
        .prompt([{
            type: 'list',
            name: 'type',
            message: 'What would you like to do?',
            choices: [
                { name: 'Add Employee' },
                { name: 'Add Department' },
                { name: 'Add Role' },
                { name: 'Search Employee' },
                { name: 'Search Department' },
                { name: 'Search Role' },
                { name: 'Update Employee' },
                { name: 'Update Department' },
                { name: 'Update Role' }
            ]
        }]).then(answers => {
            if (answers.type == 'Add Employee') {
                createEmployee();
            }
            if (answers.type == 'Add Department') {
                createDepartment();
            }
            if (answers.type == 'Add Role') {
                createRole();
            }
            if (answers.type == 'Search Employee') {
                searchEmployee();
            }
            if (answers.type == 'Search Role') {
                searchRole();
            }
            if (answers.type == 'Search Department') {
                searchDepartment();
            }
        })
};

//DO SOMETHING ELSE PROMPT
function repeatPrompts() {
    inquirer
        .prompt([{
            type: 'list',
            name: 'next',
            message: 'Do something else?',
            choices: [
                { name: 'YES' },
                { name: 'NO' },
            ]
        }])
        .then(answers => {
            if (answers.next === 'YES') {
                addData();
            } else {
                console.log("Goodbye");
                connection.end();
            }
        });
}


//CREATE SPECIFIC EMPLOYEE TYPE

function createDepartment() {

    inquirer
        .prompt([{
            type: 'input',
            name: 'department_name',
            message: 'DEPARTMENT NAME'
        }])
        .then(answers => {
            //const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.username);
            //employees.push(newEngineer);
            //repeatPrompts();
            connection.query(
                "INSERT INTO department SET ?", {
                    department_name: answers.department_name
                },
                function(err, res) {
                    if (err) throw err;
                    console.log("Department Inserted!")
                    repeatPrompts();
                }
            )
        });
};

function createEmployee() {
    inquirer
        .prompt([{
                type: 'input',
                name: 'first_name',
                message: 'EMPLOYEE FIRST NAME'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'EMPLOYEE LAST NAME'
            },

        ])
        .then(answers => {
            //console.log(answers.first_name);
            //console.log(answers.last_name);
            connection.query(
                "INSERT INTO employee SET ?", {
                    first_name: answers.first_name,
                    last_name: answers.last_name
                },
                function(err, res) {
                    if (err) {
                        console.log(err);
                    } //throw err;
                    console.log("Employee Inserted!")
                    repeatPrompts();
                }
            )
        });

};

function createRole() {
    //QUERY OF DEPARTMENT
    // IF ANSWERS.XFILE == 
    inquirer
        .prompt([{
                type: 'input',
                name: 'title',
                message: 'ROLE TITLE'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'ROLE SALARY'
            },
            {
                type: 'input',
                name: 'xfile',
                message: 'WHICH DEPARTMENT OWNS THIS ROLE'
            }
        ])
        .then(answers => {
            connection.query(
                "INSERT INTO employee_role SET ?", {
                    salary: answers.salary,
                    title: answers.title
                },
                function(err, res) {
                    if (err) throw err;
                    console.log("Role Inserted!")
                    repeatPrompts();
                }
            )
        });
};

//RUN APP

//function askQuestion() {
//connection.query("SELECT * FROM department", function(err, res) {
//    if (err) throw err;
//    for (var i = 0; i < res.length; i++) {
//        console.log(res[i].id + " | " + res[i].department_name);
//    }
//    console.log("-----------------------------------");
//});
//}
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    run();
});