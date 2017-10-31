ucr.controller("courseReviewCtrl",["$scope","$http",function($scope,$http){
    console.log("courseReviewCtrl");
    $scope.ReviewDiv=false;
    $scope.FilterDiv=false;
    $scope.Course1 = [
        {courseId:'CSCI585',courseName:'Database Systems'},
        {courseId:'CSCI586',courseName:'Database Systems Interoperability'},
        {courseId:'CSCI571',courseName:'Web Technologies'},
        {courseId:'CSCI572',courseName:'Information Retrieval & Web Search Engines'}];

    $scope.CourseReviews = [
        {},{},{},{},{}];
    var ratingTotal = 5;

    $scope.getRepeater = function() {
        return new Array(ratingTotal);
    };

    $scope.menuItems = ['Newest first', 'Oldest first', 'Best rating','Worst rating'];

    $scope.DisplayForm = function(event){
        console.log(event.target.id);
        $scope.subject=event.target.id;
        $scope.ReviewDiv=true;
        $scope.FilterDiv=true;
        $scope.Sentiments = ['Positive', 'Negative','Nuetral'];
        $scope.sem=['Spring 2016','Summer 2016','Fall 2016','Spring 2017','Summer 2017','Fall 2017'];


        if($scope.subject == "CSCI586 Database Systems Interoperability")
        {
            console.log("CSCI586 Course Reviews");
            $scope.CourseReviews =[];
            $scope.CourseReviews = [
                {Name:'Aakanksha Pincha', date: 'May 1st, 2017',Term :'Fall 2016',StarRating:[1,2,3,4],data: 'Lot of informative papers provided in the course. Very knowledgeable subject. Advise to take it it in Fall semester only.Course Grading is also not very strict'},
                {Name:'Neha Sachdev', date: 'May 31st, 2017',Term :'Fall 2016',StarRating:[1,2,3,4],data: 'Technology Oriented Course. Lot of informative papers provided in the course. Very knowledgeable subject. Advise to take it it in Fall semester only.Course Grading is also not very strict'},
                {Name:'Apoorva Viswanath', date: 'Aug 1st, 2017',Term :'Fall 2016',StarRating:[1,2,3],data: 'Ontology learnings. Lot of informative papers provided in the course. Very knowledgeable subject. Advise to take it it in Fall semester only.Course Grading is also not very strict'},
                {Name:'Anushree Ramanath', date: 'July 1st, 2017',Term :'Fall 2016',StarRating:[1],data: 'Good Projects. Lot of informative papers provided in the course. Very knowledgeable subject. Advise to take it it in Fall semester only.Course Grading is also not very strict'},
                {Name:'Aanchal Gupta', date: 'July 1st, 2017',Term :'Fall 2016',StarRating:[1,2],data: 'Tough Course. Lot of informative papers provided in the course. Very knowledgeable subject. Advise to take it it in Fall semester only.Course Grading is also not very strict'}];


        }

        if($scope.subject == "CSCI585 Database Systems")
        {
            $scope.CourseReviews =[];

        }

        if($scope.subject == "CSCI571 Web Technologies")
        {
            $scope.CourseReviews =[];
        }

        if($scope.subject == "CSCI572 Information Retrieval & Web Search Engines")
        {
            $scope.CourseReviews =[];
        }

    }



}]);