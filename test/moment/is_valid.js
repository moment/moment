var moment = require("../../moment");

exports.is_valid = {
    "array bad month" : function (test) {
        test.expect(2);
        test.equal(moment([2010, -1]).isValid(), false, 'month -1 invalid');
        test.equal(moment([2100, 12]).isValid(), false, 'month 12 invalid');

        test.done();
    },

    "array good month" : function (test) {
        test.expect(12 * 2);

        for (var i = 0; i < 12; i++) {
            test.equal(moment([2010, i]).isValid(), true, 'month ' + i);
            test.equal(moment.utc([2010, i]).isValid(), true, 'month ' + i);
        }

        test.done();
    },

    "array bad date" : function (test) {
        var tests = [
            moment([2010, 0, 0]),
            moment([2100, 0, 32]),
            moment.utc([2010, 0, 0]),
            moment.utc([2100, 0, 32])
        ],
        i, m;

        test.expect(tests.length);

        for (i in tests) {
            m = tests[i];
            test.equal(m.isValid(), false);
        }

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

    "string + formats bad date" : function (test) {
        test.equal(moment('2020-00-00', []).isValid(), false, 'invalid on empty array');
        test.equal(moment('2020-00-00', ['YYYY-MM-DD', 'DD-MM-YYYY']).isValid(), false, 'invalid on all in array');
        test.equal(moment('2020-00-00', ['DD-MM-YYYY', 'YYYY-MM-DD']).isValid(), false, 'invalid on all in array');
        test.equal(moment('2020-01-01', ['YYYY-MM-DD', 'DD-MM-YYYY']).isValid(), true, 'valid on first');
        test.equal(moment('2020-01-01', ['DD-MM-YYYY', 'YYYY-MM-DD']).isValid(), true, 'valid on last');
        test.equal(moment('2020-01-01', ['YYYY-MM-DD', 'YYYY-DD-MM']).isValid(), true, 'valid on both');
        test.equal(moment('2020-13-01', ['YYYY-MM-DD', 'YYYY-DD-MM']).isValid(), true, 'valid on last');

        test.equal(moment('12-13-2012', ['DD-MM-YYYY', 'YYYY-MM-DD']).isValid(), false, 'month rollover');
        test.equal(moment('12-13-2012', ['DD-MM-YYYY', 'DD-MM-YYYY']).isValid(), false, 'month rollover');
        test.equal(moment('38-12-2012', ['DD-MM-YYYY']).isValid(), false, 'day rollover');

        test.done();
    },

    "string nonsensical" : function (test) {
        test.expect(1);

        test.equal(moment('fail').isValid(), false, 'string "fail"');
        test.done();
    },

    "string nonsensical with format" : function (test) {
        test.expect(2);

        test.equal(moment('fail', "MM-DD-YYYY").isValid(), false, 'string "fail" with format "MM-DD-YYYY"');
        test.equal(moment("xx-xx-2001", 'DD-MM-YYY').isValid(), true, 'string "xx-xx-2001" with format "MM-DD-YYYY"');
        test.done();
    },

    "string with bad month name" : function (test) {
        test.expect(2);

        moment.lang('en');

        test.equal(moment('01-Nam-2012', 'DD-MMM-YYYY').isValid(), false, '"Nam" is an invalid month');
        test.equal(moment('01-Aug-2012', 'DD-MMM-YYYY').isValid(), true, '"Aug" is a valid month');

        test.done();
    },

    "string with spaceless format" : function (test) {
        test.expect(1);

        test.equal(moment('10Sep2001', 'DDMMMYYYY').isValid(), true, "Parsing 10Sep2001 should result in a valid date");

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
        ], i;

        test.expect(tests.length * 2);

        for (i = 0; i < tests.length; i++) {
            test.equal(moment(tests[i]).isValid(), false, tests[i] + ' should be invalid');
            test.equal(moment.utc(tests[i]).isValid(), false, tests[i] + ' should be invalid');
        }
        test.done();
    },

    "invalid string iso 8601 + timezone" : function (test) {

        var tests = [
            '2010-00-00T+00:00',
            '2010-01-00T+00:00',
            '2010-01-40T+00:00',
            '2010-01-40T24+00:00',
            '2010-01-40T23:60+00:00',
            '2010-01-40T23:59:60+00:00',
            '2010-01-40T23:59:59.9999+00:00'
        ], i;

        test.expect(tests.length * 2);

        for (i = 0; i < tests.length; i++) {
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
            '2010-01-30T23:59:59.999+00:00',
            '2010-01-30T23:59:59.999-07:00',
            '2010-01-30T00:00:00.000+07:00',
            '2010-01-30T00:00:00.000+07'
        ], i;

        test.expect(tests.length * 2);

        for (i = 0; i < tests.length; i++) {
            test.equal(moment(tests[i]).isValid(), true, tests[i] + ' should be valid');
            test.equal(moment.utc(tests[i]).isValid(), true, tests[i] + ' should be valid');
        }
        test.done();
    },

    "invalidAt" : function (test) {
        test.expect(7);
        test.equal(moment([2000, 12]).invalidAt(), 1, 'month 12 is invalid: 0-11');
        test.equal(moment([2000, 1, 30]).invalidAt(), 2, '30 is not a valid february day');
        test.equal(moment([2000, 1, 29, 24]).invalidAt(), 3, '24 is invalid hour');
        test.equal(moment([2000, 1, 29, 23, 60]).invalidAt(), 4, '60 is invalid minute');
        test.equal(moment([2000, 1, 29, 23, 59, 60]).invalidAt(), 5, '60 is invalid second');
        test.equal(moment([2000, 1, 29, 23, 59, 59, 1000]).invalidAt(), 6, '1000 is invalid millisecond');
        test.equal(moment([2000, 1, 29, 23, 59, 59, 999]).invalidAt(), -1, '-1 if everything is fine');
        test.done();
    },

    "valid Unix timestamp" : function (test) {
        test.expect(21);
        test.equal(moment(1371065286, "X").isValid(), true, 'number integer');
        test.equal(moment(1379066897.0, "X").isValid(), true, 'number whole 1dp');
        test.equal(moment(1379066897.7, "X").isValid(), true, 'number 1dp');
        test.equal(moment(1379066897.00, "X").isValid(), true, 'number whole 2dp');
        test.equal(moment(1379066897.07, "X").isValid(), true, 'number 2dp');
        test.equal(moment(1379066897.17, "X").isValid(), true, 'number 2dp');
        test.equal(moment(1379066897.000, "X").isValid(), true, 'number whole 3dp');
        test.equal(moment(1379066897.007, "X").isValid(), true, 'number 3dp');
        test.equal(moment(1379066897.017, "X").isValid(), true, 'number 3dp');
        test.equal(moment(1379066897.157, "X").isValid(), true, 'number 3dp');
        test.equal(moment("1371065286", "X").isValid(), true, 'string integer');
        test.equal(moment("1379066897.", "X").isValid(), true, 'string trailing .');
        test.equal(moment("1379066897.0", "X").isValid(), true, 'string whole 1dp');
        test.equal(moment("1379066897.7", "X").isValid(), true, 'string 1dp');
        test.equal(moment("1379066897.00", "X").isValid(), true, 'string whole 2dp');
        test.equal(moment("1379066897.07", "X").isValid(), true, 'string 2dp');
        test.equal(moment("1379066897.17", "X").isValid(), true, 'string 2dp');
        test.equal(moment("1379066897.000", "X").isValid(), true, 'string whole 3dp');
        test.equal(moment("1379066897.007", "X").isValid(), true, 'string 3dp');
        test.equal(moment("1379066897.017", "X").isValid(), true, 'string 3dp');
        test.equal(moment("1379066897.157", "X").isValid(), true, 'string 3dp');
        test.done();
    },

    "invalid Unix timestamp" : function (test) {
        test.expect(8);
        test.equal(moment(undefined, "X").isValid(), false, 'undefined');
        test.equal(moment("undefined", "X").isValid(), false, 'string undefined');
        try {
            test.equal(moment(null, "X").isValid(), false, 'null');
        } catch (e) {
            test.ok(true, 'null');
        }

        test.equal(moment("null", "X").isValid(), false, 'string null');
        test.equal(moment([], "X").isValid(), false, 'array');
        test.equal(moment("{}", "X").isValid(), false, 'object');
        try {
            test.equal(moment("", "X").isValid(), false, 'string empty');
        } catch (e) {
            test.ok(true, 'string empty');
        }

        test.equal(moment(" ", "X").isValid(), false, 'string space');
        test.done();
    },

    "empty" : function (test) {
        test.equal(moment(null).isValid(), false, 'null');
        test.equal(moment('').isValid(), false, 'empty string');
        test.equal(moment(' ').isValid(), false, 'empty when trimmed');

        test.equal(moment(null, 'YYYY').isValid(), false, 'format + null');
        test.equal(moment('', 'YYYY').isValid(), false, 'format + empty string');
        test.equal(moment(' ', 'YYYY').isValid(), false, 'format + empty when trimmed');
        test.done();
    },

    "days of the year" : function (test) {
        test.equal(moment('2010 300', 'YYYY DDDD').isValid(), true, 'day 300 of year valid');
        test.equal(moment('2010 365', 'YYYY DDDD').isValid(), true, 'day 365 of year valid');
        test.equal(moment('2010 366', 'YYYY DDDD').isValid(), false, 'day 366 of year invalid');
        test.equal(moment('2012 365', 'YYYY DDDD').isValid(), true, 'day 365 of leap year valid');
        test.equal(moment('2012 366', 'YYYY DDDD').isValid(), true, 'day 366 of leap year valid');
        test.equal(moment('2012 367', 'YYYY DDDD').isValid(), false, 'day 367 of leap year invalid');

        test.done();
    },

    "oddball permissiveness" : function (test) {
        //https://github.com/moment/moment/issues/1128
        test.ok(moment("2010-10-3199", ["MM/DD/YYYY", "MM-DD-YYYY", "YYYY-MM-DD"]).isValid());

        //https://github.com/moment/moment/issues/1122
        test.ok(moment("3:25", ["h:mma", "hh:mma", "H:mm", "HH:mm"]).isValid());

        test.done();
    }
};
