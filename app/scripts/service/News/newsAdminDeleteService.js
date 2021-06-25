'use strict';
/**
 * @ngdoc function
 * @name homeWorkApp.controller:newsAdminDeleteService
 * @description
 * # newsAdminDeleteService
 * Controller of the homeWorkApp
 */
 var app = angular.module('homeWorkApp');
	

app.service("newsAdminDeleteService", ['$http','$window','$q',function($http,$window,$q) {
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
  .post( $window.defultUrl +"/newsAdmin/releasedNewsByFlexibleSearch/pageable/"+size+"/"+pageNumber,paramNewsFlexibleDto)
  .success(function(data, status, headers, config) {  
       
        deferred.resolve(data);  
      }) 
  .error(function(data, status, headers, config) {  
        deferred.reject(data);  
    });      	  
      return deferred.promise;    
};

this.deleteNews = function (deleteNewsIdList) {	 
  var deferred = $q.defer();  
$http
.post($window.defultUrl +"/newsAdmin/deleteNews",deleteNewsIdList)
.success(function(data, status, headers, config) {  
     
      deferred.resolve(data);  
    }) 
.error(function(data, status, headers, config) {  
      deferred.reject(data);  
  });      	  
    return deferred.promise;    
};
}])

