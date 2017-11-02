/*
    Created by Apoorva on 10/31/2017.
*/

ucrLogin.factory('authenticate',[ 'authToken', '$window', 'config', function ( authToken, $window, config ) {
	return{
		isLoggedIn: function () {
			if( authToken.getToken('token') ){
				console.log( authToken.getToken('token'));
				return true
			}else{
				return false;
			}
		},
		directUserInside: function ( path ) {
			if( path ){
				$window.location.href = path;
			}else{
				$window.location.href = config.apiRequestURL + config.ucrServerPort;
			}
		},
		directUserOutside: function ( path ) {
			if( path ){
				$window.location.href = path;
			}else{
				$window.location.href = config.apiRequestURL + config.apiRequestPort;
			}
		}
		
	}
}]);

ucrLogin.factory('authToken', [ '$window', function ( $window ) {
	return {
		setToken : function( token ) {
			$window.localStorage.setItem('token',token);
		},
		getToken : function (tokenName) {
			return $window.localStorage.getItem(tokenName);
		},
		deleteToken: function (tokenName) {
			$window.localStorage.removeItem(tokenName);
		}
	}
}]);