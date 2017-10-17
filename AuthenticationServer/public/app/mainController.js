/**
 * Created by Apoorva on 9/19/2017.
 */
ucrLogin.controller("mainController", [ "$scope", "config", "$http" ,"sendRequest", "getErrorMessage", "getSuccessMessage","$location", "$timeout", "$window",
    function ($scope, config, $http, sendRequest, getErrorMessage, getSuccessMessage, $location, $timeout, $window) {

        //-------------- Declaring all scope variables -------------------

        $scope.appName = config.appName;

        //Load values from DB
        $scope.availableCourses = {
            "CSCI585" : "Database Systems",
            "CSCI561" : "Foundations of Artificial Intelligence",
            "CSCI562" : "Foundations of Artificial Intelligence sdkfjsdkfhaskdjfksuddfbbsadjkflks"
        };

        var path = $location.path();
        $scope.signIn = true;
        if( path == "/Login" ){ $scope.signIn = false;}

        $scope.loginCredentials = {};

        $scope.credentialsError = true;
        $scope.credentialsSuccessful = false;

        //-------------- All the functions of the scope -------------------
        $scope.handleRequest = function( url ){
            sendRequest.post(url, $scope.loginCredentials ).then( function ( data ) {
                console.log("return data : ");
                console.log( data.data );
                if( data.data.success == false ){
                    $scope.credentialsError = data.data.success;
                    $scope.errorMessage = getErrorMessage.get( data.data.errorCode );
                }else{
                    $scope.credentialsSuccessful = true;
                    $scope.errorMessage = getSuccessMessage.get( data.data.successCode );

                    $timeout( function () {
                        var path = config.apiRequestURL + config.ucrServerPort;
                        console.log( path );
                        // location.path( path );
                        $window.location.href = path;
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
    }]);

