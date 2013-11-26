var moment = require("../../moment");

exports.quarter = {
    "library quarter" : function (test) {
        test.expect(7);

        test.equal(moment([1985, 1,  4]).quarter(), 1, "Feb  4 1985 is Q1");
        test.equal(moment([2029, 8, 18]).quarter(), 3, "Sep 18 2029 is Q3");
        test.equal(moment([2013, 3, 24]).quarter(), 2, "Apr 24 2013 is Q2");
        test.equal(moment([2015, 2,  5]).quarter(), 1, "Mar  5 2015 is Q1");
        test.equal(moment([1970, 0,  2]).quarter(), 1, "Jan  2 1970 is Q1");
        test.equal(moment([2001, 11, 12]).quarter(), 4, "Dec 12 2001 is Q4");
        test.equal(moment([2000, 0,  2]).quarter(), 1, "Jan  2 2000 is Q1");

        test.done();
    }
};
