const conn = require('../db/db.js');
const promise = require('promise');

function getAllRoles() {

    return new promise(function (resolve, reject) {
        let sql = `SELECT role.id, role.title, role.salary, department.name as department FROM role INNER JOIN department WHERE role.department_id = department.id`;
        conn.execute(sql, function (err, result, fields) {

            if (err) return reject(false);
            return resolve(result);
        });
    });
}

function addNewRole(title, salary, departmentId) {
    return new promise(function (resolve, reject) {
        let sql = `INSERT INTO role(title, salary, department_id) VALUES (?,?,?)`;
        conn.execute(sql, [title, salary, departmentId], function (err, result, fields) {
            if (err) return reject(false);
            return resolve(result);
        });
    });
}

module.exports = {

    getAllRoles: getAllRoles,
    addNewRole: addNewRole

}