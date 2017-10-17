/**
 * Created by Apoorva on 10/11/2017.
 */
ucrLogin.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
    $routeProvider
        .when('/',{
            templateUrl: 'app/views/authenticationPageHolder.html',
            controller: 'mainController'
        })
        .when('/Login',{
            templateUrl: 'app/views/authenticationPageHolder.html',
            controller: 'mainController'
        })
        .otherwise({redirectTo:'/'});

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);