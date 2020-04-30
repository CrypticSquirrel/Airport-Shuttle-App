/* eslint-disable camelcase */
/* ------------------------------ Dependencies ------------------------------ */

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const moment = require('moment');

/* ---------------------------- Global Variables ---------------------------- */

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'wbas_mysql',
});

/* ----------------------------- Initialization ----------------------------- */

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => console.log(`listening at http://localhost:${port}/`));
app.use(express.static('docs'));

/* ------------------------------ MySQL Queries ----------------------------- */

/* ----------------------------- UPDATE Queries ----------------------------- */

const fillSpot = parkingType => {
    db.query(
        'UPDATE lot SET is_available = 0 WHERE lot_type = ? AND is_available = 1 ORDER BY lot_id ASC LIMIT 1',
        parkingType,
        (error, results) => {
            if (error) throw error;
        }
    );
};

const updateTicketCheckOutDate = (updatedDate, VIN) => {
    db.query(
        'UPDATE parking_ticket SET check_out_date = ? WHERE VIN = ?',
        [updatedDate, VIN],
        (error, results) => {
            if (error) throw error;
        }
    );
};

const vehiclePost = (vehiclePostData, VIN) => {
    db.query('UPDATE vehicle SET ? WHERE VIN = ?', [vehiclePostData, VIN], function(
        error,
        results
    ) {
        if (error) throw error;
    });
};

/* ----------------------------- INSERT Queries ----------------------------- */

const ticketPost = ticketPostData => {
    db.query('INSERT INTO vehicle SET VIN = ?', ticketPostData.VIN, function(error, results) {
        if (error) throw error;
    });
    db.query('INSERT INTO parking_ticket SET ?', ticketPostData, function(error, results) {
        if (error) throw error;
    });
};

const customerPost = (customerPostData, callback) => {
    db.query('INSERT INTO customer SET ?', customerPostData, function(error, results) {
        if (error) throw error;
        callback();
    });
};

const privateCustomerPost = customerPostData => {
    db.query('INSERT INTO private_customer SET ?', customerPostData, function(error, results) {
        if (error) throw error;
    });
};

/* ----------------------------- SELECT Queries ----------------------------- */

const getFirstAvailableSlot = (parkingType, callback) => {
    db.query(
        'SELECT * FROM lot WHERE lot_type = ? AND is_available = 1 ORDER BY lot_id ASC LIMIT 1',
        parkingType,
        (error, results) => {
            if (error) throw error;
            callback(results[0].lot_id);
        }
    );
    fillSpot(parkingType);
};

const getCustomerNumber = (email, phone, callback) => {
    if (phone) {
        db.query('SELECT * FROM customer WHERE phone = ?', phone, (error, results) => {
            if (error) throw error;
            callback(results[0].customer_id);
        });
    } else if (email) {
        db.query('SELECT * FROM customer WHERE email = ?', email, (error, results) => {
            if (error) throw error;
            callback(results[0].customer_id);
        });
    }
};

/* --------------------------------- Routing -------------------------------- */

app.get('/customer', (req, res) => {
    db.query(
        'SELECT * FROM customer LEFT JOIN private_customer ON customer.customer_id = private_customer.private_customer_id;',
        (error, results) => {
            if (error) throw error;
            res.json(results);
            res.end();
        }
    );
});

app.post('/handleTicket', (req, res) => {
    const { VIN } = req.body;
    const { parkingType } = req.body;
    let rateCode;
    if (parkingType === 'covered') {
        rateCode = 'CP';
    } else {
        rateCode = 'UP';
    }
    const today = moment().format('YYYY-MM-DD');
    const time = moment().format('hh:mm:ss');
    getFirstAvailableSlot(parkingType, parkingSpot => {
        const ticketPostData = {
            check_in_time: time,
            check_in_date: today,
            rate_code: rateCode,
            lot_id: parkingSpot,
            VIN,
        };
        ticketPost(ticketPostData);
        res.json(ticketPostData);
        res.end();
    });
});

app.post('/customerInfo', (req, res) => {
    const { cust_name } = req.body;
    const { email } = req.body;
    const { check_out_date } = req.body;
    const { phone } = req.body;
    const { flight_number } = req.body;
    const { return_flight_number } = req.body;
    const { pilot_licence_number } = req.body;
    const { aircraft_registration_number } = req.body;
    const { VIN } = req.body;
    const { model } = req.body;
    const { make } = req.body;
    const { plate_number } = req.body;
    const customerPostData = {
        cust_name,
        email,
        phone,
        flight_number,
        return_flight_number,
    };

    updateTicketCheckOutDate(check_out_date, VIN);
    customerPost(customerPostData, () => {
        getCustomerNumber(email, phone, customer_id => {
            if (pilot_licence_number) {
                const privateCustomerPostData = {
                    private_customer_id: customer_id,
                    pilot_licence_number,
                    aircraft_registration_number,
                };
                privateCustomerPost(privateCustomerPostData);
            }
            const vehiclePostData = {
                model,
                make,
                plate_number,
                customer_id,
            };
            vehiclePost(vehiclePostData, VIN);
            res.status(200);
            res.end();
        });
    });
});
