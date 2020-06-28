var moment = require('./../moment.js');

var base = moment('2013-05-25');

function createTest(unit) {
    return {
        fn: function () { base.get(unit); },
        async: false
    };
}

var units = ['second', 'minute', 'hour', 'date', 'day', 'isoWeek', 'week', 'month', 'quarter', 'year'];
var tests = units.reduce(function (tests, unit) {
    tests['get ' + unit] = createTest(unit);
    return tests;
}, {});

module.exports = {
    name: 'get',
    tests: tests
};
