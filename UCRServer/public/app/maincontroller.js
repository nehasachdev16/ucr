ucr.controller("maincontroller",["$scope","$http", "sendRequest", "authenticate", "authToken", "config", "$location",
	function($scope, $http, sendRequest, authenticate, authToken, config, $location){
		
		//------------------- Authentication session section ---------------------------
		$scope.validatingUser = true;
		console.log("----- begin authentication -------");
		var token = authToken.getToken('token');
		if( !token ){
			token = $location.path().split("/")[1];
		}
		authToken.checkTokenValidity( token ).then( function ( res ) {
			if( res.data.success ){
				console.log( "valid login" );
				authToken.setToken( 'token', token );
				$location.path("/profHomePage");
				$scope.validatingUser = false;
				
				console.log("main controller Running");
				
				//Variables required for page
				$scope.pageHead = config.appName;
				$scope.username = res.data.userIdentity.username ;
				$scope.identity = res.data.userIdentity.identity;
				if( $scope.identity === "professor" ){
					$scope.username = "Professor " + res.data.userIdentity.username ;
				}
				$scope.timestamp="9/19/2017 16:57:30";
				
			}else{
				authenticate.directUserOutside();
				authToken.deleteToken("token");
			}
		}, function ( err ) {
			authenticate.directUserOutside();
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
		
	}]);
