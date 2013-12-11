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

    "utc and local" : function (test) {
        test.expect(7);

        var m = moment(Date.UTC(2011, 1, 2, 3, 4, 5, 6)), zone, expected;
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
        zone = Math.ceil(m.zone() / 60);
        expected = (24 + 3 - zone) % 24;
        test.equal(m.hours(), expected, "the hours (" + m.hours() + ") should be correct for local");
        test.equal(moment().utc().zone(), 0, "timezone in utc should always be zero");

        test.done();
    },

    "creating with utc and no arguments" : function (test) {
        test.expect(2);

        var startOfTest = new Date().valueOf(),
            momentDefaultUtcTime = moment.utc().valueOf(),
            afterMomentCreationTime = new Date().valueOf();

        test.ok(startOfTest <= momentDefaultUtcTime, "moment UTC default time should be now, not in the past");
        test.ok(momentDefaultUtcTime <= afterMomentCreationTime, "moment UTC default time should be now, not in the future");

        test.done();
    },

    "creating with utc and a date parameter array" : function (test) {
        test.expect(6);

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

    "creating with utc without timezone" : function (test) {
        test.expect(4);

        var m = moment.utc("2012-01-02T08:20:00");
        test.equal(m.date(), 2, "the day should be correct for utc parse without timezone");
        test.equal(m.hours(), 8, "the hours should be correct for utc parse without timezone");

        m = moment.utc("2012-01-02T08:20:00+09:00");
        test.equal(m.date(), 1, "the day should be correct for utc parse with timezone");
        test.equal(m.hours(), 23, "the hours should be correct for utc parse with timezone");

        test.done();
    },

    "cloning with utc" : function (test) {
        test.expect(4);

        var m = moment.utc("2012-01-02T08:20:00");
        test.equal(moment.utc(m)._isUTC, true, "the local zone should be converted to UTC");
        test.equal(moment.utc(m.clone().utc())._isUTC, true, "the local zone should stay in UTC");

        m.zone(120);
        test.equal(moment.utc(m)._isUTC, true, "the explicit zone should stay in UTC");
        test.equal(moment.utc(m).zone(), 0, "the explicit zone should have an offset of 0");

        test.done();
    },

    "weekday with utc" : function (test) {
        test.expect(1);

        test.equal(
            moment('2013-09-15T00:00:00Z').utc().weekday(), // first minute of the day
            moment('2013-09-15T23:59:00Z').utc().weekday(), // last minute of the day
            "a UTC-moment's .weekday() should not be affected by the local timezone"
        );

        test.done();
    }
};
