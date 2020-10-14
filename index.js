const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "happyManagerDB"
});

//FUNCTION TO BEGIN APPLICATION

function run() {
    addData();
};

//INITIAL PROMPT

function addData() {
    inquirer
        .prompt([{
            type: 'list',
            name: 'type',
            message: 'What would you like to do?',
            choices: [
                { name: 'ADD NEW' },
                { name: 'UPDATE' },
                { name: 'SEARCH' },
                { name: 'TERMINATE EMPLOYEE' },
                { name: 'x EXIT' }
            ]
        }]).then(answers => {
            if (answers.type == 'ADD NEW') {
                addNew();
            }
            if (answers.type == 'UPDATE') {
                update();
            }
            if (answers.type == 'SEARCH') {
                search();
            }
            if (answers.type == 'TERMINATE EMPLOYEE') {
                terminate();
            }
            if (answers.type == 'x EXIT') {
                exit();
            }
        })
};

//ADD, UPDATE, SEARCH, TERMINATE PROMPTS

function addNew() {
    inquirer
        .prompt([{
            type: 'list',
            name: 'type',
            message: 'Add new',
            choices: [
                { name: 'Employee' },
                { name: 'Department' },
                { name: 'Role' },
                { name: '<==' }
            ]
        }]).then(answers => {
            if (answers.type == 'Employee') {
                createEmployee();
            }
            if (answers.type == 'Department') {
                createDepartment();
            }
            if (answers.type == 'Role') {
                createRole();
            }
            if (answers.type == '<==') {
                addData();
            }
        })
};

function update() {
    inquirer
        .prompt([{
            type: 'list',
            name: 'type',
            message: 'Update',
            choices: [
                { name: 'Employee' },
                { name: 'Department' },
                { name: 'Role' },
                { name: '<==' }
            ]
        }]).then(answers => {
            if (answers.type == 'Employee') {
                updateEmployee();
            }
            if (answers.type == 'Department') {
                updateDepartment();
            }
            if (answers.type == 'Role') {
                updateRole();
            }
            if (answers.type == '<==') {
                addData();
            }
        })
};

function search() {
    inquirer
        .prompt([{
            type: 'list',
            name: 'type',
            message: 'Search',
            choices: [
                { name: 'Employee' },
                { name: 'Department' },
                { name: 'Role' },
                { name: '<==' }
            ]
        }]).then(answers => {
            if (answers.type == 'Employee') {
                searchEmployee();
            }
            if (answers.type == 'Department') {
                searchDepartment();
            }
            if (answers.type == 'Role') {
                searchRole();
            }
            if (answers.type == '<==') {
                addData();
            }
        })
};
//
//function terminate() {
//    inquirer
//        .prompt([{
//            type: 'list',
//            name: 'type',
//            message: 'Add new',
//            choices: [
//                { name: 'Employee' },
//                { name: 'Department' },
//                { name: 'Role' },
//                { name: '<==' }
//            ]
//        }]).then(answers => {
//            if (answers.type == 'Employee') {
//                terminateEmployee();
//            }
//        })
//};

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
                exit();
            }
        });
}

//EXIT PROGRAM

function exit() {
    console.log("Goodbye");
    connection.end();
}

//SEARCH TYPE


function searchRole() {
    //inquirer
    //    .prompt([{
    //        type: 'confirm',
    //        name: 'search_role',
    //        message: 'Search for role?'
    //    }])
    //    .then(answers => {
    //if (answers.search_emp == "Yes") {
    connection.query("SELECT * FROM employee_role",
            function(err, res) {
                if (err) throw err;
                console.log(res);
                repeatPrompts();
            }
        )
        //});
};

//SEARCH FUNCTIONS
function searchEmployee() {
    //inquirer
    //    .prompt([{
    //        type: 'confirm',
    //        name: 'search_emp',
    //        message: 'Search for employees?'
    //    }])
    //    .then(answers => {
    //if (answers.search_emp == "Yes") {
    connection.query("SELECT * FROM employee",
            function(err, res) {
                if (err) throw err;
                console.log(res);
                repeatPrompts();
            }
        )
        //    });
};

