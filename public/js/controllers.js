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
	$scope.articles = [
		{title: 'Random Article Title Content Goes Here', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'},
		{title: 'Random Article Title Content Goes Here', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
		{title: 'Random Article Title Content Goes Here', content: '"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"'},
		{title: 'Random Article Title Content Goes Here', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'},
		{title: 'Random Article Title Content Goes Here', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'},
		{title: 'Random Article Title Content Goes Here', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
		{title: 'Random Article Title Content Goes Here', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'},
		{title: 'Random Article Title Content Goes Here', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
		{title: 'Random Article Title Content Goes Here', content: '"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"'},
		{title: 'Random Article Title Content Goes Here', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'},
		{title: 'Random Article Title Content Goes Here', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'},
		{title: 'Random Article Title Content Goes Here', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
		{title: 'Random Article Title Content Goes Here', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'},
		{title: 'Random Article Title Content Goes Here', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
		{title: 'Random Article Title Content Goes Here', content: '"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"'},
		{title: 'Random Article Title Content Goes Here', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'},
		{title: 'Random Article Title Content Goes Here', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'},
		{title: 'Random Article Title Content Goes Here', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
		{title: 'Random Article Title Content Goes Here', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'},
		{title: 'Random Article Title Content Goes Here', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
		{title: 'Random Article Title Content Goes Here', content: '"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"'},
		{title: 'Random Article Title Content Goes Here', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'},
		{title: 'Random Article Title Content Goes Here', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'},
		{title: 'Random Article Title Content Goes Here', content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}
	];
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