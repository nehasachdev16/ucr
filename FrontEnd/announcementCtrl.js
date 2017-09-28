ucr.controller("announcementCtrl",["$scope","$http",function($scope,$http){
	console.log("announcementCtrl");

$scope.Course1 = [
   {courseId:'CSCI585',courseName:'Database Systems'},
   {courseId:'CSCI586',courseName:'Database Systems Interoperability'},
   {courseId:'CSCI571',courseName:'Web Technologies'},
   {courseId:'CSCI572',courseName:'Information Retrieval & Web Search Engines'}];

$scope.DisplayForm = function(id){
    alert("Neha");
}

}]);