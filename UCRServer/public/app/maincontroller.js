ucr.controller("maincontroller",["$scope","$http",function($scope,$http){

	console.log("main controller Running");

	//Variable Names 
	$scope.pageHead="University Course Reviews";
	$scope.ProfName="Saty";	
	$scope.timestamp="9/19/2017 16:57:30";

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
