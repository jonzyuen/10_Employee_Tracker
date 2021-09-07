INSERT INTO department (id, name)
VALUES
  ('1', 'Sales'),
  ('2', 'Engineering'),
  ('3', 'Finance'),
  ('4', 'Legal');

INSERT INTO role (id, title, salary)
VALUES
  ('1', 'Sales Lead', 100000),
  ('2', 'Salesperson', 80000),
  ('3', 'Lead Engineer', 150000),
  ('4', 'Software Engineer', 120000),
  ('5', 'Salesperson', 79000),
  ('6', 'Accountant', 125000),
  ('7', 'Legal Team Lead', 250000),
  ('8', 'Lawyer', 190000),
  ('9', 'Lead Engineer', 150000);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
  ('1', 'John', 'Doe', 1, 3),
  ('2', 'Mike', 'Chan', 1, 1),
  ('3', 'Ashley', 'Rodriguez', 2, null),
  ('4', 'Kevin', 'Tupik', 2, 3),
  ('5', 'Ryan', 'Chen', 1, 1),
  ('6', 'Malia', 'Brown', 3, null),
  ('7', 'Sarah', 'Lourd', 4, null),
  ('8', 'Tom', 'Allen', 4, 6),
  ('9', 'Christrian', 'Eckenrode', 1, 2);