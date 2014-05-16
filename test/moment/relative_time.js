var moment = require("../../moment");

exports.relativeTime = {
    setUp : function (done) {
        done();
    },

    "default thresholds" : function (test) {
        test.expect(5);

        var a = moment();
        a.subtract('seconds', 10);
        test.equal(a.fromNow(), "a few seconds ago", "Seconds friendly relative time");
        a.subtract('seconds', 35);
        test.equal(a.fromNow(), "a minute ago", "Minute friendly relative time");
        a.subtract('minutes', 1);
        test.equal(a.fromNow(), "2 minutes ago", "Minutes friendly relative time");
        a.subtract('minutes', 45);
        test.equal(a.fromNow(), "an hour ago", "1 hour friendly relative time");
        a.subtract('hours', 22);
        test.equal(a.fromNow(), "a day ago", "1 day friendly relative time");
        test.done();
    },

    "custom thresholds" : function (test) {
        test.expect(3);

        var a = moment();
        moment.relativeTimeThreshold('s', 55);
        a.subtract('seconds', 54);
        test.equal(a.fromNow(), "a few seconds ago", "Custom <1 minute friendly relative time");
        moment.relativeTimeThreshold('s', 45);

        a = moment();
        moment.relativeTimeThreshold('m', 55);
        a.subtract('minutes', 54);
        test.equal(a.fromNow(), "54 minutes ago", "Custom <1 hour friendly relative time");
        moment.relativeTimeThreshold('m', 45);

        a = moment();
        moment.relativeTimeThreshold('h', 24);
        a.subtract('hours', 23);
        test.equal(a.fromNow(), "23 hours ago", "Custom <1 day friendly relative time");
        moment.relativeTimeThreshold('h', 22);
        test.done();
    }
};
