'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

var app = angular.module('homeWorkApp');
  app.directive('sidebar',['$location',function() {
    return {
      templateUrl:'scripts/directives/sidebar/sidebar.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:"sideBarController"	 
    }
  }])
  
  app.service("sideBarService", ['$http','$q','$window',function($http,$q,$window)  {
	  this.getUserAccessPages = function (userId) {	 
		  var deferred = $q.defer();  
    	  $http
    	  .get( $window.defultUrl +"/sysMain/getAccessPages/"+userId)
    	  .success(function(data, status, headers, config) {  
    		    
    	        deferred.resolve(data);  
    	      }) 
    	  .error(function(data, status, headers, config) {  
    		  	console.log("連線異常，請洽系統管理員：sideBarService.getUserAccessPages");
    	        deferred.reject(data);  
    	    });      	  
			return deferred.promise;    
     }
	 
}])
  
  
   app.controller('sideBarController', ['$scope','$rootScope','sideBarService', function ($scope,$rootScope,sideBarService) {
	        $scope.selectedMenu = 'mainPage';
	        $scope.collapseVar = -1;
	        $scope.multiCollapseVar = -1;
	        
	        $scope.check = function(x){	          
	          if(x==$scope.collapseVar)
	            $scope.collapseVar = -1;
	          else
	            $scope.collapseVar = x;
	        };
	        
	        $scope.multiCheck = function(y){
	          
	          if(y==$scope.multiCollapseVar)
	            $scope.multiCollapseVar = -1;
	          else
	            $scope.multiCollapseVar = y;
	        };
	        
	        
	        /*抓取可察看頁面*/
	        var userAccessPages = sideBarService.getUserAccessPages($rootScope.globals.currentUser.sessionUserId);
	        userAccessPages.then(function(data) {
	        	$scope.accessPage = data;
	        })
 
}]);
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  