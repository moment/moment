var moment = require("../../moment");

exports.utc = {
    "utc and local" : function(test) {
        test.expect(5);

        var m = moment(Date.UTC(2011, 1, 2, 3, 4, 5, 6));
        m.utc();
        // utc
        test.equal(m.date(), 2, "the day should be correct for utc");
        test.equal(m.hours(), 3, "the hours should be correct for utc");

        // local
        m.local();
        if (m.zone() > 180) {
            test.equal(m.date(), 1, "the day should be correct for utc");
        } else {
            test.equal(m.date(), 2, "the day should be correct for utc");
        }
        var expected = (24 + 3 - Math.floor(m.zone() / 60)) % 24;
        test.equal(m.hours(), expected, "the hours (" + m.hours() + ") should be correct for utc");
        test.equal(moment().utc().zone(), 0, "timezone in utc should always be zero");
        test.done();
    },

    "creating with utc" : function(test) {
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
    }
};
