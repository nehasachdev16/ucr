var ucrLogin = angular.module("ucr",['ngRoute','ngAnimate']);

var description = "is an platform for ...... \n Neha write something good here";
ucrLogin.constant('config', {
    appName             : 'University Course Review',
    appDescription      : description,
    apiRequestURL       : 'http://localhost',
    apiRequestPort      : ':9090',
    apiGeneral          : '/api',
    ucrServerPort       : ':9191',
    apiSignupUser       : '/signup_user',
    apiLoginUser        : '/authenticate_user',
    apiAvailableCourses : '/get_available_courses_in_UCR',
    announcementCourse  : '/announcement_submit'
});

ucrLogin.constant('errorCodes',{
    1: 'Required fields are empty',
    2: 'Email already is registered',
    3: 'Error in email or password', // Need to keep 3 and 4 generic for security reasons
    4: 'Error in email or password',
    5: 'Required fields are empty'
});

ucrLogin.constant('successCode',{
    0: 'Successful login... Redirecting',
    1: 'User Successfully authenticated'
});

// ucrLogin.config( function () {
//   console.log("testing the config from app.js");
// });