var moment = require("../../moment");

exports.leapyear = {
    setUp : function (done) {
        moment.createFromInputFallback = function () {
            throw new Error("input not handled by moment");
        };
        done();
    },

    "leap year" : function (test) {
        test.expect(4);

        test.equal(moment([2010, 0, 1]).isLeapYear(), false, '2010');
        test.equal(moment([2100, 0, 1]).isLeapYear(), false, '2100');
        test.equal(moment([2008, 0, 1]).isLeapYear(), true, '2008');
        test.equal(moment([2000, 0, 1]).isLeapYear(), true, '2000');
        test.done();
    }
};
