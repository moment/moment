var moment = require('../../moment');

exports.zoneSwitching = {
    setUp : function (done) {
        moment.locale('en');
        moment.createFromInputFallback = function () {
            throw new Error("input not handled by moment");
        };

        done();
    },

    "local to utc, keepLocalTime = true" : function (test) {
        var m = moment(),
            fmt = "YYYY-DD-MM HH:mm:ss";
        test.equal(m.clone().utc(true).format(fmt), m.format(fmt), "local to utc failed to keep local time");

        test.done();
    },

    "local to utc, keepLocalTime = false" : function (test) {
        var m = moment();
        test.equal(m.clone().utc().valueOf(), m.valueOf(), "local to utc failed to keep utc time (implicit)");
        test.equal(m.clone().utc(false).valueOf(), m.valueOf(), "local to utc failed to keep utc time (explicit)");

        test.done();
    },

    "local to zone, keepLocalTime = true" : function (test) {
        var m = moment(),
            fmt = "YYYY-DD-MM HH:mm:ss",
            z;

        // Apparently there is -12:00 and +14:00
        // http://en.wikipedia.org/wiki/UTC+14:00
        // http://en.wikipedia.org/wiki/UTC-12:00
        for (z = -12; z <= 14; ++z) {
            test.equal(m.clone().zone(z * 60, true).format(fmt), m.format(fmt),
                    "local to zone(" + z + ":00) failed to keep local time");
        }

        test.done();
    },

    "local to zone, keepLocalTime = false" : function (test) {
        var m = moment(),
            z;

        // Apparently there is -12:00 and +14:00
        // http://en.wikipedia.org/wiki/UTC+14:00
        // http://en.wikipedia.org/wiki/UTC-12:00
        for (z = -12; z <= 14; ++z) {
            test.equal(m.clone().zone(z * 60).valueOf(), m.valueOf(),
                    "local to zone(" + z + ":00) failed to keep utc time (implicit)");
            test.equal(m.clone().zone(z * 60, false).valueOf(), m.valueOf(),
                    "local to zone(" + z + ":00) failed to keep utc time (explicit)");
        }

        test.done();
    },

    "utc to local, keepLocalTime = true" : function (test) {
        var um = moment.utc(),
            fmt = "YYYY-DD-MM HH:mm:ss";

        test.equal(um.clone().local(true).format(fmt), um.format(fmt), "utc to local failed to keep local time");

        test.done();
    },

    "utc to local, keepLocalTime = false" : function (test) {
        var um = moment.utc();
        test.equal(um.clone().local().valueOf(), um.valueOf(), "utc to local failed to keep utc time (implicit)");
        test.equal(um.clone().local(false).valueOf(), um.valueOf(), "utc to local failed to keep utc time (explicit)");

        test.done();
    },

    "zone to local, keepLocalTime = true" : function (test) {
        var m = moment(),
            fmt = "YYYY-DD-MM HH:mm:ss",
            z;

        // Apparently there is -12:00 and +14:00
        // http://en.wikipedia.org/wiki/UTC+14:00
        // http://en.wikipedia.org/wiki/UTC-12:00
        for (z = -12; z <= 14; ++z) {
            m.zone(z * 60);

            test.equal(m.clone().local(true).format(fmt), m.format(fmt),
                    "zone(" + z + ":00) to local failed to keep local time");
        }

        test.done();
    },

    "zone to local, keepLocalTime = false" : function (test) {
        var m = moment(),
            z;

        // Apparently there is -12:00 and +14:00
        // http://en.wikipedia.org/wiki/UTC+14:00
        // http://en.wikipedia.org/wiki/UTC-12:00
        for (z = -12; z <= 14; ++z) {
            m.zone(z * 60);

            test.equal(m.clone().local(false).valueOf(), m.valueOf(),
                    "zone(" + z + ":00) to local failed to keep utc time (explicit)");
            test.equal(m.clone().local().valueOf(), m.valueOf(),
                    "zone(" + z + ":00) to local failed to keep utc time (implicit)");
        }

        test.done();
    }
};
