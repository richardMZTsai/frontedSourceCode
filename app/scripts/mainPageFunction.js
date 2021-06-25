'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('homeWorkApp')
	/*ajax 是否完成讀取*/
	.factory('httpInterceptor', ['$q', '$rootScope',
		function ($q, $rootScope) {
			var loadingCount = 0;
			return {
				request: function (config) {
					if (++loadingCount === 1) $rootScope.$broadcast('loading:progress');
					return config || $q.when(config);
				},

				response: function (response) {
					if (--loadingCount === 0) $rootScope.$broadcast('loading:finish');
					return response || $q.when(response);
				},

				responseError: function (response) {
					if (--loadingCount === 0) $rootScope.$broadcast('loading:finish');
					return $q.reject(response);
				}
			};
		}
	]).config(['$httpProvider', function ($httpProvider) {
		$httpProvider.interceptors.push('httpInterceptor');
	}])
	
	/*彈出視窗*/
	.directive('modal', function () {
		return {
			template: '<div class="modal fade">' +
				'<div class="modal-dialog">' +
				'<div class="modal-content">' +
				'<div class="modal-header">' +
				'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
				'<h4 class="modal-title">{{ title }}</h4>' +
				'</div>' +
				'<div class="modal-body" ng-transclude></div>' +
				'<div class="modal-footer">' +
				'<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>',
			restrict: 'E',
			transclude: true,
			replace: true,

			scope: true,
			link: function postLink(scope, element, attrs) {
				scope.title = attrs.title;
				scope.$watch(attrs.visible, function (value) {

					if (value == true) {
						$(element).modal('show');
					} else {
						$(element).modal('hide');
					}
				});

				$(element).on('shown.bs.modal', function () {
					scope.$apply(function () {
						scope.$parent[attrs.visible] = true;
					});
				});

				$(element).on('hidden.bs.modal', function () {
					scope.$apply(function () {
						scope.$parent[attrs.visible] = false;
					});
				});
			}
		};
	})

	/*彈出視窗可拖曳*/
	.directive('modaldraggable', function ($document) {
		"use strict";
		return function (scope, element) {
			var startX = 0,
				startY = 0,
				x = 0,
				y = 0;
			element = angular.element(document.getElementsByClassName("modal-dialog"));
			var elementH = angular.element(document.getElementsByClassName("modal-header"));
			for (var i = 0; i < elementH.length; i++) {
				elementH[i].style.cursor = "move";
			}

			elementH.on('mousedown', function (event) {
				// Prevent default dragging of selected content
				event.preventDefault();
				startX = event.screenX - x;
				startY = event.screenY - y;
				$document.on('mousemove', mousemove);
				$document.on('mouseup', mouseup);
			});

			function mousemove(event) {
				y = event.screenY - startY;
				x = event.screenX - startX;
				element.css({
					top: y + 'px',
					left: x + 'px'
				});
			}

			function mouseup() {
				$document.unbind('mousemove', mousemove);
				$document.unbind('mouseup', mouseup);
			}


		};
	})

/*下拉選單加入--請選擇--*/
function addDefault(array, itemId, itemName) {
	var c = array.length + 1;
	//找尋是否已經有插入過資料
	var temp = array[0];
	if (typeof temp == "undefined" || temp[itemId] != "default") {
		var item = {};
		item[itemId] = "default";
		item[itemName] = "--請選擇--";
		array.splice(0, 0, item);
	}
}

/*檢查加入--請選擇--*/
function checkIsDefault(x, message) {
	if (x == "default") {
		if (message.length != 0) {
			alert("系統提醒：" + message);
		}
		return false;
	} else {
		return true;
	}

}
/*移除陣列裡的項目*/
function removeArrayItem(array, x) {
	array.splice(x, 1);
}

/*檢查必填項目*/
function isRequired($scope, form) {
	if (!form.$valid) {
		alert("請輸入必填欄位!");
		return true;
	}
}

