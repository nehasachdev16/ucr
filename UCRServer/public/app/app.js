var ucr = angular.module("ucr", ["ngRoute","jkAngularRatingStars","ui.toggle"]);


var description = "is an platform for ...... \n Neha write something good here";
ucr.constant('config', {
	appName             : 'University Course Review',
	appDescription      : description,
	apiRequestURL       : 'http://localhost',
	authenticationPort  : ':9090',
	apiGeneral          : '/api',
	ucrServerPort       : ':9191',
	
	loginPath			: '/Login',
	logoutAPI			: '/logout',
	
	getCoursesSelectedByUser	: '/get_course_to_review_list',
	getAllAvailableCourses		: '/get_offered_courses',
	addNewCourseToList			: '/add_course_to_review_list',
	removeCourseFromList		: '/delete_course_from_review_list',
	apiSignupUser               : '/signup_user',
	apiLoginUser                : '/authenticate_user',
	getAllReviews				: '/get_all_course_review',		//Incase replacement is needed, change this handle
	getAllReviewQuestions		: '/get_all_review_question',
	addNewReview				: '/add_new_review',
	
	availableTerms				: ["Fall-2015","Spring-2016","Summer-2016","Fall-2016","Spring-2017","Summer-2017","Fall-2017"],
	
	apiAvailableCourses         : '/get_available_courses',
	announcementCourse          : '/add_to_available_courses',
	studentAnnouncement         : '/get_announcement',
	courseReviewStudent         : '/add_courseReview_Student',
	courseReviewReadView        : '/get_courseReview',
	getQuestions                : '/get_questions'
});

ucr.constant('errorCodes',{
	1: 'Required fields are empty',
	2: 'Email already is registered',
	3: 'Error in email or password', // Need to keep 3 and 4 generic for security reasons
	4: 'Error in email or password',
	5: 'Required fields are empty'
});

ucr.constant('successCode',{
	0: 'Successful login... Redirecting',
	1: 'User Successfully authenticated'
});

