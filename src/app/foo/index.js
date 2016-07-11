var ratesFile = require('../core/services/rates.js');

var fooController = require('./foo.controller.js');

require('./foo.html');
require('./foo.less');

var mod = angular.module('foo', ['rates']);

mod.controller('FooController', fooController);

module.exports = mod;