'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
var app = angular.module('homeWorkApp');

	app.directive('headerNotification',function(){
		return {
        templateUrl:'scripts/directives/header/header-notification/header-notification.html',
        restrict: 'E',
        replace: true,
        controller:'headerController'
    	}
	});

	 
	
	app.controller('headerController', ['$scope','$window','$rootScope','$cookieStore','$http', function ($scope, $window,$rootScope,$cookieStore,$http) {
		 var loggedIn = $rootScope.globals.currentUser;
		 $scope.sessionUserWorkId = loggedIn.sessionUserWorkId;
		/*登出*/
		 $scope.logout = function () {
			   $rootScope.globals = {};
	            $cookieStore.remove('globals');
	            $http.defaults.headers.common.Authorization = 'Basic';
			if($rootScope.globals.currentUser==null){
				alert("已成功登出!")
				$window.location.href = '/#/login'   
			}	
		 }     
		
		 	

	}]);