INSERT INTO department (id, departments)
VALUES
(1, 'IT'),
(2, 'Web Developers'),
(3, 'Sales'),
(4, 'Human Resources');

INSERT INTO roles (role_id, title, salary, department_id)
VALUES
(115, 'Web Master', 300000, 1),
(114, 'Network Admin', 250000, 1),
(113, 'Lead Engineer', 150000, 2),
(112, 'Engineer', 100000, 2),
(111, 'Lead Sales Rep', 100000, 3),
(110, 'Sales Rep', 84000, 3),
(109, 'HR Manager', 84000, 4),
(108, 'HR Clerk', 70000, 4);

INSERT INTO employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES
(1, 'Mark', 'Winter', 114, NULL ),
(2, 'Nancy', 'Walker', 111, 114),
(3, 'John', 'Kronos', 112, NULL),
(4, 'Jonathan', 'Carry', 113, 112),
(5, 'Brenda', 'Barney', 108, NULL),
(6, 'Jeffrey', 'Chaos', 110, 108),
(7, 'Lucy', 'Dezi', 109, NULL),
(8, 'Wendy', 'Franks', 107, 109);

