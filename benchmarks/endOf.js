var Benchmark = require('benchmark'),
    moment = require("./../moment.js"),
    base = moment('2013-05-25');

var unitsUnderTest = ["second", "minute", "hour", "date", "day", "isoWeek", "week", "month", "quarter", "year"];
var tests = unitsUnderTest.reduce(function (testsSoFar, unit) {
    testsSoFar["endOf " + unit] = generateTestForUnit(unit);
    return testsSoFar;
}, {});

function generateTestForUnit(unit) {
    return {
        setup: function(){var base = base; var unit = unit;},
        fn: function(){base.endOf(unit);},
        async: true
    };
}

module.exports = {
    name: 'endOf',
    tests: tests
};
