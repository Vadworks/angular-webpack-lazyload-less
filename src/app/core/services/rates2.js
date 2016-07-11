var mod = angular.module('rates2', [require('angular-resource')]);

mod.factory('getRates2', ['$resource', '$cacheFactory',
  function($resource, $cacheFactory){
    var todosCache = $cacheFactory('ratesCache2');
    return $resource('/prd/v1/products/rates', {appId:'fd203c30'}, {
      query: {method:'GET', cache: todosCache, params:{}}
    });
  }]);

module.exports = mod;