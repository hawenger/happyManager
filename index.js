const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "happyManagerDB"
});

//let departmentObjectsArray = [];
let departmentNameArray = ['NOT LISTED'];
let roleNameArray = ['NOT LISTED'];
let employeeNameArray = [];
let employeeRoleName;
let departmentNameTwo;
let idNumber;
let roleIdNumber;
let empLastName;
let nameOEmp;
//let triggerEmpUpdate = false;

function clearAll() {
    employeeRoleName = "";
    departmentNameTwo = "";
    idNumber = "";
    roleIdNumber = "";
    empLastName = "";
    //triggerEmpUpdate = false;
}

function allChoices() {
    connection.query("SELECT * FROM department",
        function(err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {

                departmentNameArray.push(res[i].department_name);

            }
        })
    connection.query("SELECT * FROM employee_role",
        function(err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {

                roleNameArray.push(res[i].title);

            }
        })
    connection.query("SELECT * FROM employee",
        function(err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {

                employeeNameArray.push(`${res[i].last_name}, ${res[i].first_name} ${res[i].id}`);

            }
        })
}

//FUNCTION TO BEGIN APPLICATION

function run() {
    allChoices();
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
                clearAll();
                addNew();
            }
            if (answers.type == 'UPDATE') {
                clearAll();
                allChoices();
                update();
            }
            if (answers.type == 'SEARCH') {
                allChoices();
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
    connection.query("SELECT * FROM employee_role",

        function(err, res) {
            if (err) throw err;
            console.log('Your Results')
            for (var i = 0; i < res.length; i++) {

                console.log(`ID: ${res[i].id} || ${res[i].title} || ${res[i].salary} || DEPARTMENT ID:${res[i].department_id}`);

            };
            repeatPrompts();

        },
    )

};


//SEARCH FUNCTIONS

function searchEmployee() {
    connection.query("SELECT * FROM employee",

        function(err, res) {
            if (err) throw err;
            console.log('Your Results')
            for (var i = 0; i < res.length; i++) {

                console.log(`ID: ${res[i].id} || ${res[i].first_name} || ${res[i].last_name} || ROLE ID: ${res[i].role_id} ||MANAGER ID: ${res[i].manager_id} `);

            };
            repeatPrompts();

        },
    )
};

function searchDepartment() {

    connection.query("SELECT * FROM department",

        function(err, res) {
            if (err) throw err;
            console.log('Your Results')
            for (var i = 0; i < res.length; i++) {

                console.log(`ID: ${res[i].id} || ${res[i].department_name}`);

            };
            repeatPrompts();

        },
    )
};

//UPDATE TYPE

function updateEmployee() {

    inquirer
        .prompt([{
                type: 'list',
                name: 'employeeName',
                message: ' Select Employee to Update',
                choices: employeeNameArray
            },
            {
                type: 'confirm',
                name: 'continue',
                message: 'Time to update your employee!',
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
                type: 'list',
                name: 'role',
                message: 'SELECT EMPLOYEE ROLE',
                choices: roleNameArray
            }
        ])
        .then(answers => {
            nameOEmp = answers.employeeName;
            employeeRoleName = answers.role;
            triggerEmpUpdate = true;
            if (answers.role == 'NOT LISTED') {
                connection.query(
                    "UPDATE employee SET ? WHERE ?", [{
                            last_name: answers.last_name,
                            first_name: answers.first_name

                        },
                        {
                            id: nameOEmp.slice(-1)
                        }
                    ],
                    function(err, res) {
                        if (err) throw err;
                        addUnlistedRole();
                    }
                )

            }
            if (answers.role != 'NOT LISTED') {
                empLastName = answers.last_name;
                connection.query(
                    "UPDATE employee SET ? WHERE ?", [{
                            last_name: answers.last_name,
                            first_name: answers.first_name
                        },
                        {
                            id: nameOEmp.slice(-1)
                        }
                    ],
                    function(err, res) {
                        if (err) throw err;

                        empFindRole();
                    }
                )

            }
        });
};

