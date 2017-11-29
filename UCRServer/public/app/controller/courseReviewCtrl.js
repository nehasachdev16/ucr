ucr.controller("courseReviewCtrl",["$scope","$http","config","sendRequest",function($scope,$http,config,sendRequest){
	console.log("courseReviewCtrl");
	$scope.ReviewDiv=false;
	$scope.ReviewQuestion=false;
	$scope.FilterDiv=false;
	
	//A. get all courses for which reviews are available:
	var url = config.apiRequestURL + config.ucrServerPort + config.apiGeneral + config.apiAvailableCourses;
	console.log( url );
	sendRequest.get( url ).then( function ( data ) {
		$scope.Course1 = data.data.data;
		console.log( $scope.Course1);
	}, function (err) {
		console.log( err );
	});
	// $scope.Course1 = [
	// 	{courseId:'CSCI585',courseName:'Database Systems'},
	// 	{courseId:'CSCI586',courseName:'Database Systems Interoperability'},
	// 	{courseId:'CSCI571',courseName:'Web Technologies'},
	// 	{courseId:'CSCI572',courseName:'Information Retrieval & Web Search Engines'}];
	
	
	var ratingTotal = 5;
	
	$scope.getRepeater = function() {
		return new Array(ratingTotal);
	};
	
	$scope.menuItems = ['Newest first', 'Oldest first', 'Best rating','Worst rating'];
	
	$scope.DisplayForm = function(event,courseId){
		$scope.ReviewQuestion=false;
		console.log(event.target.id);
		$scope.parameter=event.target.id;
		
		var url = config.apiRequestURL + config.ucrServerPort + config.apiGeneral + config.getAllReviews;
		var param = {courseId:courseId};
		
		sendRequest.post( url,param).then( function ( data ) {
			if(data.data.data.length > 0){
				
				$scope.subject=event.target.id;
				$scope.ReviewDiv=true;
				$scope.FilterDiv=true;
				$scope.Sentiments = ['Positive', 'Negative','Nuetral'];
				$scope.sem=['Spring 2016','Summer 2016','Fall 2016','Spring 2017','Summer 2017','Fall 2017'];
				console.log("CSCI586 Course Reviews");
				$scope.CourseReviews =data.data.data;
				console.log($scope.CourseReviews);
				
				$scope.noOfReviews = data.data.data.length;
				
			}else{
				alert("No reviews for this Course so far!");
				$scope.ReviewDiv=false;
				$scope.FilterDiv=false;
			}
			
		}, function (err) {
			console.log( err );
		});
		
		
	}
	$scope.ShowDetails=function (review) {
		
		$scope.Reviews = review.review;
		
		$scope.ReviewDiv=false;
		$scope.ReviewQuestion=true;
		
		$scope.name = reviews.userName;
		$scope.courseSelected = reviews.courseNameID;

		var ratingTotal = 5;
		$scope.getRepeater = function() {
			return new Array(ratingTotal);
		};
	}
	
	
}]);