const db = require("./db/connection");

const selectTopics = () => {
  return db
    .query("SELECT * FROM topics")
    .then(({ rows }) => rows)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const selectApi = (endPoints) => {
  return Promise.resolve(endPoints);
};

const selectApiArticlesId = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
    .then((result) => result.rows[0]);
};

const selectApiArticles = () => {
  return db
    .query(
      `
    SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url,
    COUNT(comments.comment_id)::int AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;
  `
    )
    .then(({ rows }) => rows);
};

const selectApiArticlesIdComments = (article_id) => {
  return db
    .query(
      "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;",
      [article_id]
    )
    .then(({ rows }) => rows);
};

const checkArticle = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "404: Id Not Found",
        });
      }
    });
};

const insertComment = (article_id, username, body) => {
  if (!article_id) {
    return Promise.reject({
      status: 404,
      msg: "404: Id Not Found",
    });
  }
  return db
    .query(
      "INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) RETURNING *;",
      [body, username, article_id]
    )
    .then(({ rows }) => rows[0]);
};

module.exports = {
  selectTopics,
  selectApiArticlesId,
  selectApi,
  selectApiArticles,
  selectApiArticlesIdComments,
  checkArticle,
  insertComment
};
