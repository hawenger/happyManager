//const Manager = require("./lib/Manager");
//const Engineer = require("./lib/Engineer");
//const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

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

//TYPE OF EMPLOYEE TO CREATE PROMPT

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
                { name: 'View Employee' },
                { name: 'View Department' },
                { name: 'View Role' },
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
        })
};

//ADD ANOTHER EMPLOYEE PROMPT
function nextEmployee() {
    inquirer
        .prompt([{
            type: 'list',
            name: 'next',
            message: 'Add another employee?',
            choices: [
                { name: 'YES' },
                { name: 'NO' },
            ]
        }])
        .then(answers => {
            if (answers.next == 'YES') {
                addData();
            }
            if (answers.next == 'NO') {
                console.log(employees);
            }

        })
        .then(function() {
            generateMyTeam();
        })
        .catch(function(error) {
            console.log(error);
        });
}

//CREATE SPECIFIC EMPLOYEE TYPE

function createDepartment() {
    inquirer
        .prompt([{
                type: 'input',
                name: 'name',
                message: 'EMPLOYEE NAME'
            },
            {
                type: 'input',
                name: 'id',
                message: 'EMPLOYEE ID'
            },
            {
                type: 'input',
                name: 'email',
                message: 'EMPLOYEE EMAIL'
            },
            {
                type: 'input',
                name: 'username',
                message: 'GITHUB USERNAME'
            }
        ])
        .then(answers => {
            const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.username);
            employees.push(newEngineer);
            nextEmployee();
        });
};

function createEmployee() {
    inquirer
        .prompt([{
                type: 'input',
                name: 'name',
                message: 'EMPLOYEE NAME'
            },
            {
                type: 'input',
                name: 'id',
                message: 'EMPLOYEE ID'
            },
            {
                type: 'input',
                name: 'email',
                message: 'EMPLOYEE EMAIL'
            },
            {
                type: 'input',
                name: 'school',
                message: 'SCHOOL NAME'
            }
        ])
        .then(answers => {
            const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school);
            employees.push(newIntern);
            nextEmployee();
        });

};

function createRole() {
    inquirer
        .prompt([{
                type: 'input',
                name: 'name',
                message: 'EMPLOYEE NAME'
            },
            {
                type: 'input',
                name: 'id',
                message: 'EMPLOYEE ID'
            },
            {
                type: 'input',
                name: 'email',
                message: 'EMPLOYEE EMAIL'
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: 'OFFICE NUMBER'
            }
        ])
        .then(answers => {
            const newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            employees.push(newManager);
            nextEmployee();
        });
};

//RUN APP

run();