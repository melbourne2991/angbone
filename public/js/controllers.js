var controllers = angular.module('app.controllers', ['app.services']);

controllers.controller('MainController', ['$scope', function($scope) {
	$scope.scrolled_1 = false;

	$scope.$watch('scrolled_1', function(n, o) {
		console.log(n);
		console.log(o);
	})
}]);

controllers.controller('HomeController', ['$scope', 'Job', 'User', function($scope, Job, User) {	
	// Get user location
	User.getLocation().then(function(results) {
		console.log(results);
	});


	// Job selection, loading etc
	var page = 0;

	var getJobs = function(keyword, page, cb) {
		Job.getJobs(keyword, page).then(cb);
	};

	$scope.selectedJobType 	= false;
	$scope.jobListings = [];

	$scope.selectJobType = function(keyword, page) {
		page = 0;

		$scope.selectedJobType = keyword;

		getJobs(keyword, page, function(results) {
			$scope.jobListings = results.data
			$scope.contentLoaded = true;
		});
	}

	$scope.loadMoreJobs = function(keyword) {
		page++;

		getJobs(keyword, page, function(results) {
			if(typeof $scope.jobListings === 'object') {
				var jobListings = _.clone($scope.jobListings);

				_.forEach(results.data, function(result) {
					jobListings.push(result);
				});

				$scope.jobListings = jobListings;
			}
		});
	};
}]);