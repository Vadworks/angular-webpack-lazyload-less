module.exports = function($scope, getRates) {
  console.log('foo controller');
  
  //DO-STUFF for foo controller
  
  console.log('init loading foo-sub bundle');

  console.log('rates', getRates.get());

/*  require.ensure(['../foo-sub'], function () {
    // Note: this will run regardless if bundle is already in cache or needs to be loaded
    console.log('foo-sub preloaded');
    
    //DO-STUFF after foo-sub is pre-loaded
    // Like pre-load REST data for foo-sub
  });
*/
  console.log('after init loading foo-sub bundle');
}