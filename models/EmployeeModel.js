const conn = require('../db/db.js');
const promise = require('promise');

function getAllEmployees() {

    return new promise(function (resolve, reject) {
        let sql = `SELECT *FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id`;
        conn.execute(sql, function (err, result, fields) {

            if (err) return false;
            return resolve(result);
        });
    });
}

function addNewEmployee(firstName, lastName, role, manager) {
    return new promise(function (resolve, reject) {
        let sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        conn.execute(sql, [firstName, lastName, role, manager], function (err, result, fields) {
            if (err) return reject(false);
            return resolve(result);
        });
    });
}

function updateEmployeeRole(id, roleId) {
    return new promise(function (resolve, reject) {
        let sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
        conn.execute(sql, [roleId, id], function (err, result, fields) {
            if (err) return reject(false);
            return resolve(result);
        });
    });
}

module.exports = {

    getAllEmployees: getAllEmployees,
    addNewEmployee: addNewEmployee,
    updateEmployeeRole: updateEmployeeRole

}