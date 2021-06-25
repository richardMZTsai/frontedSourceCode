'use strict';
/**
 * @ngdoc function
 * @name homeWorkApp.controller:newsAdminDeleteController
 * @description
 * # newsAdminDeleteController
 * Controller of the homeWorkApp
 */
 var app = angular.module('homeWorkApp');


 app.controller('newsAdminDeleteController', ['$scope','$filter', 'newsAdminDeleteService', function ($scope,
    $filter,newsAdminDeleteService) { 
    

    var categoryReturn = newsAdminDeleteService.getCategory();
    categoryReturn.then(function(data) {
        $scope.categoryList=angular.copy(data);
        addDefault( $scope.categoryList, "categoryId", "categoryName");
        $scope.selectedCategory = $scope.categoryList[0];

        $scope.insertCategoryList = angular.copy(data) ;
        $scope.insertObj ={category:$scope.insertCategoryList[0]};
    }); 
    
/*哪些時段被選擇，顯示於頁面*/    
    $scope.addDate = function() { 	
        console.log("$scope.addDate");
        $scope.dates = [];
        var e = $scope.date; 		 
        var startDate = $filter('date')(e.startDate, 'yyyy-MM-dd');	
        var startTime = "08:00";	
        var endDate = $filter('date')(e.endDate, 'yyyy-MM-dd');	
        var endTime = "08:00";		 
        var name =  startDate+" "+ startTime +" ~ "+ endDate +" "+endTime;
        var start =  startDate+"T"+ startTime;
        var end =  endDate +"T"+endTime;
        $scope.dates.push({startDate: startDate, startTime: startTime, endDate:endDate ,endTime: endTime,name:name ,start:start ,end:end});
    }

    /*查詢資料*/
    $scope.pageableDto = {};
    $scope.pageableDto.pageNumber = 1;
    $scope.changePage = function () {
        $scope.releasedNewsByFlexibleSearch();
    };
    $scope.releasedNewsByFlexibleSearch = function () {
        console.log("releasedNewsByFlexibleSearch")
        var idList = [];
       if( $scope.selectedCategory!=null &&$scope.selectedCategory.categoryId!="default"){
        idList.push($scope.selectedCategory.categoryId);
       }
      
   


    var paramNewsFlexibleDto={};
    paramNewsFlexibleDto["categoryIdList"] = idList;
    paramNewsFlexibleDto["createDateFrom"] = dateToStr($scope.date.startDate);
    paramNewsFlexibleDto["createDateTo"] =dateToStr($scope.date.endDate);

        var releasedNewsByFlexibleSearchReturn  = newsAdminDeleteService.releasedNewsByFlexibleSearch("4",$scope.pageableDto.pageNumber,paramNewsFlexibleDto);
        releasedNewsByFlexibleSearchReturn.then(function (data) {
            $scope.pageableDto = data;
        });
    };
   	
	
    /*預設時間*/ 
    var endDate =  new Date();
    endDate.setHours(17, 0, 0);	 
    var startDate =  new Date(endDate);
    startDate.setDate(endDate.getDate()-30);
    startDate.setHours(8, 0, 0); 	
    $scope.date={startDate: startDate, endDate:endDate};
    $scope.addDate();	 

     $scope.deleteData = function () {
         var deleteIdList = [];
        $scope.pageableDto.content.forEach(element => {
            if(element.isCheck){
                deleteIdList.push(element.newsId)
            }
        });
 		console.log(deleteIdList);
         var sendReturn  = newsAdminDeleteService.deleteNews(deleteIdList);
         sendReturn.then(function (data) {
            $scope.releasedNewsByFlexibleSearch();
        });
	}

   
     //一進來就查詢
     $scope.releasedNewsByFlexibleSearch();

      // 時間轉字串，轉成yyyy-MM-dd HH:mm:SS格式
function dateToStr(datetime){
    var dateTime = new Date(datetime);
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth()+1;//js從0開始取
    var date = dateTime.getDate();
    var hour = dateTime.getHours();
    var minutes = dateTime.getMinutes();
    var second = dateTime.getSeconds();

    if(month<10){
        month = "0" + month;
    }
    if(date<10){
        date = "0" + date;
    }
    if(hour <10){
        hour = "0" + hour;
    }
    if(minutes <10){
        minutes = "0" + minutes;
    }
    if(second <10){
        second = "0" + second ;
    }

    return year+"-"+month+"-"+date+" "+hour+":"+minutes+":"+second;
};

}]);	
	
       
    	


