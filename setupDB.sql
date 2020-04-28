-- Run file: `mysql -u admin -p < setupDB.sql`
/* ----------------------------- Create Database ---------------------------- */
CREATE DATABASE wbas_mysql;

USE wbas_mysql;

/* --------------------------------- Create Tables -------------------------------- */
-- TODO : create tables
CREATE TABLE pet (
    name VARCHAR(20),
    owner VARCHAR(20),
    species VARCHAR(20),
    sex CHAR(1),
    birth DATE,
    death DATE
);