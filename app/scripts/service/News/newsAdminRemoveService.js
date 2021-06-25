'use strict';
/**
 * @ngdoc function
 * @name homeWorkApp.controller:newsAdminRemoveService
 * @description
 * # newsAdminRemoveService
 * Controller of the homeWorkApp
 */
 var app = angular.module('homeWorkApp');
	

app.service("newsAdminRemoveService", ['$http','$window','$q',function($http,$window,$q) {
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

this.removeNews = function (removeNewsIdList) {	 
  var deferred = $q.defer();  
$http
.put($window.defultUrl +"/newsAdmin/removeNews",removeNewsIdList)
.success(function(data, status, headers, config) {  
     
      deferred.resolve(data);  
    }) 
.error(function(data, status, headers, config) {  
      deferred.reject(data);  
  });      	  
    return deferred.promise;    
};
}])

