'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
var app = angular.module('homeWorkApp');
app.directive('header',function(){
		return {
        templateUrl:'scripts/directives/header/header.html',
        restrict: 'E',
        replace: true,
    	}
	});

