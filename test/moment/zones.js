var moment = require("../../moment");

exports.zones = {
    setUp : function (cb) {
        moment.lang('en');
        cb();
    },

    tearDown : function (cb) {
        moment.lang('en');
        cb();
    },

    "set zone" : function (test) {
        var zone = moment();

        zone.zone(0);
        test.equal(zone.zone(), 0, "should be able to set the zone to 0");

        zone.zone(60);
        test.equal(zone.zone(), 60, "should be able to set the zone to 60");

        zone.zone(-60);
        test.equal(zone.zone(), -60, "should be able to set the zone to -60");

        test.done();
    },

    "change hours when changing the zone" : function (test) {
        var zone = moment.utc([2000, 0, 1, 6]);

        zone.zone(0);
        test.equal(zone.hour(), 6, "UTC 6AM should be 6AM at +0000");

        zone.zone(60);
        test.equal(zone.hour(), 5, "UTC 6AM should be 5AM at -0100");

        zone.zone(-60);
        test.equal(zone.hour(), 7, "UTC 6AM should be 7AM at +0100");

        test.done();
    },

    "change minutes when changing the zone" : function (test) {
        var zone = moment.utc([2000, 0, 1, 6, 31]);

        zone.zone(0);
        test.equal(zone.format("HH:mm"), "06:31", "UTC 6:31AM should be 6:31AM at +0000");

        zone.zone(30);
        test.equal(zone.format("HH:mm"), "06:01", "UTC 6:31AM should be 6:01AM at -0030");

        zone.zone(-30);
        test.equal(zone.format("HH:mm"), "07:01", "UTC 6:31AM should be 7:01AM at +0030");

        test.done();
    },

    "distance from the unix epoch" : function (test) {
        var zoneA = moment(),
            zoneB = moment(zoneA),
            zoneC = moment(zoneA),
            zoneD = moment(zoneA);

        zoneB.utc();
        test.equal(+zoneA, +zoneB, "moment should equal moment.utc");

        zoneC.zone(-60);
        test.equal(+zoneA, +zoneC, "moment should equal moment.zone(-60)");

        zoneD.zone(480);
        test.equal(+zoneA, +zoneD, "moment should equal moment.zone(480)");

        test.done();
    },

    "update offset after changing any values" : function (test) {
        var oldOffset = moment.updateOffset,
            m = moment.utc([2000, 6, 1]);

        moment.updateOffset = function (mom) {
            if (mom.__doChange) {
                if (+mom > 962409600000) {
                    mom.zone(120);
                } else {
                    mom.zone(60);
                }
            }
        };

        test.equal(m.format("ZZ"), "+0000", "should be at +0000");
        test.equal(m.format("HH:mm"), "00:00", "should start 12AM at +0000 timezone");

        m.__doChange = true;
        m.add('h', 1);

        test.equal(m.format("ZZ"), "-0200", "should be at -0200");
        test.equal(m.format("HH:mm"), "23:00", "1AM at +0000 should be 11PM at -0200 timezone");

        m.subtract('h', 1);

        test.equal(m.format("ZZ"), "-0100", "should be at -0100");
        test.equal(m.format("HH:mm"), "23:00", "12AM at +0000 should be 11PM at -0100 timezone");

        moment.updateOffset = oldOffset;

        test.done();
    }

};
