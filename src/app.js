require("dotenv").config();
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
console.log(publicDirPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

hbs.registerPartials(partialsPath);

// Set up handlebars engine
app.set("view engine", "hbs");
app.set("views", viewsPath);

app.get("", (req, res) => {
  res.render("index", { title: "Weather", name: "Alan" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About me", name: "Alan" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Did you find the help you needed?",
    name: "Alan",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({ error: "You must provide an address" });
  }
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        address,
        location,
        forecast: forecastData,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", { message: "Help article not found", name: "Alan" });
});

app.get("*", (req, res) => {
  res.render("error", { message: "Page not found", name: "Alan" });
});

const port = process.env.PORT;
app.listen(port || 3000, () => {
  console.log("Running on port " + port);
});
