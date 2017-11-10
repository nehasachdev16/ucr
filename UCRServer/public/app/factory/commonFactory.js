/**
 * Created by Apoorva on 10/20/2017.
 */

ucr.factory("sendRequest", ['$http',function ($http) {
	return {
		get : function (url) {
			return $http.get(url);
		},
		
		post : function (url, data) {
			return $http.post(url,data);
		}
	}
}]);
