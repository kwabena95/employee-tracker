INSERT INTO department
    (name)
VALUES
    ('Engineering'),
    ('Engineering'),
    ('Finance'),
    ('Sales'),
    ('Sales');


INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Software Developer', 100000, 1),
    ('Lead Engineer', 150000, 2),
    ('Account', 110000, 3),
    ('Lead Sales', 90000, 4),
    ('Salesperson', 85000, 5);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Francis', 'Woods', 1, null),
    ('Channing', 'Guzman', 2, 1),
    ('Kato', 'Acosta', 3, null),
    ('Brain', 'Ingram', 4, 2),
    ('Myles', 'Moody', 5, 4);