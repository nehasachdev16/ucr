ucr.controller("ProfessorCtrl",["$scope","$http",function($scope,$http){
	console.log("ProfessorCtrl");

   $scope.currentSem="Fall 2017";
   $scope.prevSem="Summer 2017";

   $scope.Course1 = [
   {courseId:'CSCI585',courseName:'Database Systems',colab:'Prof. *****',venue:'SAL127',timings:'M W 6:30pm - 9:30pm'},
   {courseId:'CSCI586',courseName:'Database Systems Interoperability',colab:'Prof. *****',venue:'SGM123',timings:'T Th 4:30pm - 9:30pm'},
   {courseId:'CSCI571',courseName:'Web Technologies',colab:'Prof. *****',venue:'OHE101',timings:'F 4:30pm - 9:30pm'},
   {courseId:'CSCI572',courseName:'Information Retrieval & Web Search Engines',colab:'Prof. *****',venue:'SAL127',timings:'M W 6:30pm - 9:30pm'}];

   $scope.Course2 = [
   {courseId:'CSCI586',courseName:'Database Systems Interoperability',colab:'Prof. *****',venue:'SGM123',timings:'T Th 4:30pm - 9:30pm'},
   {courseId:'CSCI572',courseName:'Information Retrieval & Web Search Engines',colab:'Prof. *****',venue:'SAL127',timings:'M W 6:30pm - 9:30pm'}];
}]);