const express = require("express");
const app = express();
const {
  getTopics,
  getApi,
  getApiArticlesId,
  getApiArticles,
  getApiArticlesIdComments,
} = require("./controllers");

app.get("/api/topics", getTopics);

app.get("/api", getApi);

app.get("/api/articles/:article_id", getApiArticlesId);

app.get("/api/articles", getApiArticles);

app.get("/api/articles/:article_id/comments", getApiArticlesIdComments);

app.all("*", (request, response) => {
  response.status(404).send({ msg: "404: Not Found" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "400: Invalid input" });
  } else if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send("Internal Server Error");
});

module.exports = app;
