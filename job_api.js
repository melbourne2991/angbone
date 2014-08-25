var requestify = require('requestify');
var api_url = 'http://api.indeed.com/ads/apisearch?publisher=3307133484529864&v=2&co=au';

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

		if(req.query.location) {
			var location = req.query.location;
			var query = query + '&l=' + location;
			console.log('locococa query');
			console.log(query);
		} else {
			var location = encodeURI('Sydney, NSW');
			var query = query + '&l=' + location;
		}

		var url = buildCall(req, query);

		console.log(url);

		requestify.get(url).done(function(response) {
			res.send(response);
		});
	});

	return api;
}