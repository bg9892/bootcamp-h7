const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const employeeArray = [];

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const employee = [
    {
        type: 'list',
        name: 'type',
        message: 'What type of employee do you want to add?',
        choices: ['Manager', 'Engineer', 'Intern']
    },
    {
        type: 'input',
        name: 'name',
        message: 'What is the employees name?'
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is the employees ID number?'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the employees email?'
    }
];

const manager = [
    {
        type: 'input',
        name: 'office',
        message: 'What is the managers office number?'
    },
    {
        type: 'confirm',
        name: 'addNew',
        message: 'Do you want to add another employee?'
    }
];

const engineer = [
    {
        type: 'input',
        name: 'github',
        message: 'What is the engineers GitHub user name?'
    },
    {
        type: 'confirm',
        name: 'addNew',
        message: 'Do you want to add another employee?'
    }
]

const intern = [
    {
        type: 'input',
        name: 'school',
        message: 'What is the interns school name?'
    },
    {
        type: 'confirm',
        name: 'addNew',
        message: 'Do you want to add another employee?'
    }
]

function start() {
    inquirer.prompt(employee).then(function (response) {
        const { type, name, id, email } = response;
        switch (type) {
            case 'Manager':
                managerQuestions(name, id, email);
                break;
            case 'Engineer':
                engineerQuestions(name, id, email);
                break;
            case 'Intern':
                internQuestions(name, id, email);
                break;
            default:
                break;
        }
    });
};

function managerQuestions(name, id, email) {
    inquirer.prompt(manager).then(function (response) {
        const { office, addNew } = response;
        employeeArray.push(new Manager(name, id, email, office));

        if (addNew) {
            start();
        } else {
            const output = render(employeeArray);
            outputHTML(output);
        }
    });
};

function engineerQuestions(name, id, email) {
    inquirer.prompt(engineer).then(function (response) {
        const { github, addNew} = response;
        employeeArray.push(new Engineer(name, id, email, github));

        if (addNew) {
            start();
        } else {
            const output = render(employeeArray);
            outputHTML(output);
        }
    });
};

function internQuestions(name, id, email) {
    inquirer.prompt(intern).then(function (response) {
        const { school, addNew } = response;
        employeeArray.push(new Intern(name, id, email, school));

        if (addNew) {
            start();
        } else {
            const output = render(employeeArray);
            outputHTML(output);
        }
    });
};

function outputHTML(output) {
    fs.writeFile(outputPath, output, err => {
        if (err) {
            return console.log(err);
        }
        console.log("Success!");
    });
}


start();

