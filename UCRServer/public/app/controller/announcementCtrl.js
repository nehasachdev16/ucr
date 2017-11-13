//ucr.controller("announcementCtrl",["$scope","config","sendRequest", "getErrorMessage", "getSuccessMessage","$http",function($scope,$http){

ucr.controller("announcementCtrl", [ "$scope", "config", "$http" ,"sendRequest",
   function ($scope, config, $http, sendRequest) {

    console.log("announcementCtrl");
	$scope.myValue=false;

	$scope.appName= config.appName;
	console.log($scope.appName);

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

    $scope.handleRequest = function(url) {
        //$scope.dbData = data;
        //console.log("In handle Request");
        console.log($scope.announceData);
        $scope.credentialsError = true;
        $scope.credentialsSuccessful = false;

        sendRequest.post(url, $scope.announceData ).then( function ( data ) {
            console.log("return data : ");
            console.log( data.data );

        }, function (err) {
            console.log( err );
        });

    };
    $scope.SubmitForm = function(){
        alert("Your changes have been Submitted, Thank you Proffessor!");

        if($scope.About == undefined){
            $scope.About = null;
        }
        if($scope.Exam == undefined){
            $scope.Exam = null;
        }
        if($scope.OfficeHours == undefined){
            $scope.OfficeHours = null;
        }
        if($scope.Info == undefined){
            $scope.Info = null;
        }
        $scope.announceData = {"courseNameID": $scope.subject, "courseInfo": $scope.About, "examInfo": $scope.Exam, "officeInfo": $scope.OfficeHours, "moreInfo": $scope.Info};
        //alert($scope.subject + $scope.About + $scope.Exam + $scope.OfficeHours + $scope.Info);
       // alert($scope.announceData);

        var url = config.apiRequestURL + config.ucrServerPort + config.apiGeneral + config.announcementCourse;
        console.log( url );

        $scope.handleRequest( url );

        //window.location.reload();

        //window.location.href ="index.html";
    }
}]);