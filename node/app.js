'use strict';
var port = 1337;
const express = require('express');
const app = express();

app.use(express.json());

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./../python/airQualityDb.db');

app.listen(port, () => console.log('Server running at http://localhost:' + port));

app.get('/tshirt', (req, res) => {
    res.status(200).send({
        tshirt: 'hej'
    });
});

app.get('/result', (req, res) => {

    var start = req.query.start
    var end = req.query.end

    var query = "SELECT * FROM readings WHERE time >= " + start + " AND time <= " + end;

    var result = [];

    db.all(query, [], (err, rows) => {
        if (err) {
            throw err;
        }

        rows.forEach((row) => {
            result.push(row);
        });
        res.json(result);
    });

    //res.status(200).send({ sucecss:true});
});
