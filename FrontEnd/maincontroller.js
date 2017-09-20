var ucr = angular.module("ucr", []);

ucr.controller("maincontroller",["$scope","$http",function($scope,$http){

	console.log("Controller Running");

	//Variable Names 
	$scope.pageHead="University Course Reviews";
	$scope.ProfName="Saty";	
	$scope.timestamp="9/19/2017 16:57:30";
	}]);	