const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const hbs = require("hbs");
const app = express();

dotenv.config({
  path: ".env/config.env",
});
// const partialsPath = path.join (__dirname , "")

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
  res.render("weather", {
    title: "weather",
    country: "egypt",
    latitude: 21.3,
    longitude: 35.1,
    weather: "clear",
    temperature: 31,
  });
});
// handle all unexiting routes
app.all("*", (req, res) => {
  res.send("page not fouund");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app runnig on: http://localhost:${port}`);
});
