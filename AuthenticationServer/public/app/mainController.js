/**
 * Created by Apoorva on 9/19/2017.
 */
ucrLogin.controller("mainController", [ "$scope", "config", "$http" ,"sendRequest", "getErrorMessage", "getSuccessMessage",
    "$location", "$timeout", "$window", "authToken", "authenticate",
    function ($scope, config, $http, sendRequest, getErrorMessage, getSuccessMessage, $location, $timeout, $window, authToken, authenticate) {

        //-------------- Declaring all scope variables -------------------

        $scope.appName = config.appName;
        $scope.appDescription = config.appDescription;

        //Load values from DB
        var url = config.apiRequestURL + config.ucrServerPort + config.apiGeneral + config.apiAvailableCourses;
        console.log( url );
        sendRequest.get( url ).then( function ( data ) {
            $scope.availableCourses = data.data.data;
        }, function (err) {
           console.log( err );
        });

        var path = $location.path();
        $scope.signIn = true;
        if( path == "/Login" ){ $scope.signIn = false;}

        $scope.loginCredentials = {};

        $scope.credentialsError = true;
        $scope.credentialsSuccessful = false;

        //-------------- All the functions of the scope -------------------
        
		if( authenticate.isLoggedIn() ){
			console.log("User is logged in");
			//authenticate.directUserInside();
		}else{
			console.log( "User is not logged in");
			// authenticate.directUserOutside();
		}
		
		
		$scope.handleRequest = function( url ){
            sendRequest.post(url, $scope.loginCredentials ).then( function ( data ) {
                console.log("return data : ");
                console.log( data.data );
                if( data.data.success == false ){
                    $scope.credentialsError = data.data.success;
                    $scope.errorMessage = getErrorMessage.get( data.data.errorCode );
                }else{
                    $scope.credentialsSuccessful = true;
					$scope.credentialsError = true;
                    $scope.successMessage = getSuccessMessage.get( data.data.successCode );
	
                    $timeout( function () {
                        var path = config.apiRequestURL + config.ucrServerPort + "/"+ data.data.token;
                        authenticate.directUserInside( path );
                    }, 2000);
                }
                console.log( $scope.errorMessage );
            }, function (err) {
                console.log( err );
            });
        };

        $scope.submitLoginCredentials = function () {
            console.log("submit login credentials ");
            console.log( $scope.loginCredentials );
            
            var url = config.apiRequestURL + config.apiRequestPort + config.apiGeneral + config.apiLoginUser;
            console.log( url );

            $scope.handleRequest( url );

        };

        $scope.submitSignupCredentials = function (){
            console.log("submit sign up credentials ");
            console.log( $scope.loginCredentials );

            var url = config.apiRequestURL + config.apiRequestPort + config.apiGeneral + config.apiSignupUser;
            console.log( url );

            $scope.handleRequest( url );
        };
        
        $scope.logout = function () {
			authToken.deleteToken('token');
			
			var windowPath = config.apiRequestURL + config.apiRequestPort;
			$window.location.href = path;
		};
        
    }]);

