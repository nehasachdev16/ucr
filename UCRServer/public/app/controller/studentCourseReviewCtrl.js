/**
 * Created by Apoorva on 11/8/2017.
 **/
ucr.controller("studentCourseReviewCtrl",["$scope", "$http", "sendRequest",function($scope,$http){

	// $scope.$parent.$watch( $scope.$parent.studentSelectedCourse, function (newVal) {
	// 	console.log( "-------------value updated" );
	// });
	//
	$scope.$on('studentHomePage', function(event, args){
		console.log("-------------value updated");
		console.log( args );
		//any other action can be perfomed here
	});
}]);