var moment = require("../../moment");

exports.is_same = {
    "is same without units" : function(test) {
        test.expect(17);

        var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10)), mCopy = moment(m);
    test.equal(m.isSame(moment(new Date(2012, 3, 2, 3, 5, 5, 10))), false, "year is later");
    test.equal(m.isSame(moment(new Date(2010, 3, 2, 3, 3, 5, 10))), false, "year is earlier");
    test.equal(m.isSame(moment(new Date(2011, 4, 2, 3, 4, 5, 10))), false, "month is later");
    test.equal(m.isSame(moment(new Date(2011, 2, 2, 3, 4, 5, 10))), false, "month is earlier");
    test.equal(m.isSame(moment(new Date(2011, 3, 3, 3, 4, 5, 10))), false, "day is later");
    test.equal(m.isSame(moment(new Date(2011, 3, 1, 3, 4, 5, 10))), false, "day is earlier");
    test.equal(m.isSame(moment(new Date(2011, 3, 2, 4, 4, 5, 10))), false, "hour is later");
    test.equal(m.isSame(moment(new Date(2011, 3, 2, 2, 4, 5, 10))), false, "hour is earlier");
    test.equal(m.isSame(moment(new Date(2011, 3, 2, 3, 5, 5, 10))), false, "minute is later");
    test.equal(m.isSame(moment(new Date(2011, 3, 2, 3, 3, 5, 10))), false, "minute is earlier");
    test.equal(m.isSame(moment(new Date(2011, 3, 2, 3, 4, 6, 10))), false, "second is later");
    test.equal(m.isSame(moment(new Date(2011, 3, 2, 3, 4, 4, 11))), false, "second is earlier");
    test.equal(m.isSame(moment(new Date(2011, 3, 2, 3, 4, 5, 10))), true, "millisecond match");
    test.equal(m.isSame(moment(new Date(2011, 3, 2, 3, 4, 5, 11))), false, "millisecond is later");
    test.equal(m.isSame(moment(new Date(2011, 3, 2, 3, 4, 5, 9))), false, "millisecond is earlier");
        test.equal(m.isSame(m), true, "moments are the same as themselves");
        test.equal(+m, +mCopy, "isSame second should not change moment");
        test.done();
    },

    "is same year" : function(test) {
        test.expect(9);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
        test.equal(m.isSame(moment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'year'), true, "year match");
        test.equal(m.isSame(moment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'years'), true, "plural should work");
        test.equal(m.isSame(moment(new Date(2012, 5, 6, 7, 8, 9, 10)), 'year'), false, "year mismatch");
        test.equal(m.isSame(moment(new Date(2011, 0, 1, 0, 0, 0, 0)), 'year'), true, "exact start of year");
        test.equal(m.isSame(moment(new Date(2011, 11, 31, 23, 59, 59, 999)), 'year'), true, "exact end of year");
        test.equal(m.isSame(moment(new Date(2012, 0, 1, 0, 0, 0, 0)), 'year'), false, "start of next year");
        test.equal(m.isSame(moment(new Date(2010, 11, 31, 23, 59, 59, 999)), 'year'), false, "end of previous year");
        test.equal(m.isSame(m, 'year'), true, "same moments are in the same year");
        test.equal(+m, +mCopy, "isSame year should not change moment");
        test.done();
    },

    "is same month" : function(test) {
        test.expect(10);

        var m = moment(new Date(2011, 2, 3, 4, 5, 6, 7)), mCopy = moment(m);
        test.equal(m.isSame(moment(new Date(2011, 2, 6, 7, 8, 9, 10)), 'month'), true, "month match");
        test.equal(m.isSame(moment(new Date(2011, 2, 6, 7, 8, 9, 10)), 'months'), true, "plural should work");
        test.equal(m.isSame(moment(new Date(2012, 2, 6, 7, 8, 9, 10)), 'month'), false, "year mismatch");
        test.equal(m.isSame(moment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'month'), false, "month mismatch");
        test.equal(m.isSame(moment(new Date(2011, 2, 1, 0, 0, 0, 0)), 'month'), true, "exact start of month");
        test.equal(m.isSame(moment(new Date(2011, 2, 31, 23, 59, 59, 999)), 'month'), true, "exact end of month");
        test.equal(m.isSame(moment(new Date(2011, 3, 1, 0, 0, 0, 0)), 'month'), false, "start of next month");
        test.equal(m.isSame(moment(new Date(2011, 1, 27, 23, 59, 59, 999)), 'month'), false, "end of previous month");
        test.equal(m.isSame(m, 'month'), true, "same moments are in the same month");
        test.equal(+m, +mCopy, "isSame month should not change moment");
        test.done();
    },

    "is same day" : function(test) {
        test.expect(11);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 7, 8, 9, 10)), 'day'), true, "day match");
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 7, 8, 9, 10)), 'days'), true, "plural should work");
        test.equal(m.isSame(moment(new Date(2012, 1, 2, 7, 8, 9, 10)), 'day'), false, "year mismatch");
        test.equal(m.isSame(moment(new Date(2011, 2, 2, 7, 8, 9, 10)), 'day'), false, "month mismatch");
        test.equal(m.isSame(moment(new Date(2011, 1, 3, 7, 8, 9, 10)), 'day'), false, "day mismatch");
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 0, 0, 0, 0)), 'day'), true, "exact start of day");
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 23, 59, 59, 999)), 'day'), true, "exact end of day");
        test.equal(m.isSame(moment(new Date(2011, 1, 3, 0, 0, 0, 0)), 'day'), false, "start of next day");
        test.equal(m.isSame(moment(new Date(2011, 1, 1, 23, 59, 59, 999)), 'day'), false, "end of previous day");
        test.equal(m.isSame(m, 'day'), true, "same moments are in the same day");
        test.equal(+m, +mCopy, "isSame day should not change moment");
        test.done();
    },

    "is same hour" : function(test) {
        test.expect(12);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 3, 8, 9, 10)), 'hour'), true, "hour match");
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 3, 8, 9, 10)), 'hours'), true, "plural should work");
        test.equal(m.isSame(moment(new Date(2012, 1, 2, 3, 8, 9, 10)), 'hour'), false, "year mismatch");
        test.equal(m.isSame(moment(new Date(2011, 2, 2, 3, 8, 9, 10)), 'hour'), false, "month mismatch");
        test.equal(m.isSame(moment(new Date(2011, 1, 3, 3, 8, 9, 10)), 'hour'), false, "day mismatch");
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 4, 8, 9, 10)), 'hour'), false, "hour mismatch");
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 3, 0, 0, 0)), 'hour'), true, "exact start of hour");
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 3, 59, 59, 999)), 'hour'), true, "exact end of hour");
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 4, 0, 0, 0)), 'hour'), false, "start of next hour");
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 2, 59, 59, 999)), 'hour'), false, "end of previous hour");
        test.equal(m.isSame(m, 'hour'), true, "same moments are in the same hour");
        test.equal(+m, +mCopy, "isSame hour should not change moment");
        test.done();
    },

    "is same minute" : function(test) {
        test.expect(13);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 3, 4, 9, 10)), 'minute'), true, "minute match");
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 3, 4, 9, 10)), 'minutes'), true, "plural should work");
        test.equal(m.isSame(moment(new Date(2012, 1, 2, 3, 4, 9, 10)), 'minute'), false, "year mismatch");
        test.equal(m.isSame(moment(new Date(2011, 2, 2, 3, 4, 9, 10)), 'minute'), false, "month mismatch");
        test.equal(m.isSame(moment(new Date(2011, 1, 3, 3, 4, 9, 10)), 'minute'), false, "day mismatch");
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 4, 4, 9, 10)), 'minute'), false, "hour mismatch");
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 3, 5, 9, 10)), 'minute'), false, "minute mismatch");
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 3, 4, 0, 0)), 'minute'), true, "exact start of minute");
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 3, 4, 59, 999)), 'minute'), true, "exact end of minute");
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 3, 5, 0, 0)), 'minute'), false, "start of next minute");
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 3, 3, 59, 999)), 'minute'), false, "end of previous minute");
        test.equal(m.isSame(m, 'minute'), true, "same moments are in the same minute");
        test.equal(+m, +mCopy, "isSame minute should not change moment");
        test.done();
    },

    "is same second" : function(test) {
        test.expect(14);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)), mCopy = moment(m);
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 3, 4, 5, 10)), 'second'), true, "second match");
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 3, 4, 5, 10)), 'seconds'), true, "plural should work");
        test.equal(m.isSame(moment(new Date(2012, 1, 2, 3, 4, 5, 10)), 'second'), false, "year mismatch");
        test.equal(m.isSame(moment(new Date(2011, 2, 2, 3, 4, 5, 10)), 'second'), false, "month mismatch");
        test.equal(m.isSame(moment(new Date(2011, 1, 3, 3, 4, 5, 10)), 'second'), false, "day mismatch");
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 4, 4, 5, 10)), 'second'), false, "hour mismatch");
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 3, 5, 5, 10)), 'second'), false, "minute mismatch");
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 3, 4, 6, 10)), 'second'), false, "second mismatch");
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 3, 4, 5, 0)), 'second'), true, "exact start of second");
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 3, 4, 5, 999)), 'second'), true, "exact end of second");
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 3, 4, 6, 0)), 'second'), false, "start of next second");
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 3, 4, 4, 999)), 'second'), false, "end of previous second");
        test.equal(m.isSame(m, 'second'), true, "same moments are in the same second");
        test.equal(+m, +mCopy, "isSame second should not change moment");
        test.done();
    },

    "is same millisecond" : function(test) {
        test.expect(18);

        var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10)), mCopy = moment(m);
        test.equal(m.isSame(moment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'millisecond'), true, "millisecond match");
        test.equal(m.isSame(moment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'milliseconds'), true, "plural should work");
        test.equal(m.isSame(moment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'millisecond'), false, "year is later");
        test.equal(m.isSame(moment(new Date(2010, 3, 2, 3, 4, 5, 10)), 'millisecond'), false, "year is earlier");
        test.equal(m.isSame(moment(new Date(2011, 4, 2, 3, 4, 5, 10)), 'millisecond'), false, "month is later");
        test.equal(m.isSame(moment(new Date(2011, 2, 2, 3, 4, 5, 10)), 'millisecond'), false, "month is earlier");
        test.equal(m.isSame(moment(new Date(2011, 3, 3, 3, 4, 5, 10)), 'millisecond'), false, "day is later");
        test.equal(m.isSame(moment(new Date(2011, 3, 1, 1, 4, 5, 10)), 'millisecond'), false, "day is earlier");
        test.equal(m.isSame(moment(new Date(2011, 3, 2, 4, 4, 5, 10)), 'millisecond'), false, "hour is later");
        test.equal(m.isSame(moment(new Date(2011, 3, 1, 4, 1, 5, 10)), 'millisecond'), false, "hour is earlier");
        test.equal(m.isSame(moment(new Date(2011, 3, 2, 3, 5, 5, 10)), 'millisecond'), false, "minute is later");
        test.equal(m.isSame(moment(new Date(2011, 3, 2, 3, 3, 5, 10)), 'millisecond'), false, "minute is earlier");
        test.equal(m.isSame(moment(new Date(2011, 3, 2, 3, 4, 6, 10)), 'millisecond'), false, "second is later");
        test.equal(m.isSame(moment(new Date(2011, 3, 2, 3, 4, 4, 5)), 'millisecond'), false, "second is earlier");
        test.equal(m.isSame(moment(new Date(2011, 3, 2, 3, 4, 6, 11)), 'millisecond'), false, "millisecond is later");
        test.equal(m.isSame(moment(new Date(2011, 3, 2, 3, 4, 4, 9)), 'millisecond'), false, "millisecond is earlier");
        test.equal(m.isSame(m, 'millisecond'), true, "same moments are in the same millisecond");
        test.equal(+m, +mCopy, "isSame millisecond should not change moment");
        test.done();
    }
};