function empFindRole() {
    connection.query(
        "SELECT * FROM employee_role WHERE ?", [{
            title: employeeRoleName
        }],
        function(err, res) {
            if (err) throw err;
            roleIdNumber = res[0].id;
            idNumber = res[0].department_id;
            employeeUpdateTwo();
        }
    )
}

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

            connection.query(
                "UPDATE employee_role SET ? WHERE ?", [{
                        title: answers.title,
                        salary: answers.salary

                    },
                    {
                        id: answers.role_id
                    }
                ],
                function(err, res) {
                    if (err) throw err;
                    console.log(`
                            Role $ { answers.role_id }
                            has been updated.Good job.
                            `)
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
                    console.log(`
                            Congratulations.Department $ { answers.department_id }
                            is now the $ { answers.title }
                            department.
                            `)
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

//function verifyEmployee() {
//    connection.query("SELECT * FROM employee_role", {
//        function() {
//            if (title === answers.employee_role) {
//                console.log("HELLO");
//            }
//            if (title != answers.employee_role) {
//                console.log("no go")
//            }
//        }
//    });
//}
function addUnlistedRole() {
    inquirer
        .prompt([{
                type: 'input',
                name: 'rolename',
                message: 'ENTER ROLE NAME'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'ENTER SALARY'
            },
            {
                type: 'list',
                name: 'departmentName',
                message: 'WHICH DEPARMENT OWNS THIS ROLE?',
                choices: departmentNameArray
            }
        ])
        .then(answers => {
            employeeRoleName = answers.rolename;
            departmentName = answers.departmentName;

            if (answers.departmentName == 'NOT LISTED') {

                connection.query("INSERT INTO employee_role SET ?", {
                        salary: answers.salary,
                        title: answers.rolename,
                    }),
                    function(err, res) {
                        if (err) throw err;

                    }
                addUnlistedDepartment();
            }
            if (answers.departmentName != 'NOT LISTED') {
                departmentNameTwo = answers.departmentName;
                connection.query("INSERT INTO employee_role SET ?", {
                        salary: answers.salary,
                        title: answers.rolename,
                    }),
                    function(err, res) {
                        if (err) throw err;

                    }
                depNameSearch();

            }

        });
}

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
            {
                type: 'list',
                name: 'employee_role',
                message: 'SELECT EMPLOYEE ROLE',
                choices: roleNameArray
            }

        ])
        .then(answers => {
            employeeRoleName = answers.employee_role;

            console.log(employeeRoleName);
            empFirstName = answers.first_name;
            empLastName = answers.last_name;


            if (answers.employee_role == 'NOT LISTED') {

                connection.query("INSERT INTO employee SET ?", {
                        first_name: answers.first_name,
                        last_name: answers.last_name,
                    }),
                    function(err, res) {
                        if (err) throw err;

                    }
                addUnlistedRole();
            }
            if (answers.employee_role != 'NOT LISTED') {

                connection.query("INSERT INTO employee SET ?", {
                        first_name: answers.first_name,
                        last_name: answers.last_name,
                    }),
                    function(err, res) {
                        if (err) throw err;

                    }
                findRole();

            }
        });
}

function findRole() {
    connection.query("SELECT * FROM employee_role WHERE ?", [{
            title: employeeRoleName
        }],
        function(err, res) {
            if (err) throw err;
            roleIdNumber = res[0].id;
            idNumber = res[0].department_id;
            employeeUpdateTwo();
        }
    )
}

function employeeUpdateOne() {
    connection.query("SELECT * FROM employee_role WHERE ?", [{
            title: employeeRoleName
        }],
        function(err, res) {
            if (err) throw err;
            roleIdNumber = res[0].id;
            employeeUpdateTwo();
        }
    )
}

function employeeUpdateTwo() {
    connection.query(
        "UPDATE employee SET ? WHERE ?", [{

                manager_id: idNumber,
                role_id: roleIdNumber
            },
            {
                last_name: empLastName,
            }
        ],
        function(err, res) {
            if (err) throw err;
            console.log(`
                            Employee $ { empLastName }
                            Assigned Manager ID of $ { idNumber }
                            $ Role Id of $ { roleIdNumber }
                            `);
            repeatPrompts();
        }
    )
}

//CREATE ROLE FUNCTIONS 

function empRoleUpdate() {
    if (empLastName == "") {
        connection.query(
            "UPDATE employee_role SET ? WHERE ?", [{

                    department_id: idNumber
                },
                {
                    title: employeeRoleName
                }
            ],
            function(err, res) {
                if (err) throw err;
                console.log(`
                            Employee Role $ { employeeRoleName }
                            Assigned Department ID of $ { idNumber }
                            `)
                repeatPrompts();
            }
        )
    }
    if (empLastName != "") {
        connection.query(
            "UPDATE employee_role SET ? WHERE ?", [{

                    department_id: idNumber
                },
                {
                    title: employeeRoleName
                }
            ],
            function(err, res) {
                if (err) throw err;
                employeeUpdateOne();
            }
        )
    }
}

function depNameSearch() {
    connection.query("SELECT * FROM department WHERE ?", [{
            department_name: departmentNameTwo
        }],
        function(err, res) {
            if (err) throw err;
            idNumber = res[0].id;
            empRoleUpdate();
        }
    )
}


function addUnlistedDepartment() {
    inquirer
        .prompt([{
            type: 'input',
            name: 'deponame',
            message: 'ENTER DEPARTMENT NAME'
        }])
        .then(answers => {
            departmentNameTwo = answers.deponame;
            connection.query(
                "INSERT INTO department SET ?", {
                    department_name: answers.deponame,
                },
                function(err, res) {
                    if (err) throw err;
                    depNameSearch();
                }
            )

        })
}

function createRole() {
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
                type: 'list',
                name: 'departmentName',
                message: 'WHICH DEPARMENT OWNS THIS ROLE?',
                choices: departmentNameArray
            },
        ])
        .then(answers => {

            employeeRoleName = answers.title;
            departmentName = answers.departmentName;

            if (answers.departmentName == 'NOT LISTED') {

                connection.query("INSERT INTO employee_role SET ?", {
                        salary: answers.salary,
                        title: answers.title,
                    }),
                    function(err, res) {
                        if (err) throw err;

                    }
                addUnlistedDepartment();
            }
            if (answers.departmentName != 'NOT LISTED') {
                departmentNameTwo = answers.departmentName;
                connection.query("INSERT INTO employee_role SET ?", {
                        salary: answers.salary,
                        title: answers.title,
                    }),
                    function(err, res) {
                        if (err) throw err;

                    }
                depNameSearch();

            }
        });
}

//RUN APP

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    run();
});