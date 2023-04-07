const express = require("express");
const app = express();
const { Pool } = require("pg");
const dotenv = require("dotenv").config();
const connectionString = process.env.DATABASE_URL;
const port = process.env.PORT || 3000;

// Create a new Pool instance for connecting to the database
const pool = new Pool({ connectionString });

//basic get request
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Define a GET route that queries the database and returns the results
app.get("/api/pitching-rotation", (req, res) => {
  pool.query("SELECT * FROM pitching_rotation", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error querying database");
    } else {
      res.send(result.rows);
    }
  });
});

// app.post("/api/pitching-rotation", (req, res) => {
//   // Destructure the player data from the request body
//   const { player_name, throws, earned_run_average, hall_of_fame } = req.body;

//   // Define an SQL query with parameter placeholders
//   const query = {
//     text: "INSERT INTO pitching_rotation (player_name, throws, earned_run_average, hall_of_fame) VALUES ($1, $2, $3, $4)",
//     values: [player_name, throws, earned_run_average, hall_of_fame],
//   };

//   // Use the Pool instance to execute the query
//   pool.query(query, (err, result) => {
//     if (err) {
//       // Log any errors to the console
//       console.error(err);
//       // Send a 500 error response to the client
//       res.status(500).send("Error adding record");
//     } else {
//       // Send a success response to the client
//       res.send("Record added successfully");
//     }
//   });
// });

// Start the server
app.listen(port, () => {
  console.log("Server is listening on port 3000...");
});

//use pool instance to execute queries against the database
// pool.query('SELECT * FROM pitching_rotation', (err, res) => {
//     if (err) {
//       console.error(err)
//       return
//     }
//     console.log(res.rows)
//   })
