// import dependencies
const MYSQL = require('mysql2');
require('dotenv').config();

// create a connection to db
const CON = MYSQL.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
});

module.exports = CON;
