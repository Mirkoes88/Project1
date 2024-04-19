const {
  selectTopics,
  selectApiArticlesId,
  selectApi,
  selectApiArticles,
  selectApiArticlesIdComments,
  checkArticle,
  insertComment
} = require("./models");
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

function getApiArticles(req, res, next) {
  selectApiArticles()
    .then((article) => {
      res.status(200).send(article);
    })
    .catch(next);
}

function getApiArticlesIdComments(req, res, next) {
  Promise.all([
    selectApiArticlesIdComments(req.params.article_id),
    checkArticle(req.params.article_id),
  ])
    .then(([comments]) => {
      res.status(200).send({ comments: comments });
    })
    .catch((err) => {
      next(err);
    });
}

function postApiArticlesComments(req, res, next) {
  const { article_id } = req.params;
  const { username, body } = req.body;
  insertComment(article_id, username, body)
    .then((comment) => res.status(201).send({ comment }))
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  getTopics,
  getApiArticlesId,
  getApi,
  getApiArticles,
  getApiArticlesIdComments,
  postApiArticlesComments
};
