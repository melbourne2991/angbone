var requestify = require('requestify');
var api_url = 'http://api.indeed.com/ads/apisearch?publisher=3307133484529864&v=2';

var buildCall = function(req, query) {
	var user_agent = encodeURI(req.headers['user-agent']);
	var user_ip	   = req.ip;

	return api_url + query + '&useragent=' + user_agent + '&userip=' + user_ip;
}

module.exports = function(express) {
	var api = express.Router();
	var query;

	api.get('/jobs/:keyword', function(req, res) {
		var query = '&q=' + req.params.keyword;

		console.log('--------========== Query Below ==========--------');
		console.log(req.query);
		console.log('--------========== Query End ==========--------');

		if(req.query.page) {
			var start = req.query.page * 20;
			var limit = start + 20;

			console.log(query);
			console.log(req.query);

			console.log('start');
			console.log(start);

			console.log('limit');
			console.log(limit);

			var query = query + '&start=' + start + '&limit=' + limit;
		} 

		console.log(query);

		var url = buildCall(req, query);

		console.log(url);

		requestify.get(url).done(function(response) {
			console.log('in');
			console.log(response);
			res.send(response);
		});
	});

	return api;
}