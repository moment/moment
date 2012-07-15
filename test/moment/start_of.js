var moment = require("../../moment");
exports.start_of = {
    "works for seconds": function(test) {
        var now = new Date(),
            startOfSecond = new Date(now);
        startOfSecond.setMilliseconds(0);
        test.equal(startOfSecond.getTime(), moment(now).startOf('second').valueOf());
        test.done();
    },

    "works for minutes": function(test) {
        var now = new Date(),
            startOfMinute = new Date(now);
        startOfMinute.setSeconds(0, 0);
        test.equal(startOfMinute.getTime(), moment(now).startOf('minute').valueOf());
        test.done();
    },

    "works for hours": function(test) {
        var now = new Date(),
            startOfHour = new Date(now);
        startOfHour.setMinutes(0);
        startOfHour.setSeconds(0, 0);
        test.equal(startOfHour.getTime(), moment(now).startOf('hour').valueOf());
        test.done();
    },

    "works for days": function(test) {
        var now = new Date(),
            startOfDay = new Date(now);
        startOfDay.setHours(0, 0, 0, 0);
        test.equal(startOfDay.getTime(), moment(now).startOf('day').valueOf());
        test.done();
    },

    "works for months": function(test) {
        var now = new Date(),
            startOfMonth = new Date(now);
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        test.equal(startOfMonth.getTime(), moment(now).startOf('month').valueOf());
        test.done();
    },

    "works for years": function(test) {
        var now = new Date(),
            startOfYear = new Date(now);
        startOfYear.setMonth(0);
        startOfYear.setDate(1);
        startOfYear.setHours(0, 0, 0, 0);
        test.equal(startOfYear.getTime(), moment(now).startOf('year').valueOf());
        test.done();
    }
};
