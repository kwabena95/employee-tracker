const INQUIRER = require('inquirer');
const CON = require('../connection/connect');
const QUESTIONS = () => {

    INQUIRER.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
        }
    ]).then(answer => {
        if (answer[0]) {

            const SQL_QUERY = 'SELECT * FROM department';
            CON.query(SQL_QUERY, (err, results) => {
                if (err) return console.log(err);
                return results;
            })
        }
    })

}

module.exports = QUESTIONS;