ucr.controller("maincontroller",["$scope","$http", "sendRequest", "authenticate", "authToken", "config", "$location", "userDetailsHolder",
	function($scope, $http, sendRequest, authenticate, authToken, config, $location, userDetailsHolder){
		
		//------------------- Authentication session section ---------------------------
		$scope.validatingUser = true;
		console.log("----- begin authentication -------");
		var token = authToken.getToken('token');
		if( !token ){
			token = $location.path().split("/")[1];
		}
		
		//Check the authenticity of log in
		authToken.checkTokenValidity( token ).then( function ( res ) {
			if( res.data.success ){
				$scope.studentCourses = [];
				console.log( "valid login" );
				//Set browser token for session in :9191
				authToken.setToken( 'token', token );
				userDetailsHolder.set(res.data.token);
				
				console.log("main controller Running");
				
				//Variables required for page
				$scope.pageHead = config.appName;
				$scope.username = res.data.userIdentity.username ;
				$scope.identity = res.data.userIdentity.identity;
				
				//3. If no courses available, get all the courses! (populate it beginning - for eveytime popup opens)
				var url = config.apiRequestURL + config.ucrServerPort + config.apiGeneral + config.getAllAvailableCourses;
				sendRequest.get( url, {userId: res.data.token.userId}).then( function ( data ) {
					$scope.allAvailableCourses = data.data.data;
					$scope.allAvailableCoursesCopy = angular.copy($scope.allAvailableCourses);
				});
				
				//Set some RBAC permissions:
				// 1. Selected tab and tab names
				if( $scope.identity === "professor" ){
					$location.path("/profHomePage");
					$scope.username = "Professor " + res.data.userIdentity.username ;
					$scope.tabs = [
						{ link : 'profHomePage', 		label : 'Professor Home' },
						{ link : 'announcement', 		label : 'Announcements' },
						{ link : 'courseReview', 		label : 'Course Reviews' },
                        { link:'studentAnnouncement',	label:'Student Announcement'}
					];
				}else{
					$location.path("/studentHomePage");
					$scope.tabs = [
						{ link : 'studentHomePage', label : 'Course Reviews' },
						{ link : 'announcement', 	label : 'Professor Announcements' },
						{ link : 'courseReview', 	label : 'Questions' },
						{ link : 'courseReview', 	label : 'Lend Resources' }
					];
					
					//2. Get all the courses added by the user
					var url = config.apiRequestURL + config.ucrServerPort + config.apiGeneral + config.getCoursesSelectedByUser;
					sendRequest.post( url, {userId: res.data.token.userId}).then( function ( data ) {
						console.log( data.data );
						if( data.data.success == true ){
							$scope.studentCourses =  data.data.data;
							if( $scope.studentCourses.length === 0){
								$scope.studentCoursesNotAvailable = true;
							}else{
								$scope.studentSelectCourse( 0 );
								$scope.studentCoursesNotAvailable = false;
								
							}
						}else{
							$scope.studentCoursesNotAvailable = true;
							//3. If no courses available, get all the courses! (populate it beginning - for eveytime popup opens)
							var url = config.apiRequestURL + config.ucrServerPort + config.apiGeneral + config.getAllAvailableCourses;
							sendRequest.get( url, {userId: res.data.token.userId}).then( function ( data ) {
								$scope.allAvailableCourses = data.data.data;
								$scope.allAvailableCoursesCopy = angular.copy($scope.allAvailableCourses);
							});
							
						}
					}, function ( err ) {
						console.log("Error while fetching data");
					});

				}
				$scope.selectedIndex = 0;
				$scope.selectTab = function(index){
					$scope.selectedIndex = index;
				};
				
				//Remove the load bar
				$scope.validatingUser = false;
				
				$scope.timestamp="9/19/2017 16:57:30";
				
			}else{
				//If not valid login then logout the user, along with delete token associated with UCR
				authenticate.directUserOutside();
				authToken.deleteToken("token");
			}
		}, function ( err ) {
			authenticate.directUserOutside();
			authToken.deleteToken("token");
		});
		//------------------- Authentication session section ---------------------------
		
		$scope.logout = function() {
			var url = config.apiRequestURL + config.authenticationPort + config.apiGeneral + config.logoutAPI;
			var param = {token : token};
			sendRequest.post( url, param ).then( function ( res ) {
				$scope.validatingUser = true;
				authToken.deleteToken( 'token' );
				authenticate.directUserOutside();
			}, function ( err ) {
				console.log("error in logging out", err);
			});
		};
		console.log("----- end authentication -------");
		
		//1. Add course for the user's list
		$scope.addNewCourseToList = function ( courseData, index ) {
			var url = config.apiRequestURL + config.ucrServerPort + config.apiGeneral + config.addNewCourseToList;
			var param = {userId: userDetailsHolder.get().userId , courseId: courseData.courseId, courseName: courseData.courseName };
			sendRequest.post( url, param ).then( function ( res ) {
				if( res.data.success ){
					$scope.studentCourses = res.data.data;
				}
				$scope.allAvailableCoursesCopy.splice( index, 1 );
			}, function ( err ) {
				console.log("error in adding course", err);
			});
		};
		
		//2. Remove course from user's list
		$scope.removeNewCourseFromList = function ( courseData ) {
			var url = config.apiRequestURL + config.ucrServerPort + config.apiGeneral + config.removeCourseFromList;
			var param = {userId: userDetailsHolder.get().userId , courseId: courseData.courseId };
			sendRequest.post( url, param ).then( function ( res ) {
				if( res.data.success ){
					$scope.studentCourses = res.data.data;
				}
				$scope.allAvailableCoursesCopy.push( courseData );
			}, function ( err ) {
				console.log("error in deleting course", err);
			});
		};
		
		//Open popup to allow editing courses
		$scope.openEditCoursesPopup = function () {
			console.log( "open pop up");
			$scope.studentCoursesNotAvailable = true;
		};
		
		//Close popup after editing courses
		$scope.closeAddCoursesPopup = function () {
			if( $scope.studentCourses.length > 0){
				$scope.studentCoursesNotAvailable = false;
			}
		};
		
		$scope.studentSelectCourse = function ( index ) {
			console.log( "selected course : " + index );
			$scope.studentSelectedCourse = index;
			
			//Check which tab is selected and call the respective data population calls
			console.log( $location.path() );
			var path = $location.path();
			if( path === '/studentHomePage'){
				$scope.$broadcast('studentHomePage',$scope.studentCourses[index]);
			}
		}
		
	}]);


ucr.filter( 'inStudentArray', function ( $filter ) {
	return function(list, arrayFilter , element) {
		if ( arrayFilter ) {
			return $filter( "filter" )( list, function ( listItem ) {
				for ( var i = 0; i < arrayFilter.length; i++ ) {
					if ( arrayFilter[i][element] == listItem[element] )
						return false;
				}
				return true;
			} );
		}
	}
});

