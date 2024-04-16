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

module.exports = { selectTopics, selectApi };
