'use strict';

require('./core');

require('angular/angular.min');
require('angular-ui-router/release/angular-ui-router.min');
require('oclazyload/dist/ocLazyLoad.min');

var app = angular.module('webpackExample', [
  'ui.router',
  'oc.lazyLoad'
  ]);

angular.module('webpackExample')
  .config([
    '$stateProvider',
    '$locationProvider',
    '$urlRouterProvider',
    function ($stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoad) {
      $stateProvider
        .state('foo', {
          url: '/foo',
//          template: require('./foo/foo.html'),
//          templateProvider: $ocLazyLoad.load('testModule.js'),

            templateProvider: ['$q', function ($q) {
                let deferred = $q.defer();
                require.ensure(['./foo/foo.html'], function () {
                    let template = require('./foo/foo.html');
                    deferred.resolve(template);
                });
                return deferred.promise;
            }],

          controller: 'FooController',
          resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
            var deferred = $q.defer();

            require.ensure([], function (require) {
              var mod = require('./foo');
              $ocLazyLoad.load({
                name: mod.name,
              });
              
              deferred.resolve(mod.controller);
            });

            return deferred.promise;
          }]
        })
        
        .state('foo-sub', {
          url: '/foo-sub',
//          template: require('./foo/foo.html'),
//          templateProvider: $ocLazyLoad.load('testModule.js'),

            templateProvider: ['$q', function ($q) {
                let deferred = $q.defer();
                require.ensure(['./foo-sub/foo-sub.html'], function () {
                    let template = require('./foo-sub/foo-sub.html');
                    deferred.resolve(template);
                });
                return deferred.promise;
            }],

          controller: 'FooSubController',
          resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
            var deferred = $q.defer();

            require.ensure([], function (require) {
              var mod = require('./foo-sub');
              $ocLazyLoad.load({
                name: mod.name,
              });
              
              deferred.resolve(mod.controller);
            });

            return deferred.promise;
          }]
        })
        
        .state('bar', {
          url: '/bar',
            templateProvider: ['$q', function ($q) {
                let deferred = $q.defer();
                require.ensure(['./bar/bar.html'], function () {
                    let template = require('./bar/bar.html');
                    deferred.resolve(template);
                });
                return deferred.promise;
            }],
/*          templateProvider: function($templateCache){  
                // simplified, expecting that the cache is filled
                // there should be some checking... and async $http loading if not found
                return $templateCache.get('./bar/bar.html'); 
            },*/
          controller: 'BarController',
          resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
            var deferred = $q.defer();

            require.ensure([], function (require) {
              var mod = require('./bar');
              $ocLazyLoad.load({
                name: mod.name,
              });
              
              deferred.resolve(mod.controller);
            });

            return deferred.promise;
          }]
        });

      $locationProvider.html5Mode(true);

      $urlRouterProvider.otherwise('/bar');
      
      //since we know /bar is the default location
      //let's pre-load /bar bundle (not load is separately from the app)
      require('./bar');
    }]);
