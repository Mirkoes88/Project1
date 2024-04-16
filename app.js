const express = require("express");
const app = express();
const { getTopics, getApi } = require("./controllers");

app.get("/api/topics", getTopics);

app.get("/api", getApi);

app.all("*", (request, response, next) => {
  response.status(404).send({ msg: "404: Not Found" });
  next();
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
  next(err);
});

module.exports = app;
