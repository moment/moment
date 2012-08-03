var moment = require("../../moment");

exports.is_valid = {
    "array bad month" : function (test) {
        test.expect(2);

        test.equal(moment([2010, -1]).isValid(), false, 'month -1');
        test.equal(moment([2100, 12]).isValid(), false, 'month 12');

        test.done();
    },

    "array good month" : function (test) {
        test.expect(24);

        for (var i = 0; i < 12; i++) {
            test.equal(moment([2010, i]).isValid(), true, 'month ' + i);
            test.equal(moment.utc([2010, i]).isValid(), true, 'month ' + i);
        }

        test.done();
    },

    "array bad date" : function (test) {
        test.expect(4);

        test.equal(moment([2010, 0, 0]).isValid(), false, 'date 0');
        test.equal(moment([2100, 0, 32]).isValid(), false, 'date 32');

        test.equal(moment.utc([2010, 0, 0]).isValid(), false, 'utc date 0');
        test.equal(moment.utc([2100, 0, 32]).isValid(), false, 'utc date 32');

        test.done();
    },

    "array bad date leap year" : function (test) {
        test.expect(8);

        test.equal(moment([2010, 1, 29]).isValid(), false, '2010 feb 29');
        test.equal(moment([2100, 1, 29]).isValid(), false, '2100 feb 29');
        test.equal(moment([2008, 1, 30]).isValid(), false, '2008 feb 30');
        test.equal(moment([2000, 1, 30]).isValid(), false, '2000 feb 30');

        test.equal(moment.utc([2010, 1, 29]).isValid(), false, 'utc 2010 feb 29');
        test.equal(moment.utc([2100, 1, 29]).isValid(), false, 'utc 2100 feb 29');
        test.equal(moment.utc([2008, 1, 30]).isValid(), false, 'utc 2008 feb 30');
        test.equal(moment.utc([2000, 1, 30]).isValid(), false, 'utc 2000 feb 30');

        test.done();
    },

    "string nonsensical" : function (test) {
        test.expect(1);

        test.equal(moment('fail').isValid(), false, 'string "fail"');
        test.done();
    },

    "invalid string iso 8601" : function (test) {

        var tests = [
            '2010-00-00',
            '2010-01-00',
            '2010-01-40',
            '2010-01-01T24',
            '2010-01-01T23:60',
            '2010-01-01T23:59:60'
        ];

        test.expect(tests.length * 2);

        for (var i = 0; i < tests.length; i++) {
            test.equal(moment(tests[i]).isValid(), false, tests[i] + ' should be invalid');
            test.equal(moment.utc(tests[i]).isValid(), false, tests[i] + ' should be invalid');
        }
        test.done();
    },

    "invalid string iso 8601 + timezone" : function (test) {

        var tests = [
            '2010-00-00+00:00',
            '2010-01-00+00:00',
            '2010-01-40+00:00',
            '2010-01-40T24+00:00',
            '2010-01-40T23:60+00:00',
            '2010-01-40T23:59:60+00:00',
            '2010-01-40T23:59:59.9999+00:00'
        ];

        test.expect(tests.length * 2);

        for (var i = 0; i < tests.length; i++) {
            test.equal(moment(tests[i]).isValid(), false, tests[i] + ' should be invalid');
            test.equal(moment.utc(tests[i]).isValid(), false, tests[i] + ' should be invalid');
        }
        test.done();
    },

    "valid string iso 8601 + timezone" : function (test) {
        var tests = [
            '2010-01-01',
            '2010-01-30',
            '2010-01-30T23+00:00',
            '2010-01-30T23:59+00:00',
            '2010-01-30T23:59:59+00:00',
            '2010-01-30T23:59:59.999+00:00'
        ];

        test.expect(tests.length * 2);

        for (var i = 0; i < tests.length; i++) {
            test.equal(moment(tests[i]).isValid(), true, tests[i] + ' should be valid');
            test.equal(moment.utc(tests[i]).isValid(), true, tests[i] + ' should be valid');
        }
        test.done();
    }
};
