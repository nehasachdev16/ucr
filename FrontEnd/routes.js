ucr.config(function($routeProvider) {
  $routeProvider.
      when("/", {templateUrl: "announcement.html"}).
      when("/announcement", {templateUrl: "announcement.html"}).
      when("/courseReview", {templateUrl: "courseReview.html"}).
      when("/profHomePage", {templateUrl: "profHomePage.html"}).
      otherwise({redirectTo: "/"});
      
      // make this demo work in plunker
     
});