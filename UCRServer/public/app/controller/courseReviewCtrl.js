ucr.controller("courseReviewCtrl",["$scope","$http","config","sendRequest",function($scope,$http,config,sendRequest){
    console.log("courseReviewCtrl");
    $scope.ReviewDiv=false;
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
        $scope.ShowDetails=function (data) {

            //getting the questions:
            var url = config.apiRequestURL + config.ucrServerPort + config.apiGeneral + config.getQuestions;
            sendRequest.post( url).then( function ( data ) {

                console.log(data);
            }, function (err) {
                console.log( err );
            });



            //Question 1 Details for the clicked user
            $scope.Q1Review = data.Q1.review;
            $scope.Q1Rating = data.Q1.rating;

            //Question 2 Details for the clicked user
            $scope.Q2Review = data.Q2.review;
            $scope.Q2Rating = data.Q2.rating;

            //Question3 details for the clicked user
            $scope.Q3Review = data.Q3.review;
            $scope.Q3Rating = data.Q3.rating;

            //Question4 details for the clicked user
            $scope.Q4Review = data.Q4.review;
            $scope.Q4Rating = data.Q4.rating;

            //Question5 details for the clicked user
            $scope.Q5Review = data.Q5.review;
            $scope.Q5Rating = data.Q5.rating;




        }


}]);