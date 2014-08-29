var moment = require('../../moment');

exports.add = {
    setUp : function (done) {
        moment.createFromInputFallback = function () {
            throw new Error('input not handled by moment');
        };
        done();
    },

    'isDate recognizes Date objects' : function (test) {
        test.ok(moment.isDate(new Date()), 'no args (now)');
        test.ok(moment.isDate(new Date([2014, 02, 15])), 'array args');
        test.ok(moment.isDate(new Date('2014-03-15')), 'string args');
        test.ok(moment.isDate(new Date('does NOT look like a date')), 'invalid date');
        test.done();
    },

    'isDate rejects non-Date objects' : function (test) {
        test.ok(!moment.isDate(), 'nothing');
        test.ok(!moment.isDate(undefined), 'undefined');
        test.ok(!moment.isDate(null), 'string args');
        test.ok(!moment.isDate(42), 'number');
        test.ok(!moment.isDate('2014-03-15'), 'string');
        test.ok(!moment.isDate([2014, 2, 15]), 'array');
        test.ok(!moment.isDate({year: 2014, month: 2, day: 15}), 'object');
        test.ok(!moment.isDate({toString: function () {
            return '[object Date]';
        }}), 'lying object');
        test.done();
    }
};
