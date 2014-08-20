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

		if(req.query.page) {
			var start = req.query.page * 20;
			var limit = start + 20;

			var query = query + '&start=' + start + '&limit=' + limit;
		} 

		var url = buildCall(req, query);

		requestify.get(url).then(function(response) {
			res.send(response);
		});
	});

	return api;
}