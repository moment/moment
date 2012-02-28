var moment = require("../../moment");

exports.days_in_month = {
    "days in month" : function(test) {
        test.expect(12);
        var months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        for (var i = 0; i < 12; i++) {
            test.equal(moment([2011, i]).daysInMonth(),
                       months[i],
                       moment([2011, i]).format('L') + "should have " + months[i] + " days.")
        }
        test.done();
    },

    "days in month leap years" : function(test) {
        test.expect(4);
        test.equal(moment([2010, 1]).daysInMonth(), 28, "Feb 2010 should have 29 days");
        test.equal(moment([2100, 1]).daysInMonth(), 28, "Feb 2100 should have 29 days");
        test.equal(moment([2008, 1]).daysInMonth(), 29, "Feb 2008 should have 29 days");
        test.equal(moment([2000, 1]).daysInMonth(), 29, "Feb 2000 should have 29 days");
        test.done();
    }
};
