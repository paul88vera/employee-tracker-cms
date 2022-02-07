const inquirer = require('inquirer');
const mysql = require('mysql2');
const fs = require('fs');

// Connect to database
const db = mysql.createConnection(
 {
   host: "localhost",
   // Your MySQL username,
   user: "root",
   // Your MySQL password
   password: "",
   database: "employeeViewer"
 },
 console.log("Connected to the employeeViewer database.")
);