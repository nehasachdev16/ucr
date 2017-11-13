ucr.controller("studentAnnounce",["$scope","$http","config","sendRequest",function($scope,$http,config,sendRequest){
    console.log("Student Announcement Page");
    //$scope.filterannounce = false;
    $scope.courseNames = ["CSCI585 Database Systems",
                    "CSCI586 Database Systems Interoperability",
                    "CSCI571 Web Technologies",
                    "CSCI572 Information Retrieval & Web Search Engines"];

    //console.log($scope.courseNames);

    $scope.SubmitForm = function(){
        //alert("Here are the announcements for the"+$scope.courseName);
        console.log($scope.courseName); // you will get the selected value here, if you want it after button click.
        //console.log(Date.now());
        var url = config.apiRequestURL + config.ucrServerPort + config.apiGeneral + config.studentAnnouncement;
        console.log( url );
        //getting the announcement and displaying it in Student Announcement Page
        var param = {courseName:$scope.courseName};
        sendRequest.post( url,param).then( function ( data ) {

                console.log(data.data.data.length);
                if(data.data.data.length == 0){

                    $scope.filterannounce=false;
                    alert("Sorry, No announcement made for this course");
                }
                else {
                    $scope.filterannounce = true;
                    console.log(data.data.data[0].courseNameID);

                    //getting all the details required to display on Students Announcement Page
                    $scope.headerCourseName = "Course Name and ID";
                    $scope.headerCourseInfo = "Brief Details about the course";
                    $scope.headerExamDetails = "Exam and Assignment Details";
                    $scope.headerOffice = "Office hours Information";
                    $scope.headermoreInfo = "More Information about the course";
                    $scope.courseName1 = data.data.data[0].courseNameID;
                    $scope.officeInfo = data.data.data[0].officeInfo;
                    $scope.examInfo = data.data.data[0].examInfo;
                    $scope.courseInfo = data.data.data[0].courseInfo;
                    $scope.moreInfo = data.data.data[0].moreInfo;
                }
                //$scope.availableCourses = data.data.data;
        }, function (err) {
            console.log( err );
        });




    };


}]);