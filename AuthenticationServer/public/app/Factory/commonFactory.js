/**
 * Created by Apoorva on 9/19/2017.
 */

ucrLogin.factory("sendRequest", ['$http',function ($http) {
    return {
        get : function (url) {
            return $http.get(url);
        },

        post : function (url, data) {
            return $http.post(url,data);
        }
    }
}]);

ucrLogin.factory("getErrorMessage", ['errorCodes',function ( errorCodes ) {
   return{
       get : function ( code ) {
            return errorCodes[code];
       }
   }
}]);

ucrLogin.factory("getSuccessMessage", ['successCode',function ( successCode ) {
   return{
       get : function ( code ) {
            return successCode[code];
       }
   }
}]);
