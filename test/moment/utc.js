var moment = require("../../moment");

exports.utc = {
    setUp : function (cb) {
        moment.lang('en');
        cb();
    },

    tearDown : function (cb) {
        moment.lang('en');
        cb();
    },

    "utc and local" : function(test) {
        test.expect(7);

        var m = moment(Date.UTC(2011, 1, 2, 3, 4, 5, 6));
        m.utc();
        // utc
        test.equal(m.date(), 2, "the day should be correct for utc");
        test.equal(m.day(), 3, "the date should be correct for utc");
        test.equal(m.hours(), 3, "the hours should be correct for utc");

        // local
        m.local();
        if (m.zone() > 180) {
            test.equal(m.date(), 1, "the date should be correct for local");
            test.equal(m.day(), 2, "the day should be correct for local");
        } else {
            test.equal(m.date(), 2, "the date should be correct for local");
            test.equal(m.day(), 3, "the day should be correct for local");
        }
        var zone = Math.ceil(m.zone() / 60);
        var expected = (24 + 3 - zone) % 24;
        test.equal(m.hours(), expected, "the hours (" + m.hours() + ") should be correct for local");
        test.equal(moment().utc().zone(), 0, "timezone in utc should always be zero");
        test.done();
    },

    "creating with utc" : function(test) {
        test.expect(7);

        var diff = moment.utc().valueOf() - moment().valueOf();
        diff = Math.abs(diff);
        // we check the diff rather than equality because sometimes they are off by a millisecond

        test.ok(diff < 5, "Calling moment.utc() should default to the current time");

        var m = moment.utc([2011, 1, 2, 3, 4, 5, 6]);
        test.equal(m.date(), 2, "the day should be correct for utc array");
        test.equal(m.hours(), 3, "the hours should be correct for utc array");

        m = moment.utc("2011-02-02 3:04:05", "YYYY-MM-DD HH:mm:ss");
        test.equal(m.date(), 2, "the day should be correct for utc parsing format");
        test.equal(m.hours(), 3, "the hours should be correct for utc parsing format");

        m = moment.utc("2011-02-02T03:04:05+00:00");
        test.equal(m.date(), 2, "the day should be correct for utc parsing iso");
        test.equal(m.hours(), 3, "the hours should be correct for utc parsing iso");

        test.done();
    },

    "creating with utc without timezone" : function(test) {
        test.expect(4);

        var m = moment.utc("2012-01-02T08:20:00");
        test.equal(m.date(), 2, "the day should be correct for utc parse without timezone");
        test.equal(m.hours(), 8, "the hours should be correct for utc parse without timezone");

        m = moment.utc("2012-01-02T08:20:00+09:00");
        test.equal(m.date(), 1, "the day should be correct for utc parse with timezone");
        test.equal(m.hours(), 23, "the hours should be correct for utc parse with timezone");

        test.done();
    }
};
