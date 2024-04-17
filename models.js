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
    .then(({ rows }) => rows)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

module.exports = {
  selectTopics,
  selectApiArticlesId,
  selectApi,
  selectApiArticles,
};
