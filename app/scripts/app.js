'use strict';
/**
 * @ngdoc overview
 * @name homeWorkApp
 * @description
 * # homeWorkApp
 *
 * Main module of the application.
 */



var app = angular
	.module('homeWorkApp',
		['oc.lazyLoad', 'ui.router', 'ui.bootstrap',
			'angular-loading-bar', "angularFileUpload",
			"ngCookies", "ngSanitize"
		])

app.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
	function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {


		$ocLazyLoadProvider.config({
			debug: false,
			events: true,
		});
		/*如果連結不到轉至哪一個頁面*/
		$urlRouterProvider.otherwise('newsUserQuery');

		$stateProvider
			 

		//user query news
		.state('newsUserQuery', {
			templateUrl: 'views/News/newsUserQuery.html',
			url: '/newsUserQuery',
			controller: 'newsUserQueryController',
			resolve: {
				loadMyFile: function ($ocLazyLoad) {
					return $ocLazyLoad.load({
						name: 'homeWorkApp',
						files: ['scripts/controllers/News/newsUserQueryController.js',
							'scripts/service/News/newsUserQueryService.js'
						]
					})
				}
			}
		})

				//admin insert news
				.state('newsAdminInsert', {
					templateUrl: 'views/News/newsAdminInsert.html',
					url: '/newsAdminInsert',
					controller: 'newsAdminInsertController',
					resolve: {
						loadMyFile: function ($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'homeWorkApp',
								files: ['scripts/controllers/News/newsAdminInsertController.js',
									'scripts/service/News/newsAdminInsertService.js'
								]
							})
						}
					}
				})

								
				//admin update news
				.state('newsAdminUpdate', {
					templateUrl: 'views/News/newsAdminUpdate.html',
					url: '/newsAdminUpdate',
					controller: 'newsAdminUpdateController',
					resolve: {
						loadMyFile: function ($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'homeWorkApp',
								files: ['scripts/controllers/News/newsAdminUpdateController.js',
									'scripts/service/News/newsAdminUpdateService.js'
								]
							})
						}
					}
				})



				//admin remove news
				.state('newsAdminRemove', {
					templateUrl: 'views/News/newsAdminRemove.html',
					url: '/newsAdminRemove',
					controller: 'newsAdminRemoveController',
					resolve: {
						loadMyFile: function ($ocLazyLoad) {
							return $ocLazyLoad.load({
								name: 'homeWorkApp',
								files: ['scripts/controllers/News/newsAdminRemoveController.js',
									'scripts/service/News/newsAdminRemoveService.js'
								]
							})
						}
					}
				})


		//admin delete news
		.state('newsAdminDelete', {
			templateUrl: 'views/News/newsAdminDelete.html',
			url: '/newsAdminDelete',
			controller: 'newsAdminDeleteController',
			resolve: {
				loadMyFile: function ($ocLazyLoad) {
					return $ocLazyLoad.load({
						name: 'homeWorkApp',
						files: ['scripts/controllers/News/newsAdminDeleteController.js',
							'scripts/service/News/newsAdminDeleteService.js'
						]
					})
				}
			}
		})








	}
]);



