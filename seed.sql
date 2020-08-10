use company_db;

insert into department(name) values("department1");
insert into department(name) values("department2");
insert into department(name) values("department3");

insert into role(title, salary, department_id) values("role1", "123.123", 1);
insert into role(title, salary, department_id) values("role2", "234.234", 1);
insert into role(title, salary, department_id) values("role3", "345.345", 2);
insert into role(title, salary, department_id) values("role4", "456.456", 2);
insert into role(title, salary, department_id) values("role5", "567.567", 3);
insert into role(title, salary, department_id) values("role6", "678.678", 3);

insert into employee(first_name, last_name, role_id) values("John", "Doe", 1);
insert into employee(first_name, last_name, role_id) values("Mary", "Jane", 2);
insert into employee(first_name, last_name, role_id, manager_id) values("Peter", "Parker", 3, 2);
insert into employee(first_name, last_name, role_id) values("Kevin", "James", 4);
insert into employee(first_name, last_name, role_id, manager_id) values("Mike", "Hammer", 5, 1);
insert into employee(first_name, last_name, role_id, manager_id) values("Michael", "Scott", 6, 4);
insert into employee(first_name, last_name, role_id) values("Gwen", "Stacy", 2);
insert into employee(first_name, last_name, role_id) values("Vince", "McMahon", 1);
insert into employee(first_name, last_name, role_id, manager_id) values("Ralph", "Douglas", 5, 8);
insert into employee(first_name, last_name, role_id, manager_id) values("Brian", "Kim", 3, 7);