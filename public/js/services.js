var services = angular.module('app.services', ['ui.router']);

services.factory('Job', [
	'$http', 

	function($http) {
		var Job = function(data) {};

		Job.prototype.save = function(draft) {

		};

		return {
			new: function() {
				return new Job();
			},
			getJob: function() {

			},
			getJobs: function(keyword, page) {
				return $http.get('/job_api/jobs/' + keyword + '?page=' + page).then(function(response) {
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

services.factory('User', [
	'$http',

	function($http) {
		var User = function(data) {};

		return {
			getLocation: function() {
				return $http.get('/findip');
			}
		};
}]);
