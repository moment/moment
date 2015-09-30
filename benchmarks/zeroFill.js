var Benchmark = require('benchmark');

module.exports = {
  name: 'zeroFill',
  tests: {
    zeroFillMath: {
      setup: function() {
        var zeroFillMath = function(number, targetLength, forceSign) {
            var absNumber = '' + Math.abs(number),
                zerosToFill = targetLength - absNumber.length,
                sign = number >= 0;
            return (sign ? (forceSign ? '+' : '') : '-') +
                Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
        }
      },
      fn: function() {
        zeroFillMath(Math.random() * 1e5 | 0, 5);
        zeroFillMath(Math.random() * 1e5 | 0, 10);
        zeroFillMath(Math.random() * 1e10 | 0, 20);
      },
      async: true
    },
    zeroFillWhile: {
      setup: function() {
        var zeroFillWhile = function(number, targetLength, forceSign) {
          var output = '' + Math.abs(number),
              sign = number >= 0;

          while (output.length < targetLength) {
              output = '0' + output;
          }
          return (sign ? (forceSign ? '+' : '') : '-') + output;
        }
      },
      fn: function() {
        zeroFillWhile(Math.random() * 1e5 | 0, 5);
        zeroFillWhile(Math.random() * 1e5 | 0, 10);
        zeroFillWhile(Math.random() * 1e10 | 0, 20);
      },
      async: true
    }
  }
};
