const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static("client"));

const projectData = {};

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get("/", sendData);
const sendData = (req, res) => {
  res.send(projectData);
};
app.post("/addNewWeatherData", addData);
const addData = (req, res) => {
  projectData.temprature = req.body.temprature;
  projectData.date = req.body.date;
  projectData.user_response = req.body.user_response;
  res.end();
  console.log(projectData);
};
