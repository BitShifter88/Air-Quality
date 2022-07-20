'use strict';
var port = 1337;
const express = require('express');
const app = express();

app.use(express.json());

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./airQualityDb.db');

app.listen(port, () => console.log('Server running at http://localhost:' + port));

app.get('/tshirt', (req, res) => {
    res.status(200).send({
        tshirt: 'hej'
    });
});

app.post('/result', (req, res) => {

    var json = req.body;

    var start = json.start;
    var end = json.end;

    var query = "SELECT * FROM readings WHERE time >= " + start + " AND time <= " + end;

    var result = [];

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }

        rows.forEach((row) => {
            result.push(row);
            console.log(row);
        });
    });

    res.json(result);
    //res.status(200).send({ sucecss:true});
});
