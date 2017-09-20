/**
 * Created by Apoorva on 9/19/2017.
 */

ucrLogin.factory("sendRequest", ['$http',function ($http) {
    return {
        get : function (url) {
            return ($http.get(url));
        },

        post : function (url, data) {
            return $http.jsonp(url,data);
        }
    }
}]);
