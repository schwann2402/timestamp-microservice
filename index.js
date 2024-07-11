// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
const { time } = require("console");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", (req, res) => {
  const timestamp = req.params.date;

  if (!isNaN(Number(timestamp)) && timestamp.length === 13) {
    res.json({
      unix: Number(timestamp),
      utc: new Date(Number(timestamp)).toUTCString(),
    });
  } else if (new Date(timestamp).toUTCString() !== "Invalid Date") {
    res.json({
      unix: new Date(timestamp).getTime(),
      utc: new Date(timestamp).toUTCString(),
    });
  } else {
    res.json({
      error: "Invalid Date",
    });
  }
});

app.get("/api", (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
