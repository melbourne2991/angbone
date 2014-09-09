var services = angular.module('app.services', ['ui.router']);

services.factory('Job', [
	'$http', 
	'UserLocation',

	function($http, UserLocation) {
		var Job = function(data) {};

		Job.prototype.save = function(draft) {

		};

		return {
			new: function() {
				return new Job();
			},
			getJob: function() {

			},
			getJobs: function(keyword, page, location) {
				var url = '/job_api/jobs/' + keyword + '?page=' + page;

				if(location) {
					url += '&location=' + encodeURI(location);
				} else if(UserLocation.state && UserLocation.city) {
					url += '&location=' + encodeURI(UserLocation.string);
				}

				return $http.get(url).then(function(response) {
					var xmlDoc = $.parseXML(response.data.body);
					var xml    = $(xmlDoc);
					var xmlResults = xml.find('result');
					var results = {
						data: []
					};

					_.forEach(xmlResults, function(result, i) {
						var result = $(result);

						var job = {
							jobtitle: result.find('jobtitle').text(),
							company: result.find('company').text(),
							city: result.find('city').text(),
							state: result.find('state').text(),
							country: result.find('country').text(),
							formattedLocation: result.find('formattedLocation').text(),
							source: result.find('source').text(),
							date: result.find('date').text(),
							snippet: result.find('snippet').text(),
							url: result.find('url').text(),
							formattedLocationFull: result.find('formattedLocationFull').text(),
							formattedRelativeTime: result.find('formattedRelativeTime').text()
						}

						results.data.push(job);
					});

					return results;
				});
			}
		}
}]);

services.factory('RssFeed', [
	'$http',
	'UserLocation',

	function($http, UserLocation) {
		return {
			jsDaily: function() {
				$http.get('http://feeds.feedburner.com/dailyjs?format=xml').then(function(results) {
					console.log(results);
				});
			}
		}
}]);	

services.factory('User', [
	'$http',
	'UserLocation',

	function($http, UserLocation) {
		var User = function(data) {};

		return {
			getLocation: function() {
				return $http.get('/findip').then(function(results) {
					var obj = JSON.parse(results.data.body)
					var zipcode = parseInt(obj.zipcode, 10);
					
					var city;
					var state;

					if((zipcode >= 3000 && zipcode < 4000) || (zipcode >= 8000 && zipcode < 9000)) {
						city = 'Melbourne';
						state = 'VIC';
					} else if ( (zipcode >= 200 && zipcode < 300) || (zipcode >= 2600 && zipcode < 2700) || (zipcode >= 2900 && zipcode < 3000)) {
						city = 'Canberra';
						state = 'ACT';
					} else if(zipcode >= 1000 && zipcode < 3000) {
						city = 'Sydney';
						state = 'NSW';
					} else if(zipcode >= 5000 && zipcode < 6000) {
						city = 'Adelaide';
						state = 'SA';
					} else if(zipcode >= 6000 && zipcode < 7000) {
						city = 'Perth';
						state = 'WA';
					} else if(zipcode >= 7000 && zipcode < 8000) {
						city = 'Hobart';
						state = 'TAS';
					} else if(zipcode >= 800 && zipcode < 900) {
						city = 'Darwin';
						state = 'NT';
					} else {
						// Sydney as a default.
						city = 'Sydney';
						state = 'NSW';
					}

					UserLocation.state = state;
					UserLocation.city = city;
					UserLocation.string = city + ', ' + state;

					return results;
				});
			}
		};
}]);

services.value('UserLocation', {state: null , city: null, string: null});

services.factory('Shortlist', [
	'$http',

	function($http) {
		return {
			getShortlist: function() {
				return $http.get('/shortlist');
			},
			updateShortList: function(val) {
				return $http.post('/shortlist', val);
			}
		}
}]);
