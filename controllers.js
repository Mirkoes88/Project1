const {
  selectTopics,
  selectApiArticlesId,
  selectApi,
  selectApiArticles,
  selectApiArticlesIdComments,
  checkArticle,
  insertComment,
  patchData,
  deleteCommentId,
  selectApiUsers,
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

function patchApiArticlesId(req, res, next) {
  const { article_id } = req.params;
  if (!article_id || isNaN(parseInt(article_id)) || parseInt(article_id) < 1) {
    return res.status(400).send({ msg: "400: invalid request" });
  }
  const { inc_votes } = req.body;
  if (!inc_votes || isNaN(parseInt(inc_votes))) {
    return res
      .status(400)
      .send({ msg: "400: invalid request - inc_votes must be a number" });
  }
  patchData(article_id, inc_votes)
    .then((article) => {
      if (!article) {
        res.status(404).send({ msg: "404: Not Found" });
      } else {
        res.status(200).send({ article });
      }
    })
    .catch((err) => {
      next(err);
    });
}

function deleteCommentById(req, res, next) {
  const { comment_id } = req.params;
  if (!comment_id || isNaN(parseInt(comment_id)) || parseInt(comment_id) < 1) {
    return res.status(400).send({ msg: "400: invalid request" });
  }
  deleteCommentId(comment_id)
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(404).send({ msg: "404: Not Found" });
      } else {
        res.status(204).end();
      }
    })
    .catch((err) => {
      next(err);
    });
}

function getApiUsers(req, res, next) {
  selectApiUsers(req.query)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(next);
}

module.exports = {
  getTopics,
  getApiArticlesId,
  getApi,
  getApiArticles,
  getApiArticlesIdComments,
  postApiArticlesComments,
  patchApiArticlesId,
  deleteCommentById,
  getApiUsers,
};
