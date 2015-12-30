var _ = require('lodash');

require('angular');

console.log('vendors loaded');
console.log('lodash version: ' + _.VERSION + ' (externals override npm)');
console.log('provided Jquery: ' + $);
console.log('provided angular: ' + angular);