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
            case 'view all employees':
                viewAllEmployees()
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
    const SQL_QUERY = 'SELECT * FROM roles';
    CON.query(SQL_QUERY, (err, results) => {
        if (err) return console.log(err);
        const TABLE = cTABLE.getTable(results);
        console.log(TABLE);
    });
}

function viewAllEmployees() {
    const SQL_QUERY = 'SELECT * FROM employee';
    CON.query(SQL_QUERY, (err, results) => {
        if (err) return console.log(err);
        const TABLE = cTABLE.getTable(results);
        console.log(TABLE);
    });
}

// viewAllDepartment();
module.exports = QUESTIONS;