var moment = require("../../moment");

exports.quarter = {
    setUp : function (done) {
        moment.createFromInputFallback = function () {
            throw new Error("input not handled by moment");
        };
        done();
    },

    "library quarter getter" : function (test) {
        test.expect(7);

        test.equal(moment([1985, 1,  4]).quarter(), 1, "Feb  4 1985 is Q1");
        test.equal(moment([2029, 8, 18]).quarter(), 3, "Sep 18 2029 is Q3");
        test.equal(moment([2013, 3, 24]).quarter(), 2, "Apr 24 2013 is Q2");
        test.equal(moment([2015, 2,  5]).quarter(), 1, "Mar  5 2015 is Q1");
        test.equal(moment([1970, 0,  2]).quarter(), 1, "Jan  2 1970 is Q1");
        test.equal(moment([2001, 11, 12]).quarter(), 4, "Dec 12 2001 is Q4");
        test.equal(moment([2000, 0,  2]).quarter(), 1, "Jan  2 2000 is Q1");

        test.done();
    },

    "quarter setter singular" : function (test) {
        var m;
        test.expect(4);

        m = moment([2014, 4, 11]);
        test.equal(m.quarter(2).month(), 4, "set same quarter");
        test.equal(m.quarter(3).month(), 7, "set 3rd quarter");
        test.equal(m.quarter(1).month(), 1, "set 1st quarter");
        test.equal(m.quarter(4).month(), 10, "set 4th quarter");

        test.done();
    },

    "quarter setter plural" : function (test) {
        var m;
        test.expect(4);

        m = moment([2014, 4, 11]);
        test.equal(m.quarters(2).month(), 4, "set same quarter");
        test.equal(m.quarters(3).month(), 7, "set 3rd quarter");
        test.equal(m.quarters(1).month(), 1, "set 1st quarter");
        test.equal(m.quarters(4).month(), 10, "set 4th quarter");

        test.done();
    },

    "quarter setter programmatic" : function (test) {
        var m;
        test.expect(4);

        m = moment([2014, 4, 11]);
        test.equal(m.set("quarter", 2).month(), 4, "set same quarter");
        test.equal(m.set("quarter", 3).month(), 7, "set 3rd quarter");
        test.equal(m.set("quarter", 1).month(), 1, "set 1st quarter");
        test.equal(m.set("quarter", 4).month(), 10, "set 4th quarter");

        test.done();
    },

    "quarter setter programmatic plural" : function (test) {
        var m;
        test.expect(4);

        m = moment([2014, 4, 11]);
        test.equal(m.set("quarters", 2).month(), 4, "set same quarter");
        test.equal(m.set("quarters", 3).month(), 7, "set 3rd quarter");
        test.equal(m.set("quarters", 1).month(), 1, "set 1st quarter");
        test.equal(m.set("quarters", 4).month(), 10, "set 4th quarter");

        test.done();
    },

    "quarter setter programmatic abbr" : function (test) {
        var m;
        test.expect(4);

        m = moment([2014, 4, 11]);
        test.equal(m.set("Q", 2).month(), 4, "set same quarter");
        test.equal(m.set("Q", 3).month(), 7, "set 3rd quarter");
        test.equal(m.set("Q", 1).month(), 1, "set 1st quarter");
        test.equal(m.set("Q", 4).month(), 10, "set 4th quarter");

        test.done();
    },

    "quarter setter only month changes" : function (test) {
        var m;
        test.expect(7);

        m = moment([2014, 4, 11, 1, 2, 3, 4]).quarter(4);
        test.equal(m.year(), 2014, "keep year");
        test.equal(m.month(), 10, "set month");
        test.equal(m.date(), 11, "keep date");
        test.equal(m.hour(), 1, "keep hour");
        test.equal(m.minute(), 2, "keep minutes");
        test.equal(m.second(), 3, "keep seconds");
        test.equal(m.millisecond(), 4, "keep milliseconds");

        test.done();
    },

    "quarter setter bubble to next year" : function (test) {
        var m;
        test.expect(7);

        m = moment([2014, 4, 11, 1, 2, 3, 4]).quarter(7);
        test.equal(m.year(), 2015, "year bubbled");
        test.equal(m.month(), 7, "set month");
        test.equal(m.date(), 11, "keep date");
        test.equal(m.hour(), 1, "keep hour");
        test.equal(m.minute(), 2, "keep minutes");
        test.equal(m.second(), 3, "keep seconds");
        test.equal(m.millisecond(), 4, "keep milliseconds");

        test.done();
    },

    "quarter setter bubble to previous year" : function (test) {
        var m;
        test.expect(7);

        m = moment([2014, 4, 11, 1, 2, 3, 4]).quarter(-3);
        test.equal(m.year(), 2013, "year bubbled");
        test.equal(m.month(), 1, "set month");
        test.equal(m.date(), 11, "keep date");
        test.equal(m.hour(), 1, "keep hour");
        test.equal(m.minute(), 2, "keep minutes");
        test.equal(m.second(), 3, "keep seconds");
        test.equal(m.millisecond(), 4, "keep milliseconds");

        test.done();
    }
};
