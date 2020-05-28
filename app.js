//jshint esversion:6

const express = require("express"); // Requiring Express.js
const https = require("https"); // Require https.get module
const bodyParser = require("body-parser"); // Require body-parser (get post method from formular)

const app = express(); // Mapping app constant to express() app

const port = 3000; // setting listen port for node.js in a const

app.use(bodyParser.urlencoded({
  extended: true
})); // Authorise Express.js to use body parser in his app.


// default response to root Get
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

  const query = req.body.cityName;
  const apiKey = "fdb552431037fe0f3c68adccdc32220e";
  const units = "metric";
  const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&APPID=" + apiKey;

  https.get(weatherUrl, function(response) {
    console.log("weather get request status : " + response.statusCode);

    response.on("data", function(data) {
      var weatherData = JSON.parse(data);
      var temp = weatherData.main.temp;
      var weatherDescription = weatherData.weather[0].main;
      var icon = weatherData.weather[0].icon;
      var imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>The temps in " + weatherData.name + " is " + Math.round(temp) + " degres Celcius </h1>");
      res.write("<img src=" + imageUrl + ">");
      res.send();
    });
  });

});

/*


*/




// Start server listening on specified port
app.listen(port, function() {
  console.log("server is running on port: " + port);
});
