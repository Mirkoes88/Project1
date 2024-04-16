const { selectTopics, selectApi, selectApiArticlesId } = require("./models");
const endPoints = require("./endpoints.json");

function getTopics(req, res, next) {
  selectTopics(req.query)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(next);
}

function getApi(req, res, next) {
  selectApi(endPoints)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(next);
}

function getApiArticlesId(req, res, next) {
  const { article_id } = req.params;
  selectApiArticlesId(article_id)
      .then((article) => {
          if (!article) {
              res.status(404).send({ msg: "404: article not found" });
          } else {
              res.status(200).send({ article });
          }
      })
      .catch(next);
}

module.exports = { getTopics, getApi, getApiArticlesId };
