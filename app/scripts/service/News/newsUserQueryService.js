'use strict';
/**
 * @ngdoc function
 * @name homeWorkApp.controller:newsUserQueryService
 * @description
 * # newsUserQueryService
 * Controller of the homeWorkApp
 */
 var app = angular.module('homeWorkApp');
	

app.service("newsUserQueryService", ['$http','$window','$q',function($http,$window,$q) {
 	 this.getCategory = function () {	 
        var deferred = $q.defer();  
      $http
      .get( $window.defultUrl +"/news/category")
      .success(function(data, status, headers, config) {  
           
            deferred.resolve(data);  
          }) 
      .error(function(data, status, headers, config) {  
            deferred.reject(data);  
        });      	  
          return deferred.promise;    
 };
		
 this.releasedNewsByFlexibleSearch = function (size,pageNumber,paramNewsFlexibleDto) {	 
    var deferred = $q.defer();  
  $http
  .post( $window.defultUrl +"/newsUser/releasedNewsByFlexibleSearch/pageable/"+size+"/"+pageNumber,paramNewsFlexibleDto)
  .success(function(data, status, headers, config) {  
       
        deferred.resolve(data);  
      }) 
  .error(function(data, status, headers, config) {  
        deferred.reject(data);  
    });      	  
      return deferred.promise;    
};
}])

