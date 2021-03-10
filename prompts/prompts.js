const INQUIRER = require('inquirer');
const CON = require('../connection/connect');
const cTABLE = require('console.table');


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
                addDepartment(answer)
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

function addDepartment(answer) {
    const SQL_QUERY = `INSERT INTO department (name) VALUE ?`;

    CON.query(SQL_QUERY, [answer], (err, results) => {
        if (err) throw console.log(err);
        const TABLE = cTABLE.getTable(results);
        console.log(TABLE);
    });
}

// viewAllDepartment();
module.exports = QUESTIONS;