ucr.controller("courseReviewCtrl",["$scope","$http","config","sendRequest",function($scope,$http,config,sendRequest){
    console.log("courseReviewCtrl");
    $scope.ReviewDiv=false;
    $scope.ReviewQuestion=false;
    $scope.FilterDiv=false;
    $scope.Course1 = [
        {courseId:'CSCI585',courseName:'Database Systems'},
        {courseId:'CSCI586',courseName:'Database Systems Interoperability'},
        {courseId:'CSCI571',courseName:'Web Technologies'},
        {courseId:'CSCI572',courseName:'Information Retrieval & Web Search Engines'}];


    var ratingTotal = 5;

    $scope.getRepeater = function() {
        return new Array(ratingTotal);
    };

    $scope.menuItems = ['Newest first', 'Oldest first', 'Best rating','Worst rating'];

    $scope.DisplayForm = function(event){
        $scope.ReviewQuestion=false;
        console.log(event.target.id);
        $scope.parameter=event.target.id;

        var url = config.apiRequestURL + config.ucrServerPort + config.apiGeneral + config.courseReviewReadView;
        var param = {courseNameID:$scope.parameter};

        sendRequest.post( url,param).then( function ( data ) {
            console.log(data.data);
        if(data.data.data.length > 0){

            $scope.subject=event.target.id;
            $scope.ReviewDiv=true;
            $scope.FilterDiv=true;
            $scope.Sentiments = ['Positive', 'Negative','Nuetral'];
            $scope.sem=['Spring 2016','Summer 2016','Fall 2016','Spring 2017','Summer 2017','Fall 2017'];
            console.log("CSCI586 Course Reviews");
            $scope.CourseReviews =data.data.data;
            console.log($scope.CourseReviews);

            $scope.noOfReviews = data.data.data.length;





        }else{
            alert("No reviews for this Course so far!");
            $scope.ReviewDiv=false;
            $scope.FilterDiv=false;
        }

        }, function (err) {
            console.log( err );
        });


    }
        $scope.ShowDetails=function (reviews) {


            $scope.ReviewDiv=false;
            $scope.ReviewQuestion=true;

            console.log("The reviews are");
            console.log(reviews);
            $scope.name = reviews.name;
            $scope.courseSelected = reviews.courseNameID;
            //getting the questions:
            var url = config.apiRequestURL + config.ucrServerPort + config.apiGeneral + config.getQuestions;
            sendRequest.post( url).then( function ( data1 ) {

                //console.log(data1.data.data);
                $scope.Questions = data1.data.data;
                $scope.Reviews = reviews.reviews;

                console.log("The Questions are");
                console.log($scope.Questions);
                console.log("The reviews are");
                console.log($scope.Reviews);

                var ratingTotal = 5;

                $scope.getRepeater = function() {
                    return new Array(ratingTotal);
                };
               // $scope.res = {"Question":$scope.Questions,"Review":$scope.Reviews};


            }, function (err) {
                console.log( err );
            });









        }


}]);