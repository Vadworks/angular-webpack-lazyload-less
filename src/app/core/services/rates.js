var mod = angular.module('rates', [require('angular-resource')]);

mod.factory('getRates', ['$resource', '$cacheFactory',
  function($resource, $cacheFactory){
    var todosCache = $cacheFactory('ratesCache');
    return $resource('/prd/v1/products/rates', {appId:'fd203c30'}, {
      query: {method:'GET', cache: todosCache, params:{}}
    });
  }]);

module.exports = mod;