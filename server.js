const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const hbs = require("hbs");
const geocode = require("./tools/gecode.servises");
const forecast = require("./tools/forcast.servises");
const app = express();

dotenv.config({
  path: ".env/config.env",
});
app.use(express.static("public"));
app.use(morgan("dev"));
app.set("view engine", "hbs");

hbs.registerPartials("./views/partials");
// roting
app.get("/", (req, res) => {
  res.render("index", {
    title: "HOME",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide address",
    });
  }
  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location: req.query.address,
      });
    });
  });
});
app.get("/weather-page", (req, res) => {
  res.render("weather", { title: "weather" });
});
// handle all unexiting routes
app.all("*", (req, res) => {
  res.send("404 page not fouund");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app runnig on: http://localhost:${port}`);
});
