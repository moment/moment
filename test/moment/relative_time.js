var moment = require("../../moment");

exports.relativeTime = {
    setUp : function (done) {
        done();
    },

    "default thresholds" : function (test) {
        test.expect(12);

        var a = moment();

        // Seconds to minutes threshold
        a.subtract('seconds', 44);
        test.equal(a.fromNow(), "a few seconds ago", "Below default seconds to minutes threshold");
        a.subtract('seconds', 1);
        test.equal(a.fromNow(), "a minute ago", "Above default seconds to minutes threshold");

        // Minutes to hours threshold
        a = moment();
        a.subtract('minutes', 44);
        test.equal(a.fromNow(), "44 minutes ago", "Below default minute to hour threshold");
        a.subtract('minutes', 1);
        test.equal(a.fromNow(), "an hour ago", "Above default minute to hour threshold");

        // Hours to days threshold
        a = moment();
        a.subtract('hours', 21);
        test.equal(a.fromNow(), "21 hours ago", "Below default hours to day threshold");
        a.subtract('hours', 1);
        test.equal(a.fromNow(), "a day ago", "Above default hours to day threshold");

        // Days to month (singular) threshold
        a = moment();
        a.subtract('days', 25);
        test.equal(a.fromNow(), "25 days ago", "Below default days to month (singular) threshold");
        a.subtract('days', 1);
        test.equal(a.fromNow(), "a month ago", "Above default days to month (singular) threshold");

        // Days to months (plural) threshold
        a = moment();
        a.subtract('days', 45);
        test.equal(a.fromNow(), "a month ago", "Below default days to months (plural) threshold");
        a.subtract('days', 1);
        test.equal(a.fromNow(), "2 months ago", "Above default days to months (plural) threshold");

        // Days to years threshold
        a = moment();
        a.subtract('days', 344);
        test.equal(a.fromNow(), "11 months ago", "Below default days to years threshold");
        a.subtract('days', 1);
        test.equal(a.fromNow(), "a year ago", "Above default days to years threshold");

        test.done();
    },

    "custom thresholds" : function (test) {
        test.expect(12);

        // Seconds to minutes threshold
        moment.relativeTimeThreshold('s', 55);
        var a = moment();
        a.subtract('seconds', 54);
        test.equal(a.fromNow(), "a few seconds ago", "Below custom seconds to minutes threshold");
        a.subtract('seconds', 1);
        test.equal(a.fromNow(), "a minute ago", "Above custom seconds to minutes threshold");

        moment.relativeTimeThreshold('s', 45);

        // Minutes to hours threshold
        moment.relativeTimeThreshold('m', 55);
        a = moment();
        a.subtract('minutes', 54);
        test.equal(a.fromNow(), "54 minutes ago", "Below custom minutes to hours threshold");
        a.subtract('minutes', 1);
        test.equal(a.fromNow(), "an hour ago", "Above custom minutes to hours threshold");
        moment.relativeTimeThreshold('m', 45);

        // Hours to days threshold
        moment.relativeTimeThreshold('h', 24);
        a = moment();
        a.subtract('hours', 23);
        test.equal(a.fromNow(), "23 hours ago", "Below custom hours to days threshold");
        a.subtract('hours', 1);
        test.equal(a.fromNow(), "a day ago", "Above custom hours to days threshold");
        moment.relativeTimeThreshold('h', 22);

        // Days to month (singluar) threshold
        moment.relativeTimeThreshold('dd', 28);
        a = moment();
        a.subtract('days', 28);
        test.equal(a.fromNow(), "28 days ago", "Below custom days to month (singular) threshold");
        a.subtract('days', 1);
        test.equal(a.fromNow(), "a month ago", "Above custom days to month (singular) threshold");
        moment.relativeTimeThreshold('dd', 25);

        // Days to months (plural) threshold
        moment.relativeTimeThreshold('dm', 55);
        a = moment();
        a.subtract('days', 55);
        test.equal(a.fromNow(), "a month ago", "Above custom days to months (plural) threshold");
        a.subtract('days', 1);
        test.equal(a.fromNow(), "2 months ago", "Below custom days to months (plural) threshold");
        moment.relativeTimeThreshold('dm', 45);

        // Days to years threshold
        moment.relativeTimeThreshold('dy', 360);
        a = moment();
        a.subtract('days', 359);
        test.equal(a.fromNow(), "12 months ago", "Below custom days to years threshold");
        a.subtract('days', 1);
        test.equal(a.fromNow(), "a year ago", "Above custom days to years threshold");
        moment.relativeTimeThreshold('dy', 345);
        test.done();
    }
};
