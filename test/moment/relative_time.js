var moment = require("../../moment");

exports.relativeTime = {
    "default thresholds" : function (test) {
        var a = moment();

        // Seconds to minutes threshold
        a.subtract(44, 'seconds');
        test.equal(a.fromNow(), "a few seconds ago", "Below default seconds to minutes threshold");
        a.subtract(1, 'seconds');
        test.equal(a.fromNow(), "a minute ago", "Above default seconds to minutes threshold");

        // Minutes to hours threshold
        a = moment();
        a.subtract(44, 'minutes');
        test.equal(a.fromNow(), "44 minutes ago", "Below default minute to hour threshold");
        a.subtract(1, 'minutes');
        test.equal(a.fromNow(), "an hour ago", "Above default minute to hour threshold");

        // Hours to days threshold
        a = moment();
        a.subtract(21, 'hours');
        test.equal(a.fromNow(), "21 hours ago", "Below default hours to day threshold");
        a.subtract(1, 'hours');
        test.equal(a.fromNow(), "a day ago", "Above default hours to day threshold");

        // Days to month threshold
        a = moment();
        a.subtract(25, 'days');
        test.equal(a.fromNow(), "25 days ago", "Below default days to month (singular) threshold");
        a.subtract(1, 'days');
        test.equal(a.fromNow(), "a month ago", "Above default days to month (singular) threshold");

        // months to year threshold
        a = moment();
        a.subtract(10, 'months');
        test.equal(a.fromNow(), "10 months ago", "Below default days to years threshold");
        a.subtract(1, 'month');
        test.equal(a.fromNow(), "a year ago", "Above default days to years threshold");

        test.done();
    },

    "custom thresholds" : function (test) {
        // Seconds to minutes threshold
        moment.relativeTimeThreshold('s', 55);

        var a = moment();
        a.subtract(54, 'seconds');
        test.equal(a.fromNow(), "a few seconds ago", "Below custom seconds to minutes threshold");
        a.subtract(1, 'seconds');
        test.equal(a.fromNow(), "a minute ago", "Above custom seconds to minutes threshold");

        moment.relativeTimeThreshold('s', 45);

        // Minutes to hours threshold
        moment.relativeTimeThreshold('m', 55);
        a = moment();
        a.subtract(54, 'minutes');
        test.equal(a.fromNow(), "54 minutes ago", "Below custom minutes to hours threshold");
        a.subtract(1, 'minutes');
        test.equal(a.fromNow(), "an hour ago", "Above custom minutes to hours threshold");
        moment.relativeTimeThreshold('m', 45);

        // Hours to days threshold
        moment.relativeTimeThreshold('h', 24);
        a = moment();
        a.subtract(23, 'hours');
        test.equal(a.fromNow(), "23 hours ago", "Below custom hours to days threshold");
        a.subtract(1, 'hours');
        test.equal(a.fromNow(), "a day ago", "Above custom hours to days threshold");
        moment.relativeTimeThreshold('h', 22);

        // Days to month threshold
        moment.relativeTimeThreshold('d', 28);
        a = moment();
        a.subtract(27, 'days');
        test.equal(a.fromNow(), "27 days ago", "Below custom days to month (singular) threshold");
        a.subtract(1, 'days');
        test.equal(a.fromNow(), "a month ago", "Above custom days to month (singular) threshold");
        moment.relativeTimeThreshold('d', 26);

        // months to years threshold
        moment.relativeTimeThreshold('M', 9);
        a = moment();
        a.subtract(8, 'months');
        test.equal(a.fromNow(), "8 months ago", "Below custom days to years threshold");
        a.subtract(1, 'months');
        test.equal(a.fromNow(), "a year ago", "Above custom days to years threshold");
        moment.relativeTimeThreshold('M', 11);
        test.done();
    },

    "retrive threshold settings" : function (test) {
        test.expect(1);
        moment.relativeTimeThreshold('m', 45);
        var minuteThreshold = moment.relativeTimeThreshold('m');

        test.equal(minuteThreshold, 45, "Can retrieve minute setting");

        test.done();
    }
};
