const dotenv = require("dotenv");
dotenv.config();

var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const fetch = require("node-fetch");

const app = express();

app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  //res.sendFile(path.resolve('src/client/views/index.html'))
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

//api calls
const baseURL = "https://api.meaningcloud.com/sentiment-2.1";
const api_key = process.env.API_KEY;
let url = baseURL + api_key;
console.log(url);

app.get("/article", async (req, res) => {
  const baseURL = "https://api.meaningcloud.com/sentiment-2.1";
  const api_key = `?key=${process.env.API_KEY}`;
  const lang = "en";
  let text = req.query.txt;
  let url = baseURL + api_key + `&lang=${lang}` + `&txt=${text}`;
  const apiData = await fetch(url, { method: "POST" });
  const data = await apiData.json();
  console.log(data);
  res.send(data);
});
