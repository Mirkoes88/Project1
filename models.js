const db = require("./db/connection");

const selectTopics = () => {
  return db.query("SELECT * FROM topics")
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

module.exports = { selectTopics, selectApi, selectApiArticlesId };
