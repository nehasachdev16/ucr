/**
 * Created by Apoorva on 11/8/2017.
 **/
ucr.controller("studentCourseReviewCtrl",["$scope", "$http", "sendRequest", "config", "userDetailsHolder",
	function($scope, $http, sendRequest, config, userDetailsHolder){
		
		$scope.currentPage = 1;
		$scope.pageSize = 5;
		
		$scope.numberOfStars = 5;
		$scope.completeReview = {"review": []};
		$scope.review = [];
		$scope.courseDetails = {};
		
		$scope.requestReceived = false;
		$scope.$on('studentHomePage', function(event, args){
			console.log("-------------value updated");
			console.log( args );
			
			$scope.courseDetails = args;
			$scope.requestReceived = true;
			$scope.courseReview = [];
			
			$scope.getAllReviews( args );
		});
		
		//Get all the terms
		$scope.availableTerms = config.availableTerms;
		
		//Get all the sentiments
		$scope.availableSentiments	= config.sentiments;
		
		//A1. Get all the reviews - replace it if required
		$scope.getAllReviews = function ( courseDetails ) {
			
			var url = config.apiRequestURL + config.ucrServerPort + config.apiGeneral + config.getAllReviews;
			var param = {courseId: courseDetails.courseId};
			
			sendRequest.post( url, param ).then( function ( res ) {
				if( res.data.success ) {
					$scope.errInFetchingReview = false;
					if( res.data.data.length > 0 ) {
						$scope.noReviewDataAvailable = false;
						$scope.courseReview = res.data.data;
					}else{
						$scope.noReviewDataAvailable = true;
					}
				}else {
					$scope.errInFetchingReview = true;
				}
			}, function ( err ) {
				console.log("error in getting all reviews", err);
			});
		};
		
		//A2. Add a new review
		$scope.addANewReview = function () {
			$scope.addANewReviewScreen = true;
			$scope.clearAllReview();
			//A3. Get all the questions
			var url = config.apiRequestURL + config.ucrServerPort + config.apiGeneral + config.getAllReviewQuestions;
			console.log( url );
			sendRequest.get( url ).then( function ( res ) {
				if( res.data.success ) {
					if( res.data.data.length > 0 ) {
						$scope.reviewQuestions = res.data.data;
					}
				}
			}, function ( err ) {
				console.log("error in getting all questions", err);
			});
			
			
		};
		
		//A5. clear the review
		$scope.clearAllReview = function () {
			$scope.completeReview = {"review": []};
		};
		
		//A4. submit the form - validate, put all parameters, submit
		$scope.submitReview = function(){
			if( $scope.completeReview.review.length > 0 && $scope.completeReview.review.length === $scope.reviewQuestions.length &&
				$scope.completeReview.generalReview !== undefined
			){
				var avgStarRating = 0;
				var count = 0;
				angular.forEach( $scope.completeReview.review, function ( value, key ) {
					if( value.rating !== undefined && value.rating > 0 ){
						count += 1;
						avgStarRating += value.rating;
						$scope.completeReview.review[key]["question"] = $scope.reviewQuestions[key]['question'];
					}else{
						$scope.reviewAnswersMissing = true;
					}
				});
				if( count === $scope.reviewQuestions.length ){
					console.log("can submit : ");
					$scope.completeReview.userId 		= userDetailsHolder.get().userId;
					$scope.completeReview.courseId 		= $scope.courseDetails.courseId;
					$scope.completeReview.avgStarRating = Math.ceil(avgStarRating/count);
					if( $scope.completeReview.showIdentity ){
						$scope.completeReview.userName	= userDetailsHolder.get().username;
					}
					
					$scope.reviewAnswersMissing = false;
					var url = config.apiRequestURL + config.ucrServerPort + config.apiGeneral + config.addNewReview;
					console.log( url );
					console.log($scope.completeReview );
					sendRequest.post( url, $scope.completeReview ).then(function ( res ) {
						if( res.data.success ){
							$scope.addANewReviewScreen 		= false;
							$scope.someErrorinReviewScreen 	= false;
							$scope.requestReceived			= true;
							$scope.noReviewDataAvailable 	= false;
							
							//Once inserted get all the reviews for the subject
							$scope.getAllReviews( {courseId: $scope.completeReview.courseId} );
						}else{
							$scope.someErrorinReviewScreen = true;
						}
					},function ( err ) {
						console.log( "error in inserting new review" );
					});
					
					//Add the course to out list of courses for which we have a review
					var url1 = config.apiRequestURL + config.ucrServerPort + config.apiGeneral + config.apiAddACourseToUCR;
					var param = {courseId: $scope.courseDetails.courseId, courseName: $scope.courseDetails.courseName};
					console.log(url1);
					console.log($scope.courseDetails);
					sendRequest.post( url1, param ).then( function ( res ) {
						if( res.data.success ){
							console.log("new course added into UCR list of reviews");
						}else{
							console.log("error in inserting course into UCR");
						}
					}, function ( err ) {
						console.log( "error in inserting course into UCR" );
					});
				}
			}else{
				$scope.reviewAnswersMissing = true;
			}
		};
		
		//A6. just close the popup to add a new review
		$scope.closeAddReviewPopup = function () {
			$scope.addANewReviewScreen = false;
		}
		
	}]);