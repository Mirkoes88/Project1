const { selectTopics, selectApi } = require("./models");
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

module.exports = { getTopics, getApi };
