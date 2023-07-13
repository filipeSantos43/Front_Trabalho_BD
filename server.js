const express = require('express');
const mysql = require('mysql');
const cors = require('cors');



// Create the connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senha',
    database: 'voos'
});

// Connect to the database
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// Initialize the Express app
const app = express();

app.use(cors());


// Define the API route for flights per airline
app.get('/api/flights_per_airline', (req, res) => {
    let sql = `SELECT A.Airline AS Airline, COUNT(F.Flight_Number) AS NumberOfFlights
             FROM Airline A
             LEFT JOIN Flights F ON A.IATA_CODE = F.Airline_IATA_CODE
             GROUP BY A.Airline;`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/api/cancelled_flights_code_0', (req, res) => {
    let sql = `SELECT COUNT(*) AS CancelledFlights
             FROM (SELECT * FROM Flights WHERE Cancellation_Code = 0) AS SubQuery;`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/api/cancelled_flights_code_A', (req, res) => {
    let sql = `SELECT COUNT(*) AS CancelledFlights
             FROM (SELECT * FROM Flights WHERE Cancellation_Code = 'A') AS SubQuery;`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/api/cancelled_flights_code_B', (req, res) => {
    let sql = `SELECT COUNT(*) AS CancelledFlights
             FROM (SELECT * FROM Flights WHERE Cancellation_Code = 'B') AS SubQuery;`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/api/cancelled_flights_code_C', (req, res) => {
    let sql = `SELECT COUNT(*) AS CancelledFlights
             FROM (SELECT * FROM Flights WHERE Cancellation_Code = 'C') AS SubQuery;`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


// Define the API route for cancelled flights per month
app.get('/api/cancelled_flights_per_month', (req, res) => {
    let sql = `SELECT MONTH(F.FlightDate) as Month, COUNT(F.Flight_Number) AS CancelledFlights
             FROM Flights F
             WHERE F.Cancelled = 1
             GROUP BY MONTH(F.FlightDate);`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Define the API route for cancelled flights per airline
app.get('/api/cancelled_flights_per_airline', (req, res) => {
    let sql = `SELECT A.Airline AS Airline, COUNT(F.Flight_Number) AS CancelledFlights
             FROM Airline A
             INNER JOIN Flights F ON A.IATA_CODE = F.Airline_IATA_CODE
             WHERE F.Cancelled = 1
             GROUP BY A.Airline;`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/api/top_cancelled_airlines', (req, res) => {
    let sql = `SELECT A.Airline, COUNT(*) AS Total_Cancellations
             FROM Flights F
             JOIN Airline A ON F.Airline_IATA_CODE = A.IATA_CODE
             WHERE F.Cancellation_CODE IS NOT NULL AND F.Cancellation_CODE <> '0'
             GROUP BY A.Airline
             ORDER BY Total_Cancellations DESC
             LIMIT 5;`;

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});