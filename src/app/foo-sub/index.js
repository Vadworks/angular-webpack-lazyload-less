var ratesFile2 = require('../core/services/rates2.js');

var fooSubController = require('./foo-sub.controller.js');

require('./foo-sub.html');
require('./foo-sub.less');

var mod = angular.module('foo', ['rates2']);

mod.controller('FooSubController', fooSubController);

module.exports = mod;