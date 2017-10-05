ucr.controller("announcementCtrl",["$scope","$http",function($scope,$http){
	console.log("announcementCtrl");
	$scope.myValue=false;

$scope.Course1 = [
   {courseId:'CSCI585',courseName:'Database Systems'},
   {courseId:'CSCI586',courseName:'Database Systems Interoperability'},
   {courseId:'CSCI571',courseName:'Web Technologies'},
   {courseId:'CSCI572',courseName:'Information Retrieval & Web Search Engines'}];

$scope.DisplayForm = function(event){
	console.log(event.target.id);
   // alert(event.target.id);
    $scope.subject=event.target.id;
    $scope.myValue=true;
   $scope.myTextArea1 = null;
   $scope.myTextArea2 = null;
   $scope.myTextArea3 = null;
   $scope.myTextArea4 = null;
}

}]);