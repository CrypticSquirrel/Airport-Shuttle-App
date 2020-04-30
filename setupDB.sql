-- To run file: `mysql -u root -p < setupDB.sql`
-- Comment out what drops you don't need if rerunning

/* ----------------------------- Create Database ---------------------------- */
DROP DATABASE IF EXISTS wbas_mysql;
CREATE DATABASE wbas_mysql;

USE wbas_mysql;

/* --------------------------------- Create Tables -------------------------------- */
DROP TABLE IF EXISTS customer;

CREATE TABLE customer (
    customer_id int NOT NULL AUTO_INCREMENT,
    cust_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(26),
    flight_number VARCHAR(255),
    return_flight_number VARCHAR(255),
    PRIMARY KEY(customer_id)
);

DROP TABLE IF EXISTS private_customer;

CREATE TABLE private_customer (
    private_customer_id int NOT NULL AUTO_INCREMENT,
    pilot_licence_number VARCHAR(255),
    aircraft_registration_number VARCHAR(255),
    PRIMARY KEY(private_customer_id),
    FOREIGN KEY(private_customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS vehicle;

CREATE TABLE vehicle (
    VIN VARCHAR(255),
    model VARCHAR(255),
    make VARCHAR(255),
    plate_number VARCHAR(255),
    customer_id INT,
    PRIMARY KEY (VIN),
    FOREIGN KEY(customer_id) REFERENCES customer(customer_id)
);

DROP TABLE IF EXISTS lot;

CREATE TABLE lot (
    lot_id INT NOT NULL AUTO_INCREMENT,
    lot_type VARCHAR(10) NOT NULL,
    is_available BOOLEAN NOT NULL,
    PRIMARY KEY (lot_id)
);

DROP TABLE IF EXISTS parking_ticket;

CREATE TABLE parking_ticket (
    ticket_id INT NOT NULL AUTO_INCREMENT,
    check_in_time TIME NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_time TIME,
    check_out_date DATE,
    paid BOOLEAN DEFAULT 0,
    rate_code CHAR(2),
    lot_id INT,
    VIN VARCHAR(255),
    PRIMARY KEY (ticket_id),
    FOREIGN KEY(lot_id) REFERENCES lot(lot_id),
    FOREIGN KEY(VIN) REFERENCES vehicle(VIN)
);

/* --------------------------------- END Create Tables -------------------------------- */
/* --------------------------------- Views -------------------------------- */
DROP VIEW IF EXISTS active_record_view;

CREATE VIEW active_record_view AS
SELECT
    c.customer_id AS "Customer_Number",
    p.ticket_id AS "Claim_Tag_Number",
    p.check_in_date AS "Date_Brought_In",
    p.lot_id AS "Parking_Location",
    p.check_out_date AS "Expected_Return_Date",
    p.paid AS "Paid"
FROM
    customer c
    INNER JOIN vehicle v ON c.customer_id = v.customer_id
    INNER JOIN parking_ticket p ON v.VIN = p.VIN
WHERE
    p.paid = 0
ORDER BY
    p.check_in_date DESC;

DROP VIEW IF EXISTS claimed_record_view;

CREATE VIEW claimed_record_view AS
SELECT
    c.customer_id AS "Customer_Number",
    v.VIN AS "Vehicle_Registration_Number",
    p.check_in_date AS "Date_Brought_In",
    p.lot_id AS "Parking_Location",
    p.check_out_date AS "Date_Claimed",
    p.paid AS "Paid"
FROM
    customer c
    INNER JOIN vehicle v ON c.customer_id = v.customer_id
    INNER JOIN parking_ticket p ON v.VIN = p.VIN
WHERE
    p.paid = 1
ORDER BY
    p.check_out_date DESC;

/* --------------------------------- End Views -------------------------------- */
/* --------------------------------- Procedures -------------------------------- */
DELIMITER $$
DROP PROCEDURE IF EXISTS populateLots$$
CREATE PROCEDURE populateLots(IN NumRows INT, IN lot_type VARCHAR(10))
    BEGIN
        DECLARE i INT;
        SET i = 1;
        WHILE i <= NumRows DO
            INSERT INTO lot (lot_type, is_available) VALUES (lot_type, 1);
            SET i = i + 1;
        END WHILE;
        COMMIT;
    END$$
DELIMITER ;
CALL populateLots(200, 'covered');
CALL populateLots(250, 'uncovered');
/* --------------------------------- END Procedures -------------------------------- */