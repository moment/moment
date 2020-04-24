var moment = require('./../moment.js')

var base = moment('2013-05-25');
var value = 2;

function createTest(unit) {
    return {
        fn: function () { base.set(unit, value); },
        async: false
    };
}

var units = ['second', 'minute', 'hour', 'date', 'day', 'isoWeek', 'week', 'month', 'quarter', 'year'];
var tests = units.reduce(function (tests, unit) {
    tests['set ' + unit] = createTest(unit);
    return tests;
}, {});

module.exports = {
    name: 'set',
    tests: tests
};