function searchDepartment() {
    //inquirer
    //    .prompt([{
    //        type: 'confirm',
    //        name: 'search_dep',
    //        message: 'Search for department?'
    //    }])
    //    .then(answers => {
    //if (answers.search_emp == "Yes") {
    connection.query("SELECT * FROM department",
            function(err, res) {
                if (err) throw err;
                console.log(res);
                repeatPrompts();
            }
        )
        //   });
};

//UPDATE TYPE

function updateEmployee() {
    connection.query("SELECT * FROM employee",
        function(err, res) {
            if (err) throw err;
            console.log(res);
            console.log("PRESS Y TO CONTINUE")
        }
    )
    inquirer
        .prompt([{
                type: 'confirm',
                name: 'confirm_process',
                message: 'I NEED SOME INFORAMTION FROM YOU'
            },
            {
                type: 'input',
                name: 'emp_id',
                message: 'EMPLOYEE ID OF EMPLOYEE TO UPDATE'
            },
            {
                type: 'input',
                name: 'first_name',
                message: 'ENTER EMPLOYEE FIRST NAME'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'ENTER EMPLOYEE LAST NAME'
            },
            {
                type: 'input',
                name: 'role',
                message: 'ENTER EMPLOYEE ROLE'
            }
        ])
        .then(answers => {
            //const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.username);
            //employees.push(newEngineer);
            //repeatPrompts();
            connection.query(
                "UPDATE employee SET ? WHERE ?", [{
                        first_name: answers.first_name,
                        last_name: answers.last_name //,
                            //department: answers.department
                    },
                    {
                        id: answers.emp_id
                    }
                ],
                function(err, res) {
                    if (err) throw err;
                    console.log(`Employee ${answers.emp_id}, ${answers.first_name} ${answers.last_name} has been updated. Good job.`)
                    repeatPrompts();
                }
            )
        });
};

function updateRole() {
    connection.query("SELECT * FROM employee_role",
        function(err, res) {
            if (err) throw err;
            console.log(res);
            console.log("PRESS Y TO CONTINUE")
        }
    )
    inquirer
        .prompt([{
                type: 'confirm',
                name: 'confirm_process',
                message: 'I NEED SOME INFORAMTION FROM YOU'
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'ROLE ID OF ROLE TO UPDATE'
            },
            {
                type: 'input',
                name: 'title',
                message: 'ENTER TITLE'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'ENTER SALARY'
            },
            {
                type: 'input',
                name: 'department',
                message: 'ENTER DEPARTMENT'
            }
        ])
        .then(answers => {
            //const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.username);
            //employees.push(newEngineer);
            //repeatPrompts();
            connection.query(
                "UPDATE employee_role SET ? WHERE ?", [{
                        title: answers.title,
                        salary: answers.salary //,
                            //department: answers.department
                    },
                    {
                        id: answers.role_id
                    }
                ],
                function(err, res) {
                    if (err) throw err;
                    console.log(`Role ${answers.role_id} has been updated. Good job.`)
                    repeatPrompts();
                }
            )
        });
};

function updateDepartment() {
    connection.query("SELECT * FROM department",
        function(err, res) {
            if (err) throw err;
            console.log(res);
            console.log("PRESS Y TO CONTINUE")
        }
    )
    inquirer
        .prompt([{
                type: 'confirm',
                name: 'confirm_process',
                message: 'I NEED SOME INFORAMTION FROM YOU'
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'DEPARTMENT ID OF DEPARTMENT TO UPDATE'
            },
            {
                type: 'input',
                name: 'title',
                message: 'ENTER DEPARTMENT NAME'
            }
        ])
        .then(answers => {
            //const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.username);
            //employees.push(newEngineer);
            //repeatPrompts();
            connection.query(
                "UPDATE department SET ? WHERE ?", [{
                        department_name: answers.title,
                    },
                    {
                        id: answers.department_id
                    }
                ],
                function(err, res) {
                    if (err) throw err;
                    console.log(`Congratulations. Department ${answers.department_id} is now the ${answers.title} department.`)
                    repeatPrompts();
                }
            )
        });
};

//CREATE TYPE

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