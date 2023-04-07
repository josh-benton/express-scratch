const express = require("express");
const app = express();
const { Pool } = require("pg");
const dotenv = require("dotenv").config();
const connectionString = process.env.DATABASE_URL;
const port = process.env.PORT || 3000;

// Create a new Pool instance for connecting to the database
const pool = new Pool({ connectionString });

app.use(express.json());

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

app.post("/api/pitching-rotation", (req, res) => {
  const { player_name, throws, earned_run_average, hall_of_fame } = req.body;
  const query = {
    text: "INSERT INTO pitching_rotation (player_name, throws, earned_run_average, hall_of_fame) VALUES ($1, $2, $3, $4)",
    values: [player_name, throws, earned_run_average, hall_of_fame],
  };
  pool.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error adding record");
    } else {
      res.send("Record added successfully");
    }
  });
});

app.patch("/api/pitching-rotation", (req, res) => {
  const id = req.params.id;
  const { player_name, throws, earned_run_average, hall_of_fame } = req.body;
  const query = {
    text: "UPDATE pitching_rotation SET player_name = $1, throws = $2, earned_run_average = $3, hall_of_fame = $4 WHERE id = $5",
    values: [player_name, throws, earned_run_average, hall_of_fame, id],
  };
  pool.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error updating record");
    } else {
      res.send("Record updated successfully");
    }
  });
});

app.delete("/api/pitching-rotation", (req, res) => {
  const id = req.params.id;
  const query = {
    text: "DELETE FROM pitching_rotation WHERE id = $1",
    values: [id],
  };
  pool.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting record");
    } else {
      res.send("Record deleted successfully");
    }
  });
})

// Start the server
app.listen(port, () => {
  console.log("Server is listening on port 3000...");
});
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

//use pool instance to execute queries against the database
// pool.query('SELECT * FROM pitching_rotation', (err, res) => {
//     if (err) {
//       console.error(err)
//       return
//     }
//     console.log(res.rows)
//   })
