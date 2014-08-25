'use strict';

/**
 * Binds a TinyMCE widget to <textarea> elements.
 */
var app = angular.module('app', [
	'ngAnimate',
	'wu.masonry',
	'ui.router',
	'app.services',
	'app.directives',
	'app.controllers'
]).config(['$httpProvider', '$stateProvider', '$urlRouterProvider', function($httpProvider, $stateProvider, $urlRouterProvider) {
	$urlRouterProvider.when('', '/');

	$stateProvider
		.state('home', {
			templateUrl: '/templates/home.html',
			controller: 'HomeController',
			abstract: true,
			url: '/',
		})
		.state('home.articles', {
			templateUrl: '/templates/articles.html',
			controller: 'ArticlesController',
			url: ''
		})
		.state('home.jobs', {
			templateUrl: '/templates/job_results.html',
			controller: 'JobResultsController',
			url: 'jobs/:keyword'
		})
		.state('login', {
			templateUrl: '/templates/login.html',
			controller: 'LoginController',
			url: '/login'
		})
		.state('admin', {
			templateUrl: '/templates/admin.html',
			controller: 'AdminController',
			url: '/admin'
		})
		.state('admin.posts', {
			templateUrl: '/templates/admin_posts.html',
			controller: 'AdminPostsController',
			url: '/posts'
		});

	$httpProvider.interceptors.push(function($injector) {
		return {
			request: function(config) {
				return config;
			},
			response: function(response) {
				return response;
			},
			responseError: function(response) {
				if(response.status === 403) $injector.get('$state').go('login');
			}
		}
	});
}]);

