var ucr = angular.module("ucr", ["ngRoute"]);

ucr.constant('config', {
	appName             : 'University Course Review',
	apiRequestURL       : 'http://localhost',
	authenticationPort  : ':9090',
	apiGeneral          : '/api',
	ucrServerPort       : ':9191',
	loginPath			: '/Login',
	logoutAPI			: '/logout'
});