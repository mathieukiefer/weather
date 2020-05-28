const express = require("express"); // Requiring Express.js

const app = express(); // Mapping app constant to express() app

const port = 3021; // setting listen port for node.js in a const

// default response to root Get
app.get("/", function(req, res) {
  res.send("Hello World!");
});

// Start server listening on specified port
app.listen(port, function() {
  console.log("server is running on port: " + port);
});
