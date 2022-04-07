const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'employeeViewer'
    },
    console.log(`Connected to the employeeViewer database.`)
);

const startProgram = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'Choose an option from below.',
            choices: [
                'View all Departments',
                'View all Roles',
                'View all Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role'
            ]
        }
    ])

.then((optionResponse) => {
    switch(optionResponse.options) {
        case 'View all Departments':
            viewDept();
            break;
        case 'View all Roles':
            viewRoles();
            break;
        case 'View all Employees':
            viewEmployees();
            break;
        case 'Add Department':
            addDept();
            break;
        case 'Add Role':
            addRole();
            break;
        case 'Add Employee':
            addEmployee();
            break;
        case 'Update Employee Role':
            updateRole();
            break;

    }
})
}

const viewDept = () => {
    db.query('SELECT departments FROM department ORDER BY id', function (err, results) {
        console.table(results)
    })
}

const viewRoles = () => {
    db.query('SELECT * FROM roles ORDER BY role_id', function (err, results) {
        console.table(results)
    })
}

const viewEmployees = () => {
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results)
    })
}

addDept = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDept',
            message: 'What is the name of the department?',
            validate: (newOption) => {
                if (newOption) {
                    return true;
                } else {
                    console.log('Please enter a valid response');
                    return false;
                }
            }
        }
    ])
    .then((optionResponse) => {
        const sql = `INSERT INTO department (departments) VALUES (?)`;

        db.query(sql, optionResponse.newDept, (err, res) => {
            if (err) throw err;
            console.log("The " + optionResponse.newDept + " dept has been added");
            viewDept();
        })

    })
}


addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'What is the name of the new Role?',
            validate: (newOption) => {
                if (newOption) {
                    return true;
                } else {
                    console.log('Please enter a valid response.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'newSalary',
            message: 'Please input the salary of the role.',
            validate: (newOption) => {
                if (newOption) {
                    return true;
                } else {
                    console.log('Please enter a valid response.');
                    return false;
                }
            }
        }
    ])
    .then((optionResponse) => {
        const parameters = [optionResponse.newRole, optionResponse.newSalary];
        const newRoleSql = `INSERT INTO roles(roles_id, salary) VALUES (?, ?)`;

        db.query(newRoleSql, (err, res) => {
            if (err) throw err;
            const dept = res.map(({ department, id }) => ({ name: department, value: id }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'dept',
                    message: 'What dept is this role for?',
                    choices: dept,
                },
            ])
            .then((options) => {
                const dept = options.dept;
                parameters.push(dept);

                const sql = 'INSERT INTO roles (role_id, title, salary, department_id) VALUES (?, ?, ?, ?)';

                db.query(sql, parameters, (err, res) => {
                    if (err) throw err;
                    console.log('The ' + optionResponse.newDept + ' role has been added');
                viewRoles();
                })
            })
        })

    })
}

addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the new employees first name?',
            validate: (newOption) => {
                if (newOption) {
                    return true;
                } else {
                    console.log('Please enter a valid response');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the new employees last name?',
            validate: (newOption) => {
                if (newOption) {
                    return true;
                } else {
                    console.log('Please enter a valid response');
                    return false;
                }
            },
        },
    ])
    .then((optionResponse) => {
        const parameters = [optionResponse.first_name, optionResponse.last_name];
        const newRoleSql = `select role_id, title from roles`;

        db.query(newRoleSql, (err, res) => {
            if (err) throw err;
            const roles = res.map(({ id, title }) => ({
                name: title,
                value: id,
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name:'role',
                    message: 'What is the employees role?',
                    choices: roles,
                },
            ])
            .then((roleChoice) => {
                const role = roleChoice.role;
                parameters.push(role);

                const newManagerSql = `SELECT * FROM employee`;

                db.query(newManagerSql, (err, res) => {
                    if (err) throw err;
                    const newManager = res.map(({ id, first_name, last_name }) => ({
                        name: first_name + ' ' + last_name,
                        value: id,
                    }));

                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'manager',
                            message: 'Who is the employees manager?',
                            choices: newManager,
                        },
                    ])
                    .then((managerChoice) => {
                        const manager = managerChoice.manager;
                        parameters.push(manager);

                        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                        db.query(sql, parameters, (err, result) => {
                            if (err) throw err;
                            console.log('The employee has been added.');
                            viewEmployees();
                        })
                    })
                })
            })
        })
    })
}

updateRole = () => {
    const employeeUpdateSql = `SELECT * FROM employee`;

    db.query(employeeUpdateSql, (err, res) => {
        if (err) throw err;
        
        const employees = res.map(({ id, first_name, last_name}) => ({ name: first_name + ' ' + last_name, value: id }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: 'Please choose an employee to update.',
                choices: employees
            }
        ])
        .then (employeeChoice => {
            const employee = employeeChoice.name;
            const parameters = [];
            parameters.push(employee);

            const newRoleSql = `SELECT first_name FROM roles`;

            db.query(newRoleSql, (err, res) => {
                if (err) throw err;

                const roles = res.map(({ id, title }) => ({ name: title, value: id }));

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: 'New Role?',
                        choice: roles
                    }
                ])
                .then (roleChoice => {
                    const role = roleChoice.role;
                    parameters.push(role);

                    let newEmployeeRole = parameters[0]
                    parameters[0] = role
                    parameters[1] = employee

                    const sql = `UPDATE employee SET role_id = ? WHERE employee_id = ?`;

                    db.query(sql, parameters, (err, results) => {
                        if (err) throw err;
                        console.log('Updated!');

                        viewEmployees();
                    })
                })
            })
        })
    })
}

startProgram();