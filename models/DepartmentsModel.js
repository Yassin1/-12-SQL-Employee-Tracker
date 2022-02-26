const conn = require('../db/db.js');
const promise = require('promise');

function getAllDepartments() {

    return new promise(function (resolve, reject) {
        let sql = `SELECT *FROM department`;
        conn.execute(sql, function (err, result, fields) {

            if (err) return reject(false);
            return resolve(result);
        });
    });
}

function addNewDepartment(name) {
    return new promise(function (resolve, reject) {
        let sql = `INSERT INTO department(name) VALUES (?)`;
        conn.execute(sql, [name], function (err, result, fields) {
            if (err) return reject(false);
            return resolve(result);
        });
    });
}

module.exports = {

    getAllDepartments: getAllDepartments,
    addNewDepartment: addNewDepartment

}