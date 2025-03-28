var Benchmark = require('benchmark'),
    moment = require("./../moment.js"),
    base = moment('2013-05-25');

var unitsUnderTest = ["milliseconds", "seconds", "minutes", "hours", "days", "weeks", "months", "quarters", "years"];
var tests = unitsUnderTest.reduce(function (testsSoFar, unit) {
    testsSoFar["add " + unit] = generateTestForUnit(unit);
    return testsSoFar;
}, {});

function generateTestForUnit(unit) {
    return {
        setup: function(){base = moment('2013-05-25');},
        fn: function(){base.add(8, unit);},
        async: true
    };
}

module.exports = {
    name: 'add',
    tests: tests
};
