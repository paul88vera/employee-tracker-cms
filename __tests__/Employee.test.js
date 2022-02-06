const Employee = require("../lib/Employee");

jest.mock('../lib/Employee');

test("get employee stats as an object", () => {
  const employee = new Employee(
    "Jessica",
    "RaBb8t",
    "rabb8@gmail.com",
    "Employee"
  );

  expect(employee.name).toBe("Jessica");
  expect(employee.id).toBe("RaBb8t");
  expect(employee.email).toBe("rabb8@gmail.com");
  expect(employee.role).toBe("Employee");
});