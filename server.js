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

const sendData = (req, res) => {
  res.send(projectData);
};
const addData = (req, res) => {
  projectData.temperature = req.body.temperature;
  projectData.date = req.body.date;
  projectData.user_response = req.body.user_response;
  res.json(projectData);
  res.end();
  console.log(projectData);
};
app.get("/home", sendData);
app.post("/addNewWeatherData", addData);
