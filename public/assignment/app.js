/**
 * Created by Alekhya on 10/19/2016.
 */
            angular
                .module('WebAppMaker',['ngRoute'])
                .config(Config);

function Config($routeProvider){
    $routeProvider
        .when('/login',{templateUrl: 'user/login.view.client.html'})
        .when('/register',{templateUrl: 'user/register.view.client.html'});

}