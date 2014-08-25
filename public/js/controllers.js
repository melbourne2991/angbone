var controllers = angular.module('app.controllers', ['app.services']);

controllers.controller('MainController', ['$scope', function($scope) {
	$scope.scrolled_1 = false;
}]);

controllers.controller('HomeController', ['$scope', '$state', 'Job', 'User', 'UserLocation', function($scope, $state, Job, User, UserLocation) {	
	// Job selection, loading etc
	var page = 0;

	var getJobs = function(keyword, page, cb) {
		Job.getJobs(keyword, page).then(cb);
	};

	$scope.selectedJobType 	= false;

	$scope.selectedJobTypes = {
		angular: false,
		backbone: false,
		ember: false
	}

	$scope.jobListings = [];

	// Get User Location First
	User.getLocation().then(function() {
		$scope.searchLocation = UserLocation.string;

		$scope.selectJobType = function(keyword) {
			$scope.selectedJobTypes = {
				angular: false,
				backbone: false,
				ember: false
			};

			$scope.contentLoaded = false;
			$state.go('home.jobs', { keyword: keyword });
		};
	});
}]);

controllers.controller('JobResultsController', ['$scope', '$state', 'Job', 'User', function($scope, $state, Job, User) {	
	// Start page at 0
	var page = 0;

	var getJobs = function(keyword, page, location, cb) {
		Job.getJobs(keyword, page, location).then(cb);
	};

	$scope.selectedJobType = $state.params.keyword;

	if($scope.selectedJobTypes[$scope.selectedJobType]) 
		$scope.selectedJobTypes[$scope.selectedJobType] = true;


	// Get User Location First
	User.getLocation().then(function() {
		getJobs($scope.selectedJobType, page, $scope.searchLocation, function(results) {
			$scope.jobListings = results.data
			$scope.contentLoaded = true;
		});	
	});

	$scope.loadMoreJobs = function(keyword) {
		page++;

		$scope.contentLoaded = false;

		getJobs(keyword, page, function(results) {
			if(typeof $scope.jobListings === 'object') {
				var jobListings = _.clone($scope.jobListings);

				_.forEach(results.data, function(result) {
					jobListings.push(result);
				});

				$scope.jobListings = jobListings;
				$scope.contentLoaded = true;
			}
		});
	};
}]);