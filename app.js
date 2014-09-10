var express		= require('express');
var app 		= express();
var bodyParser 	= require('body-parser');
var cookieParser = require('cookie-parser');
var sessions	= require('cookie-session');
var requestify = require('requestify');
var routes = require('./routes');
var job_api = require('./job_api');

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');


app.use(sessions({
	name: 'shortlist:sess',
	keys: ['33k4%3##@@23x3#+','393kj%%$#dlkd', '%$^^##@@23xw3#+']
}));

app.use(bodyParser.json()); 

routes(app);

app.use('/job_api', job_api(express));

app.get('/findip', function(req, res) {
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	requestify.get('http://freegeoip.net/json/' + ip).done(function(response) {
		res.send(response);
	});
});

app.get('/shortlist', function(req, res) {
	if(req.session.shortlist.length) {
		res.send(req.session.shortlist);
	} else {
		res.send(false) // No shortlist exists.
	}
});

app.post('/shortlist', function(req, res) {
	if(req.body.length) {
		// Concat arrays
		req.session.shortlist = req.session.shortlist.concat(req.body);
		res.send(req.session.shortlist);
	} else if(typeof req.body === 'object') {
		// Push Item
		req.session.shortlist.push(req.body);
		res.send(req.session.shortlist);
	} else {
		res.send({error: 'Sorry there was an error'});
	}
});

app.use(express.static(__dirname + '/public'));

if(app.listen(3000)) console.log('App Listening on ' + '3000');


