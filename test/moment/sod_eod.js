var moment = require("../../moment");

exports.end_start_of = {
    "start of year" : function(test) {
        test.expect(8);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('year');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('years');
        test.equal(+m, +ms, "Plural or singular should work");
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
        test.expect(8);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('year');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('years');
        test.equal(+m, +ms, "Plural or singular should work");
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
        test.expect(8);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('month');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('months');
        test.equal(+m, +ms, "Plural or singular should work");
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
        test.expect(8);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('month');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('months');
        test.equal(+m, +ms, "Plural or singular should work");
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
        test.expect(9);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('week');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('weeks');
        test.equal(+m, +ms, "Plural or singular should work");
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
        test.expect(9);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('week');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('weeks');
        test.equal(+m, +ms, "Plural or singular should work");
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
        test.expect(8);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('day');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('days');
        test.equal(+m, +ms, "Plural or singular should work");
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
        test.expect(8);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('day');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('days');
        test.equal(+m, +ms, "Plural or singular should work");
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
        test.expect(8);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('hour');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('hours');
        test.equal(+m, +ms, "Plural or singular should work");
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
        test.expect(8);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('hour');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('hours');
        test.equal(+m, +ms, "Plural or singular should work");
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
        test.expect(8);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('minute');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('minutes');
        test.equal(+m, +ms, "Plural or singular should work");
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
        test.expect(8);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('minute');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('minutes');
        test.equal(+m, +ms, "Plural or singular should work");
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
        test.expect(8);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('second');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).startOf('seconds');
        test.equal(+m, +ms, "Plural or singular should work");
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
        test.expect(8);

        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('second');
        var ms = moment(new Date(2011, 1, 2, 3, 4, 5, 6)).endOf('seconds');
        test.equal(+m, +ms, "Plural or singular should work");
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
