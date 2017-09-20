/**
 * Created by Apoorva on 9/19/2017.
 */
ucrLogin.controller("mainController", [ "$scope", "sendRequest", "config", "$http" , function ($scope, sendRequest, config, $http) {

    console.log("Controller called !");
    console.log( config.appName );
    $scope.appName = config.appName;

    $scope.availableCourses = {
        "CSCI585" : "Database Systems",
        "CSCI561" : "Foundations of Artificial Intelligence",
        "CSCI562" : "Foundations of Artificial Intelligence sdkfjsdkfhaskdjfksuddfbbsadjkflks"
    }

    $scope.signIn = true;

    $scope.loginCredentials = {};

    $scope.submitLoginCredentials = function () {
        console.log("function ");
        console.log( $scope.loginCredentials );
    }
}]);

