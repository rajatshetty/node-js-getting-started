/**
 * Created by rshetty2 on 9/14/15.
 */

'use strict';
angular.module("app", []).config(["$routeProvider",function($routeProvider) {
    $routeProvider.
        when('/welcome', {
            templateUrl: '../htmls/welcome.html',
            controller: initController
        }).
        when('/page1', {
            templateUrl: '../htmls/page1.html',
            controller: page1Controller
        }).
        when('/page2', {
            templateUrl: '../htmls/page2.html',
            controller: page2Controller
        }).
        otherwise({
            redirectTo: '/welcome'
        });
}]).run(function($rootScope,$location){

    $rootScope.gotoPage=function(uri){
        $location.url(uri);
    }

});


angular.module("app").factory("DataStore",['$http',function($http){

    this.getWelcomePageData=function(){
        return "Data for welcome page from factory";
    }

    this.getPage1Data=function(){
        return "Data for Page 1 from factory";
    }

    this.getPage2Data=function(){
        return "Data for Page 2 from factory";

    }

    return this;
}]);
