/**
 *   Created by Apoorva on 11/1/2017.
**/

ucr.factory('authenticate',[ 'authToken', '$window', 'config', function ( authToken, $window, config ) {
	return{
		isAValidLoginIn: function ( tokenId ) {
			if( authToken.checkTokenValidity(tokenId) ){
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
				$window.location.href = config.apiRequestURL + config.authenticationPort + config.loginPath;
			}
		}
		
	}
}]);

ucr.factory('authToken', [ '$window', 'config', 'sendRequest', function ( $window, config, sendRequest ) {
	return {
		setToken : function( tokenName ,tokenValue ) {
			$window.localStorage.setItem( tokenName, tokenValue);
		},
		getToken : function (tokenName) {
			return $window.localStorage.getItem(tokenName);
		},
		deleteToken: function (tokenName) {
			$window.localStorage.removeItem(tokenName);
		},
		checkTokenValidity: function ( tokenId ) {
			//1. take token from url, decode jwt token and extract key:value
			//2. Take the email and user_id generated and compare it with userSession table for that jwt token
				// - see if the row still exists in the DB
			//3. If match found return true, redirect into the tool
				//else redirect back to login page
			
			var url 	= config.apiRequestURL + config.authenticationPort + config.apiGeneral+ "/validate_token";
			var data 	= { token: tokenId };
			return sendRequest.post( url, data )
		}
	}
}]);