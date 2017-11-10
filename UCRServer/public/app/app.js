var ucr = angular.module("ucr", ["ngRoute"]);

ucr.constant('config', {
	appName             : 'University Course Review',
	apiRequestURL       : 'http://localhost',
	authenticationPort  : ':9090',
	apiGeneral          : '/api',
	ucrServerPort       : ':9191',
	loginPath			: '/Login',
	logoutAPI			: '/logout',
	
	getCoursesSelectedByUser	: '/get_course_to_review_list',
	getAllAvailableCourses		: '/get_offered_courses',
	addNewCourseToList			: '/add_course_to_review_list',
	removeCourseFromList		: '/delete_course_from_review_list'
});