'use strict';

var app = angular
  .module('ariseApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'firebase',
    'toaster',
    'angularMoment',
    'ngMap'
    //'uiGmapgoogle-maps'
  ])
  .constant('FURL', 'https://arisedev.firebaseio.com/')
  .constant('TaskStatus', {
    OPEN: 'open',
    COMPLETED: 'completed',
    CANCELED: 'cancelled',
    ASSIGNED: 'assigned'
  })
  .run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the login page
      if (error === 'AUTH_REQUIRED') {
        $location.path('/login');
      }
    });
  })/*
    .config(
     function(uiGmapGoogleMapApiProvider) {
       uiGmapGoogleMapApiProvider.configure({
        china: true,
         libraries: 'weather,geometry,visualization'
      })
    })*/
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/browse-map.html',
        controller: 'BrowseController',
        resolve: {
          currentAuth: function(Auth) {
            return Auth.requireAuth();
          }
        }
      })
      .when('/_/:taskId?', {
        templateUrl: 'views/browse-map.html',
        controller: 'BrowseController',
        resolve: {
          currentAuth: function(Auth) {
            return Auth.requireAuth();
          }
        }
      })
      .when('/profile/:userId?', {
        templateUrl: 'views/profile.html',
        controller: 'BrowseController',
        resolve: {
          currentAuth: function(Auth) {
            return Auth.requireAuth();
          }
        }
      })
      .when('/browsedetails/:taskId?', {
        templateUrl: 'views/browsedetails.html',
        controller: 'BrowseController',
        resolve: {
          currentAuth: function(Auth) {
            return Auth.requireAuth();
          }
        }
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthController'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthController'
      })
      .when('/mycalls', {
        templateUrl: 'views/dashboard.html',
        routeKey: 'mycalls',
        controller: 'BrowseController',
        resolve: {
          currentAuth: function(Auth) {
            return Auth.requireAuth();
          }
        }
      })
      .when('/chat', {
        templateUrl: 'views/chat.html',
        routeKey: 'pickedupcalls',
        controller: 'BrowseController',
        resolve: {
          currentAuth: function(Auth) {
            return Auth.requireAuth();
          }
        }
      })
      .otherwise({
        redirectTo: '/login'
      });
  });
