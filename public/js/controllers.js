var controllers = angular.module('app.controllers', ['app.services']);

controllers.controller('MainController', ['$scope', function($scope) {
	$scope.scrolled_1 = false;
}]);

controllers.controller('HomeController', ['$scope', '$state', 'Job', 'User', 'UserLocation', function($scope, $state, Job, User, UserLocation) {	
	var resetSelections = function() {
		$scope.jobTypeSelections = {
			angular: false,
			backbone: false,
			ember: false
		}
	};

	resetSelections();

	if($state.params.keyword) {
		$scope.selectedJobType = $state.params.keyword;
		$scope.jobTypeSelections[$scope.selectedJobType] = true;
	} else {
		$scope.selectedJobType 	= false;
	}

	// Get User Location First
	User.getLocation().then(function() {
		$scope.searchLocation = UserLocation.string;

		$scope.selectJobType = function(keyword) {
			resetSelections();

			$scope.selectedJobType = keyword;
			$scope.jobTypeSelections[$scope.selectedJobType] = true;

			$scope.contentLoaded = false;
			$state.go('home.jobs', { keyword: keyword });
		};
	});
}]);

controllers.controller('ArticlesController', ['$scope', '$state', 'Job', 'User', function($scope, $state, Job, User) {	
	console.log('whooogohogog');
}]);	

controllers.controller('JobResultsController', ['$scope', '$state', 'Job', 'User', function($scope, $state, Job, User) {	
	// Start page at 0
	var page = 0;

	var getJobs = function(keyword, page, location, cb) {
		Job.getJobs(keyword, page, location).then(cb);
	};

	$scope.jobListings = [];

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