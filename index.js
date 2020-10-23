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
let employeeRoleName;
let departmentName;
let departmentNameTwo;
let idNumber;
let roleIdNumber;
let empLastName;
let empFirstName;
let employeeArray = [];

class DepartmentObj {
    constructor(dep_name, dep_id) {
        this.dep_name = dep_name,
            this.dep_id = dep_id
    }
    getDepName() {
        return this.dep_name
    }

    getDepId() {
        return this.dep_id
    }

    getDepartmentObj() {
        return "DepartmentObj"
    }
}

function allChoices() {
    connection.query("SELECT * FROM department",
        function(err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                const newDep = new DepartmentObj(res[i].department_name, res[i].id);
                //departmentObjectsArray.push(newDep);
                departmentNameArray.push(res[i].department_name);
                //resolve(departmentObjectsArray);
            }
        })
    connection.query("SELECT * FROM employee_role",
        function(err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                //const newEmp = new EmployeeObj(res[i].title, res[i].department_id);
                //departmentObjectsArray.push(newDep);
                roleNameArray.push(res[i].title);
                //resolve(departmentObjectsArray);
            }
        })
}
//function searchDepartmentName() {
//    connection.query("SELECT * FROM department",
//        function(err, res) {
//            if (err) throw err;
//            for (var i = 0; i < res.length; i++) {
//                const newDep = new DepartmentObj(res[i].department_name, res[i].id);
//
//                //nameTags.push(newDep);
//                //console.log(nameTags);
//                console.log(newDep.dep_name);
//                console.log(roleName);
//                if (newDep.dep_name == roleName) { break; } {
//
//                    console.log('ISSAMATCH')
//                } { break; }
//                //console.log(roleObject);
//            }
//            //for (var i = 0; i < nameTags.length || nameTags[i].department_name == roleName; i++) {
//            //    console.log(nameTags[i].department_name);
//            //}
//            //if (newDep.res[i] == roleName[0]) {
//            //    connection.query(
//            //        "INSERT INTO employee_role SET ?", {
//            //            salary: roleObject[0].salary,
//            //            title: roleObject[0].title,
//            //            department_id: newDep.dep_id
//            //        },
//            //        function(err, res) {
//            //            if (err) throw err;
//            //            console.log("Role Inserted!")
//            //        },
//            //    )
//            //} else {
//            //    console.log("no match found");
//            //}
//
//
//        }
//    )
//} //}
////)
////};
//
//
//function compareDepartmentNames() {
//    let comparedName = "Valerie";
//    nameTags.forEach(element => {
//        let depName = element[0].DepartmentObj;
//        console.log(depName);
//        //if (depName == comparedName){
//        //console.log("wonderwoman");
//        //}
//    });
//}

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
            //console.log(employeeRoleName);
            //console.log(departmentName);
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
            //departmentName = answers.departmentName;
            console.log(employeeRoleName);
            empFirstName = answers.first_name;
            empLastName = answers.last_name;
            //employeeArray.push(empObj);
            //console.log(departmentName);

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
                //departmentNameTwo = answers.departmentName;
                connection.query("INSERT INTO employee_role SET ?", {
                        first_name: answers.first_name,
                        last_name: answers.last_name,
                    }),
                    function(err, res) {
                        if (err) throw err;

                    }
                depNameSearch();

            }
        });
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
            //console.log(`Employee Role ${employeeRoleName} Assigned Department ID of ${idNumber}`)
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
                //console.log(`Employee Role ${employeeRoleName} Assigned Department ID of ${idNumber}`)
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
                //console.log(`Employee Role ${employeeRoleName} Assigned Department ID of ${idNumber}`)
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
            //console.log(employeeRoleName);
            //console.log(departmentName);

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