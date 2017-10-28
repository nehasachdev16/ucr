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
   $scope.About = null;
   $scope.Exam = null;
   $scope.OfficeHours = null;
   $scope.Info = null;
}

$scope.SubmitForm = function(){
	alert("Your changes have been Submitted, Thank you Proffessor!");
	$scope.result = {"Subject Name": $scope.subject, "About": $scope.About, "Exam:": $scope.Exam, "Office Hours": $scope.OfficeHours, "Extra Info": $scope.Info};
	//alert($scope.subject + $scope.About + $scope.Exam + $scope.OfficeHours + $scope.Info);
	alert($scope.result);
	//window.location.reload();
	window.location.href ="index.html";
}

}]);