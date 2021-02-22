// Loading express module
const express = require("express");
// Loading handlebars module
const handlebars = require("express-handlebars");
// Loading bodyParser module
const bodyParser = require("body-parser");
// create our express server and creating a const port number
const app = express();
const port = 5839;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Sets our application to use the handlebars engine
app.set("view engine", "handlebars");

app.engine(
  "handlebars",
  handlebars({
    layoutsDir: __dirname + "/views/layouts",
    extname: "handlebars",
    defaultLayout: "index",
  })
);

app.get("/", function (req, res) {
  var items = [];
  for (var i in req.query) {
    items.push({ name: i, value: req.query[i] });
  }

  var context = {};
  context.items = items;
  // sending context object to posted handlebars file
  res.render("gotten", context);
});

app.post("/", function (req, res) {
  var items = [];
  for (var i in req.query) {
    items.push({ name: i, value: req.query[i] });
  }

  var context = {};

  // creating a key for our array of objects in context
  context.items = items;
  var keyValue = [];
  for (var j in req.body) {
    keyValue.push({ key: j, pair: req.body[j] });
  }
  // creating another key for our array of objects in context
  context.keyValue = keyValue;
  // sending context object to posted handlebars file
  res.render("posted", context);
});

app.use(function (req, res) {
  res.status(404);
  res.render("404");
});

app.use(function (req, res) {
  console.log(err.stack);
  res.type("plain/text");
  res.status(500);
  res.render("500");
});

// Application is listening on port specifies in our port const
app.listen(port, () => {
  console.log(`Examples app listening at http://localhost:${port}/`);
});
