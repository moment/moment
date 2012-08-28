var moment = require("../../moment");

exports.is_same = {
    "is same year" : function(test) {
        test.expect(7);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6));
        test.equal(m.isSame(moment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'year'), true, "year match");
        test.equal(m.isSame(moment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'years'), true, "plural should work");
        test.equal(m.isSame(moment(new Date(2012, 5, 6, 7, 8, 9, 10)), 'year'), false, "year mismatch");
        test.equal(m.isSame(moment(new Date(2011, 0, 1, 0, 0, 0, 0)), 'year'), true, "exact start of year");
        test.equal(m.isSame(moment(new Date(2011, 11, 31, 23, 59, 59, 999)), 'year'), true, "exact end of year");
        test.equal(m.isSame(moment(new Date(2012, 0, 1, 0, 0, 0, 0)), 'year'), false, "start of next year");
        test.equal(m.isSame(moment(new Date(2010, 11, 31, 23, 59, 59, 999)), 'year'), false, "end of previous year");
        test.done();
    },

    "is same month" : function(test) {
        test.expect(8);

        var m = moment(new Date(2011, 2, 3, 4, 5, 6, 7));
        test.equal(m.isSame(moment(new Date(2011, 2, 6, 7, 8, 9, 10)), 'month'), true, "month match");
        test.equal(m.isSame(moment(new Date(2011, 2, 6, 7, 8, 9, 10)), 'months'), true, "plural should work");
        test.equal(m.isSame(moment(new Date(2012, 2, 6, 7, 8, 9, 10)), 'month'), false, "year mismatch");
        test.equal(m.isSame(moment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'month'), false, "month mismatch");
        test.equal(m.isSame(moment(new Date(2011, 2, 1, 0, 0, 0, 0)), 'month'), true, "exact start of month");
        test.equal(m.isSame(moment(new Date(2011, 2, 31, 23, 59, 59, 999)), 'month'), true, "exact end of month");
        test.equal(m.isSame(moment(new Date(2011, 3, 1, 0, 0, 0, 0)), 'month'), false, "start of next month");
        test.equal(m.isSame(moment(new Date(2011, 1, 27, 23, 59, 59, 999)), 'month'), false, "end of previous month");
        test.done();
    },

    "is same day" : function(test) {
        test.expect(9);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6));
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 7, 8, 9, 10)), 'day'), true, "day match");
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 7, 8, 9, 10)), 'days'), true, "plural should work");
        test.equal(m.isSame(moment(new Date(2012, 1, 2, 7, 8, 9, 10)), 'day'), false, "year mismatch");
        test.equal(m.isSame(moment(new Date(2011, 2, 2, 7, 8, 9, 10)), 'day'), false, "month mismatch");
        test.equal(m.isSame(moment(new Date(2011, 1, 3, 7, 8, 9, 10)), 'day'), false, "day mismatch");
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 0, 0, 0, 0)), 'day'), true, "exact start of day");
        test.equal(m.isSame(moment(new Date(2011, 1, 2, 23, 59, 59, 999)), 'day'), true, "exact end of day");
        test.equal(m.isSame(moment(new Date(2011, 1, 3, 0, 0, 0, 0)), 'day'), false, "start of next day");
        test.equal(m.isSame(moment(new Date(2011, 1, 1, 23, 59, 59, 999)), 'day'), false, "end of previous day");
        test.done();
    },

    "is same hour" : function(test) {
        test.expect(10);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6));
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
        test.done();
    },

    "is same minute" : function(test) {
        test.expect(11);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6));
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
        test.done();
    },

    "is same second" : function(test) {
        test.expect(12);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6));
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
        test.done();
    }
};
