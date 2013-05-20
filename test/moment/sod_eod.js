var moment = require("../../moment");

exports.end_start_of = {
    setUp : function (cb) {
        moment.lang('en');
        cb();
    },

    tearDown : function (cb) {
        moment.lang('en');
        cb();
    },

    "start of year" : function(test) {
        test.expect(9);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('year');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('years');
        var ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('y');
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 0, "strip out the month");
        test.equal(m.date(), 1, "strip out the day");
        test.equal(m.hours(), 0, "strip out the hours");
        test.equal(m.minutes(), 0, "strip out the minutes");
        test.equal(m.seconds(), 0, "strip out the seconds");
        test.equal(m.milliseconds(), 0, "strip out the milliseconds");
        test.done();
    },

    "end of year" : function(test) {
        test.expect(9);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('year');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('years');
        var ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('y');
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 11, "set the month");
        test.equal(m.date(), 31, "set the day");
        test.equal(m.hours(), 23, "set the hours");
        test.equal(m.minutes(), 59, "set the minutes");
        test.equal(m.seconds(), 59, "set the seconds");
        test.equal(m.milliseconds(), 999, "set the seconds");
        test.done();
    },

    "start of month" : function(test) {
        test.expect(9);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('month');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('months');
        var ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('M');
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 1, "strip out the day");
        test.equal(m.hours(), 0, "strip out the hours");
        test.equal(m.minutes(), 0, "strip out the minutes");
        test.equal(m.seconds(), 0, "strip out the seconds");
        test.equal(m.milliseconds(), 0, "strip out the milliseconds");
        test.done();
    },

    "end of month" : function(test) {
        test.expect(9);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('month');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('months');
        var ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('M');
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 28, "set the day");
        test.equal(m.hours(), 23, "set the hours");
        test.equal(m.minutes(), 59, "set the minutes");
        test.equal(m.seconds(), 59, "set the seconds");
        test.equal(m.milliseconds(), 999, "set the seconds");
        test.done();
    },

    "start of week" : function(test) {
        test.expect(10);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('week');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('weeks');
        var ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('w');
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 0, "rolls back to January");
        test.equal(m.day(), 0, "set day of week");
        test.equal(m.date(), 30, "set correct date");
        test.equal(m.hours(), 0, "strip out the hours");
        test.equal(m.minutes(), 0, "strip out the minutes");
        test.equal(m.seconds(), 0, "strip out the seconds");
        test.equal(m.milliseconds(), 0, "strip out the milliseconds");
        test.done();
    },

    "end of week" : function(test) {
        test.expect(10);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('week');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('weeks');
        var ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('weeks');
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.day(), 6, "set the day of the week");
        test.equal(m.date(), 5, "set the day");
        test.equal(m.hours(), 23, "set the hours");
        test.equal(m.minutes(), 59, "set the minutes");
        test.equal(m.seconds(), 59, "set the seconds");
        test.equal(m.milliseconds(), 999, "set the seconds");
        test.done();
    },

    "start of day" : function(test) {
        test.expect(9);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('day');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('days');
        var ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('d');
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 2, "keep the day");
        test.equal(m.hours(), 0, "strip out the hours");
        test.equal(m.minutes(), 0, "strip out the minutes");
        test.equal(m.seconds(), 0, "strip out the seconds");
        test.equal(m.milliseconds(), 0, "strip out the milliseconds");
        test.done();
    },

    "end of day" : function(test) {
        test.expect(9);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('day');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('days');
        var ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('d');
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 2, "keep the day");
        test.equal(m.hours(), 23, "set the hours");
        test.equal(m.minutes(), 59, "set the minutes");
        test.equal(m.seconds(), 59, "set the seconds");
        test.equal(m.milliseconds(), 999, "set the seconds");
        test.done();
    },

    "start of hour" : function(test) {
        test.expect(9);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('hour');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('hours');
        var ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('h');
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 2, "keep the day");
        test.equal(m.hours(), 3, "keep the hours");
        test.equal(m.minutes(), 0, "strip out the minutes");
        test.equal(m.seconds(), 0, "strip out the seconds");
        test.equal(m.milliseconds(), 0, "strip out the milliseconds");
        test.done();
    },

    "end of hour" : function(test) {
        test.expect(9);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('hour');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('hours');
        var ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('h');
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 2, "keep the day");
        test.equal(m.hours(), 3, "keep the hours");
        test.equal(m.minutes(), 59, "set the minutes");
        test.equal(m.seconds(), 59, "set the seconds");
        test.equal(m.milliseconds(), 999, "set the seconds");
        test.done();
    },

    "start of minute" : function(test) {
        test.expect(9);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('minute');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('minutes');
        var ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('m');
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 2, "keep the day");
        test.equal(m.hours(), 3, "keep the hours");
        test.equal(m.minutes(), 4, "keep the minutes");
        test.equal(m.seconds(), 0, "strip out the seconds");
        test.equal(m.milliseconds(), 0, "strip out the milliseconds");
        test.done();
    },

    "end of minute" : function(test) {
        test.expect(9);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('minute');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('minutes');
        var ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('m');
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 2, "keep the day");
        test.equal(m.hours(), 3, "keep the hours");
        test.equal(m.minutes(), 4, "keep the minutes");
        test.equal(m.seconds(), 59, "set the seconds");
        test.equal(m.milliseconds(), 999, "set the seconds");
        test.done();
    },

    "start of second" : function(test) {
        test.expect(9);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('second');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('seconds');
		var ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('s');
        test.equal(+m, +ms, "Plural or singular should work");
		test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 2, "keep the day");
        test.equal(m.hours(), 3, "keep the hours");
        test.equal(m.minutes(), 4, "keep the minutes");
        test.equal(m.seconds(), 5, "keep the the seconds");
        test.equal(m.milliseconds(), 0, "strip out the milliseconds");
        test.done();
    },

    "end of second" : function(test) {
        test.expect(9);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('second');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('seconds');
        var ma = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('s');
        test.equal(+m, +ms, "Plural or singular should work");
        test.equal(+m, +ma, "Full or abbreviated should work");
        test.equal(m.year(), 2011, "keep the year");
        test.equal(m.month(), 1, "keep the month");
        test.equal(m.date(), 2, "keep the day");
        test.equal(m.hours(), 3, "keep the hours");
        test.equal(m.minutes(), 4, "keep the minutes");
        test.equal(m.seconds(), 5, "keep the seconds");
        test.equal(m.milliseconds(), 999, "set the seconds");
        test.done();
    }
};
