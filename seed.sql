DROP DATABASE IF EXISTS happymanagerdb;
CREATE DATABASE happymanagerdb;

USE happymanagerdb;

create table department (
id integer auto_increment not null,
primary key (id),
department_name varchar(30) not null
);

create table employee_role (
id integer auto_increment not null,
title varchar(30) not null,
salary decimal not null,
department_id integer,
primary key (id)
);

create table employee (
id integer auto_increment not null,
primary key (id),
first_name varchar(30) not null,
last_name varchar(30) not null,
role_id integer,
manager_id integer
);

INSERT INTO department (department_name) values ('Human');
INSERT INTO department (department_name) values ('Brainstorming');
INSERT INTO employee_role (title, salary, department_id) values ('Thinker', 55000, 2 );  
INSERT INTO employee_role (title, salary, department_id) values ('Maker', 75000, 1 ); 