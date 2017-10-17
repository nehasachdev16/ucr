ucr.config(function($routeProvider) {
  $routeProvider.
     // when("/", {templateUrl: "html/profHomePage.html"}).
      when("/announcement", {templateUrl: "announcement.html"}).
      when("/courseReview", {templateUrl: "courseReview.html"}).
      when("/profHomePage", {templateUrl: "profHomePage.html"}).
      otherwise({redirectTo: "/profHomePage"});
      
      // make this demo work in plunker
     
});

