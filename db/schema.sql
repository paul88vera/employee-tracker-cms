DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
-- DROP TABLE IF EXISTS employee;

CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  description TEXT
);

CREATE TABLE roles (
  role_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER,
  CONSTRAINT fk_roles 
  FOREIGN KEY (department_id)
  REFERENCES department(id)
);

CREATE TABLE employee (
  employee_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  manager_id INTEGER,
  CONSTRAINT fk_employee
  FOREIGN KEY (manager_id)
  REFERENCES roles(role_id)
  ON DELETE SET NULL
);