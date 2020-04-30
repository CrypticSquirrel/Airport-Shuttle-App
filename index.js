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

/* ------------------------- Query Helper Functions ------------------------- */

const getFirstAvailableSlot = (parkingType, callback) => {
    db.query(
        'SELECT * FROM lot WHERE lot_type = ? AND is_available = 1 ORDER BY lot_id ASC LIMIT 1',
        parkingType,
        (error, results) => {
            if (error) throw error;
            callback(results[0].lot_id);
        }
    );
    db.query(
        'UPDATE lot SET is_available = 0 WHERE lot_type = ? AND is_available = 1 ORDER BY lot_id ASC LIMIT 1',
        parkingType,
        (error, results) => {
            if (error) throw error;
        }
    );
};

const ticketPost = ticketPostData => {
    console.log(ticketPostData);
    db.query('INSERT INTO vehicle SET VIN=?', ticketPostData.VIN, function(error, results) {
        if (error) throw error;
    });
    db.query('INSERT INTO parking_ticket SET ?', ticketPostData, function(error, results) {
        if (error) throw error;
    });
};

/* --------------------------------- Routing -------------------------------- */

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
    getFirstAvailableSlot(parkingType, function(parkingSpot) {
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
