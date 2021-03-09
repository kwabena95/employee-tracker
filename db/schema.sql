DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employees_db;

CREATE TABLE department
(
        id int
        auto_increment primary key not null,
    name varchar
        (30)
);

        CREATE TABLE role
        (
                id int
                auto_increment primary key not null,
    title varchar
                (30),
    department_id int,
    foreign key
                (department_id) references department
                (id)
);

                CREATE TABLE employee
                (
                        id int
                        auto_increment primary key not null,
    first_name varchar
                        (30),
    last_name varchar
                        (30),
    role_id int,
    manager_id int,
    foreign key
                        (role_id)references role
                        (id),
    foreign key
                        (manager_id)references employee
                        (id)
);