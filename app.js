const express = require("express");
const app = express();
const { getTopics, getApi, getApiArticlesId } = require("./controllers");

app.get("/api/topics", getTopics);

app.get("/api", getApi);

app.get("/api/articles/:article_id", getApiArticlesId);

app.all("*", (request, response) => {
  response.status(404).send({ msg: "404: Not Found" });
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

module.exports = app;
