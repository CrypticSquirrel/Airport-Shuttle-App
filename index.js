const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'my_db',
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
