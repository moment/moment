var moment = require("./../moment.js");

var UNIT = 'date';

var NOW = Date.now();
var DIFF = -1 * 24 * 60 * 60 * 1e3

var THIS = moment(NOW);
var INPUT = moment(NOW + DIFF);

// For isBetween
var FROM = moment(NOW + DIFF);
var TO = moment(NOW + 2 * DIFF);

function createTest(method) {
    return {
        fn: function() { return method.call(THIS, INPUT, UNIT); },
        async: false
    };
}

var tests = {};
tests.isAfter = createTest(THIS.isAfter);
tests.isBefore = createTest(THIS.isBefore);
tests.isSame = createTest(THIS.isSame);
tests.isSameOrAfter = createTest(THIS.isSameOrAfter);
tests.isSameOrBefore = createTest(THIS.isSameOrBefore);
tests.isBetween = createTest(function () { return THIS.isBetween(FROM, TO, UNIT); });

module.exports = {
    name: 'compare ' + UNIT,
    tests: tests
};
