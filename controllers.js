const selectTopics = require("./models");

function getTopics(req, res,) {
	console.log(req)
	selectTopics(req.query)
	.then((result)=>{
	res.status(200).send(result);
	})
}

module.exports = { getTopics };
