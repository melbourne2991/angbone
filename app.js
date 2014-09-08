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


app.use(bodyParser.json()); 

routes(app);
app.use('/job_api', job_api(express));

app.get('/findip', function(req, res) {
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	requestify.get('http://freegeoip.net/json/' + ip).done(function(response) {
		res.send(response);
	});
});


app.use(express.static(__dirname + '/public'));

if(app.listen(3000)) console.log('App Listening on ' + '3000');


