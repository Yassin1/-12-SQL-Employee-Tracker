const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'localhost',

    user: 'root',
    password: 'Prince@12',
    database: 'dept',
    port: 3306
});


module.exports = connection;

