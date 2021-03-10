const INQUIRER = require('inquirer');
const CON = require('../connection/connect');
const cTABLE = require('console.table');
const inquirer = require('inquirer');


const QUESTIONS = () => {

    INQUIRER.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
        }
    ]).then(answer => {

        switch (answer.menu) {
            case 'view all departments':
                viewAllDepartment()
                break;
            case 'view all roles':
                viewAllRoles()
                break;
            case 'view all employees':
                viewAllEmployees()
                break;
            case 'add a department':
                addDepartment()
                break;
            case 'add a role':
                addRole()
                break;
            case 'add an employee':
                addEmployee()
                break;
            case 'update an employee role':
                updateEmployee()
                break;
        }
    })

}

function viewAllDepartment() {
    const SQL_QUERY = 'SELECT * FROM department';
    CON.query(SQL_QUERY, (err, results) => {
        if (err) return console.log(err);
        const TABLE = cTABLE.getTable(results);
        console.log(TABLE);
    });
}

function viewAllRoles() {
    const SQL_QUERY = `select title, role.id, department.name, salary
    from role join department on role.department_id = department.id`;
    CON.query(SQL_QUERY, (err, results) => {
        if (err) return console.log(err);
        const TABLE = cTABLE.getTable(results);
        console.log(TABLE);
    });
}

function viewAllEmployees() {
    const SQL_QUERY = `select employee.id, first_name, last_name, role.title, department.name, salary, manager_id from employee join role on employee.role_id = role.id join department on role.department_id = department.id`;

    CON.query(SQL_QUERY, (err, results) => {
        if (err) throw console.log(err);
        const TABLE = cTABLE.getTable(results);
        console.log(TABLE);
    });
}

function addDepartment() {

    INQUIRER.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter department name:',
            validate: dep_Input => {
                if (dep_Input) {
                    return true;
                } else {
                    console.log('Please enter department name!');
                    return false;
                }
            }
        }
    ]).then(answer => {
        const SQL_QUERY = `INSERT INTO department (name) VALUE (?)`;

        CON.query(SQL_QUERY, [answer.department], (err, results) => {
            if (err) throw console.log(err);
            const TABLE = cTABLE.getTable(results);
            console.log(TABLE);
        });
    })

}

function addRole() {

    INQUIRER.prompt([
        {
            type: 'input',
            name: 'role_name',
            message: 'Enter name of role:',
            validate: roleName => {
                if (roleName) {
                    return true;
                } else {
                    console.log('Please enter role name!')
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'salary',
            message: 'Enter salary:',
            validate: salaryInput => {
                if (salaryInput) {
                    return true;
                } else {
                    console.log('Please enter salary!')
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'dep_id',
            message: 'Enter department Id:',
            validate: dep_id_Input => {
                if (dep_id_Input) {
                    return true;
                } else {
                    console.log('Please enter department Id!')
                    return false;
                }
            }
        }
    ]).then(answer => {

        const SQL_QUERY = `INSERT INTO role(title, salary, department_id) VALUES(?, ?, ?)`;
        const PARAMS = [answer.role_name, answer.salary, answer.dep_id];
        CON.query(SQL_QUERY, PARAMS, (err, results) => {
            if (err) throw console.log(err);
            const TABLE = cTABLE.getTable(results);
            console.log('Role table has been updated successfully!', TABLE);
        });
    })
}

function addEmployee() {

    INQUIRER.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter employee\'s first name:',
            validate: firstName => {
                if (firstName) {
                    return true;
                } else {
                    console.log('Please enter first name!')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter employee\'s last name:',
            validate: lastName => {
                if (lastName) {
                    return true;
                } else {
                    console.log('Please enter last name!')
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'role',
            message: 'Enter employee\'s role:',
            validate: roleInput => {
                if (roleInput) {
                    return true;
                } else {
                    console.log('Please enter employee\'s role!')
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'manager',
            message: 'Enter employee\'s manager id:',
            validate: managerInput => {
                if (managerInput) {
                    return true;
                } else {
                    console.log('Please enter employee\'s manager id!')
                    return false;
                }
            }
        }
    ]).then(answer => {

        const SQL_QUERY = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`;
        const PARAMS = [answer.first_name, answer.last_name, answer.role, answer.manager];
        CON.query(SQL_QUERY, PARAMS, (err, results) => {
            if (err) throw console.log(err);
            const TABLE = cTABLE.getTable(results);
            console.log('Role table has been updated successfully!', TABLE);
        });
        return console.log(answer);
    });
}








// getAllEmployeeNames()

function updateEmployee() {

    CON.query(`SELECT first_name, last_name FROM employee`, (err, results) => {

        if (err) throw console.log(err);

        INQUIRER.prompt([
            {
                type: 'list',
                name: 'updateRole',
                message: 'Which employee would you like to update their role?',
                choices: [`${results[0].first_name} ${results[0].last_name}`],
                validate: dep_Input => {
                    if (dep_Input) {
                        return true;
                    } else {
                        console.log('Please enter department name!');
                        return false;
                    }
                }
            }
        ]).then(answer => {
            // const SQL_QUERY = `INSERT INTO department (name) VALUE (?)`;

            // CON.query(SQL_QUERY, [answer.department], (err, results) => {
            //     if (err) throw console.log(err);
            //     const TABLE = cTABLE.getTable(results);
            //     console.log(TABLE);
            // });

            console.log('NAMES ==========>>>>', answer);
        })


    });

}




// viewAllDepartment();
module.exports = QUESTIONS;