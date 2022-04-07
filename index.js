const inquirer = require("inquirer");
const mysql = require("mysql2");
const fs = require("fs");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "",
    database: "employeeViewer",
  },
  console.log("Connected to the employeeViewer database.")
);

const startTask = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "selectTask",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Employees By Department",
          "View All Employees by Manager",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager",
        ],
        default: false,
      },
    ])
    .then().whichDepartment();
};

const whichDepartment = () => {
  inquirer.prompt([
    {
      type: "list",
      name: "selectDepartment",
      message: "What department would you like to view?",
      choices: ["IT", "Web Developers", "Sales", "Human Resources", "None"],
      default: false,
    }.then(),
  ]);
};

startTask();
