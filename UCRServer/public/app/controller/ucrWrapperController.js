/**
 *  Created by Apoorva on 11/1/2017.
 **/

ucr.controller("ucrWrapperController",["$scope", function($scope){
	console.log("ucr wrapper controller Running");
	console.log( $scope.identity );
	
	//Tabs ng-route
	$scope.tabs = [
		{ link : 'profHomePage', label : 'Professor Home' },
		{ link : 'announcement', label : 'Announcements' },
		{ link : 'courseReview', label : 'Course Reviews' }
	
	];
	
	$scope.selectedTab = $scope.tabs[0];
	$scope.setSelectedTab = function(tab) {
		$scope.selectedTab = tab;
	}
	
	$scope.tabClass = function(tab) {
		if ($scope.selectedTab == tab) {
			return "active";
		} else {
			return "";
		}
	}
	
	
	
}]);
