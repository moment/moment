var moment = require('../../moment');

exports.mutable = {
    setUp : function (done) {
        moment.createFromInputFallback = function () {
            throw new Error('input not handled by moment');
        };
        done();
    },

    'manipulation methods' : function (test) {
        var m = moment();

        test.equal(m, m.year(2011), 'year() should be mutable');
        test.equal(m, m.month(1), 'month() should be mutable');
        test.equal(m, m.hours(7), 'hours() should be mutable');
        test.equal(m, m.minutes(33), 'minutes() should be mutable');
        test.equal(m, m.seconds(44), 'seconds() should be mutable');
        test.equal(m, m.milliseconds(55), 'milliseconds() should be mutable');
        test.equal(m, m.day(2), 'day() should be mutable');
        test.equal(m, m.startOf('week'), 'startOf() should be mutable');
        test.equal(m, m.add(1, 'days'), 'add() should be mutable');
        test.equal(m, m.subtract(2, 'years'), 'subtract() should be mutable');
        test.equal(m, m.local(), 'local() should be mutable');
        test.equal(m, m.utc(), 'utc() should be mutable');

        test.done();
    },

    'non mutable methods' : function (test) {
        var m = moment();
        test.notEqual(m, m.clone(), 'clone() should not be mutable');

        test.done();
    }
};
