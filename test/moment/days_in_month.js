var moment = require("../../moment");

exports.daysInMonth = {
    setUp : function (done) {
        moment.createFromInputFallback = function () {
            throw new Error("input not handled by moment");
        };
        done();
    },

    "days in month" : function (test) {
        test.expect(24);
        var months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], i;
        for (i = 0; i < 12; i++) {
            test.equal(moment([2012, i]).daysInMonth(),
                       months[i],
                       moment([2012, i]).format('L') + " should have " + months[i] + " days. (beginning of month " + i + ')');
        }
        for (i = 0; i < 12; i++) {
            test.equal(moment([2012, i, months[i]]).daysInMonth(),
                       months[i],
                       moment([2012, i, months[i]]).format('L') + " should have " + months[i] + " days. (end of month " + i + ')');
        }
        test.done();
    },

    "days in month leap years" : function (test) {
        test.expect(4);
        test.equal(moment([2010, 1]).daysInMonth(), 28, "Feb 2010 should have 28 days");
        test.equal(moment([2100, 1]).daysInMonth(), 28, "Feb 2100 should have 28 days");
        test.equal(moment([2008, 1]).daysInMonth(), 29, "Feb 2008 should have 29 days");
        test.equal(moment([2000, 1]).daysInMonth(), 29, "Feb 2000 should have 29 days");
        test.done();
    }
};
