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

////const OUTPUT_DIR = path.resolve(__dirname, "output");
////const outputPath = path.join(OUTPUT_DIR, "team.html");
//
////const render = require("./lib/htmlRenderer");
////const writeFileAsync = util.promisify(fs.writeFile);
//
////const employees = [];
//
////GENERATE TEAM.html
//
////function generateMyTeam() {
////const teamHTML = render(employees);
////writeFileAsync(outputPath, teamHTML);
////}
////FUNCTION TO BEGIN APPLICATION
//
//function run() {
//    addData();
//};
//
////SESSION GOAL PROMPT
//
//function addData() {
//    inquirer
//        .prompt([{
//            type: 'list',
//            name: 'type',
//            message: 'What would you like to do?',
//            choices: [
//                { name: 'Add Employee' },
//                { name: 'Add Department' },
//                { name: 'Add Role' },
//                { name: 'View Employee' },
//                { name: 'View Department' },
//                { name: 'View Role' },
//                { name: 'Update Employee' },
//                { name: 'Update Department' },
//                { name: 'Update Role' }
//            ]
//        }]).then(answers => {
//            if (answers.type == 'Add Employee') {
//                createEmployee();
//            }
//            if (answers.type == 'Add Department') {
//                createDepartment();
//            }
//            if (answers.type == 'Add Role') {
//                createRole();
//            }
//        })
//};
//
////DO SOMETHING ELSE PROMPT
//function repeatPrompts() {
//    inquirer
//        .prompt([{
//            type: 'list',
//            name: 'next',
//            message: 'Do something else?',
//            choices: [
//                { name: 'YES' },
//                { name: 'NO' },
//            ]
//        }])
//        .then(answers => {
//            if (answers.next == 'YES') {
//                addData();
//            }
//            if (answers.next == 'NO') {
//                console.log(employees);
//            }
//
//        })
//        .then(function() {
//            generateMyTeam();
//        })
//        .catch(function(error) {
//            console.log(error);
//        });
//}
//
////CREATE SPECIFIC EMPLOYEE TYPE
//
//function createDepartment() {
//    inquirer
//        .prompt([{
//            type: 'input',
//            name: 'name',
//            message: 'DEPARTMENT NAME'
//        }])
//        .then(answers => {
//            //const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.username);
//            //employees.push(newEngineer);
//            //repeatPrompts();
//        });
//};
//
//function createEmployee() {
//    inquirer
//        .prompt([{
//                type: 'input',
//                name: 'first_name',
//                message: 'EMPLOYEE FIRST NAME'
//            },
//            {
//                type: 'input',
//                name: 'last_name',
//                message: 'EMPLOYEE LAST NAME'
//            }
//        ])
//        .then(answers => {
//            //const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school);
//            //employees.push(newIntern);
//            //repeatPrompts();
//        });
//
//};
//
//function createRole() {
//    inquirer
//        .prompt([{
//                type: 'input',
//                name: 'title',
//                message: 'ROLE TITLE'
//            },
//            {
//                type: 'input',
//                name: 'salary',
//                message: 'ROLE SALARY'
//            }
//        ])
//        .then(answers => {
//            //const newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
//            //employees.push(newManager);
//            //repeatPrompts();
//        });
//};
//
//RUN APP

function askQuestion() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].department_name);
        }
        console.log("-----------------------------------");
    });
}
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    askQuestion();
    connection.end();
});
//
//run();