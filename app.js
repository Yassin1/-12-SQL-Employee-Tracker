
const inquirer = require('inquirer');
const cTable = require('console.table');

const DepartmentModel = require('./models/DepartmentsModel.js');
const RolesModel = require('./models/RolesModel.js');
const EmployeeModel = require('./models/EmployeeModel.js');


const MENU_LIMIT = {
    START: 1,
    END: 7
}


/*== Invoke ==*/

showMenu();



/*== MENU ==*/

function menu() {
    let view = `

    =========== MENU ===========

    1. View all departments
    2. View all roles
    3. View all employees
    4. Add a department
    5. Add a role
    6. Add an employee
    7. Update an employee role
    
    `;

    return view;
}

function inputMenuOption() {

    inquirer.prompt([
        {
            name: 'menu-option',
            message: 'Choose your menu option: ',
            type: 'input'
        }
    ])
        .then((answers) => {

            let option = answers['menu-option'];
            option = parseFloat(option);

            if (option < MENU_LIMIT.START || option > MENU_LIMIT.END) {
                console.log('Invalid Choise!');
                showMenu();
                return;
            }

            if (option == 1) {
                viewAllDepartments();
            }
            else if (option == 2) {
                viewAllRoles();
            }
            else if (option == 3) {
                viewAllEmployees();
            }
            else if (option == 4) {
                addNewDepartment();
            }
            else if (option == 5) {
                addNewRole();
            }
            else if (option == 6) {
                addNewEmployee();
            }
            else if (option == 7) {
                updateEmployeeRole();
            }



        })
        .catch((error) => {
            console.log('Error has occured');
            showMenu();
        });

}


function showMenu() {
    let view = menu();
    console.log(view);
    inputMenuOption();
}

/*== Departments ==*/

async function viewAllDepartments() {

    let departments = await DepartmentModel.getAllDepartments();
    showTable(departments);

    showMenu();
}

function addNewDepartment() {

    inquirer.prompt([
        {
            name: 'name',
            message: 'Enter Department name: ',
            type: 'input'
        }
    ])
        .then((answers) => {
            let name = answers['name'];
            DepartmentModel.addNewDepartment(name);
            console.log('Department Added!');

            showMenu();
        })
        .catch((error) => {
            console.log('Error has occured');
            showMenu();
        });



}


/*== Roles ==*/

async function viewAllRoles() {
    let roles = await RolesModel.getAllRoles();
    showTable(roles);

    showMenu();
}

function addNewRole() {

    inquirer.prompt([
        {
            name: 'title',
            message: 'Enter Role title: ',
            type: 'input'
        },
        {
            name: 'salary',
            message: 'Enter Role salary: ',
            type: 'input'
        },
        {
            name: 'department',
            message: 'Enter Role department id: ',
            type: 'input'
        }
    ])
        .then(async (answers) => {
            let title = answers['title'];
            let salary = answers['salary'];
            let department = answers['department'];
            await RolesModel.addNewRole(title, salary, department);
            console.log('Role Added!');

            showMenu();
        })
        .catch((error) => {
            console.log('Invalid department id');
            showMenu();
        });



}

/*== Employees ==*/

async function viewAllEmployees() {
    let employees = await EmployeeModel.getAllEmployees();
    showTable(employees);
    showMenu();
}

function addNewEmployee() {

    inquirer.prompt([
        {
            name: 'first-name',
            message: 'Enter first name: ',
            type: 'input'
        },
        {
            name: 'last-name',
            message: 'Enter last name: ',
            type: 'input'
        },
        {
            name: 'role',
            message: 'Enter role id: ',
            type: 'input'
        },

        {
            name: 'manager',
            message: 'Enter manager id: ',
            type: 'input'
        }
    ])
        .then(async (answers) => {
            let firstName = answers['first-name'];
            let lastName = answers['last-name'];
            let role = answers['role'];
            let manager = answers['manager'];

            await EmployeeModel.addNewEmployee(firstName, lastName, role, manager);
            console.log('Employeed Added!');

            showMenu();
        })
        .catch((error) => {
            console.log('Invalid role or manager id');
            showMenu();
        });
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            name: 'id',
            message: 'Enter employee id you want to update: ',
            type: 'input'
        },
        {
            name: 'role',
            message: 'Enter new role id: ',
            type: 'input'
        },

    ])
        .then(async (answers) => {
            let id = answers['id'];
            let role = answers['role'];

            await EmployeeModel.updateEmployeeRole(id, role);
            console.log('Employeed Role Update!');

            showMenu();
        })
        .catch((error) => {
            console.log('Invalid employee or role id');
            showMenu();
        });
}

/*== Show Table ==*/

function showTable(data) {
    console.table(data);
}

