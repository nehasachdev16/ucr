ucr.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){

	$routeProvider
		.when("/announcement", {
			templateUrl: "app/views/announcement.html"
		})
		.when("/courseReview", {
			templateUrl: "app/views/courseReview.html"
		})
		.when("/profHomePage", {
			templateUrl: "app/views/profHomePage.html"
		})
        .when("/studentAnnouncement", {
            templateUrl: "app/views/studentAnnouncement.html"
        })
		.when("/studentHomePage", {
			templateUrl: "app/views/studentCourseReview.html"
		})
	
	// .otherwise({redirectTo: "/homePage"});
	
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

}]);