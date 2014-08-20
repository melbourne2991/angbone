var controllers = angular.module('app.controllers', ['app.services']);

controllers.controller('MainController', ['$scope', function($scope) {

}]);

controllers.controller('HomeController', ['$scope', 'Job', function($scope, Job) {	
	var page = 0;

	var getJobs = function(keyword, page) {
		Job.getJobs(keyword, page).then(function(results) {
			$scope.jobListings.push(results.data);
		});
	};

	$scope.jobListings = [];
	$scope.selectedJobType = '';

	$scope.selectJobType = function(keyword, page) {
		page = 0;

		getJobs(keyword, page);
	}

	$scope.loadMoreJobs = function(keyword) {
		page++;

		getJobs(keyword, page);
	}();
}]);