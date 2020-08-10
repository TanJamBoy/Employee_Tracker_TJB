create database company_db;

use company_db;

create table department (
	id integer auto_increment primary key,
    name varchar(30)
);

create table role (
	id integer auto_increment primary key,
    title varchar(30),
    salary decimal(10,2),
    department_id integer,
    foreign key (department_id) references department(id)
);

create table employee (
	id integer auto_increment primary key,
    first_name varchar(30),
    last_name varchar(30),
    role_id integer,
    manager_id integer,
    foreign key (role_id) references role(id),
    foreign key (manager_id) references employee(id)
);