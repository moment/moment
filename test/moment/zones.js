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

    "set zone shorthand" : function (test) {
        var zone = moment();

        zone.zone(1);
        test.equal(zone.zone(), 60, "setting the zone to 1 should imply hours and convert to 60");

        zone.zone(-1);
        test.equal(zone.zone(), -60, "setting the zone to -1 should imply hours and convert to -60");

        zone.zone(15);
        test.equal(zone.zone(), 900, "setting the zone to 15 should imply hours and convert to 900");

        zone.zone(-15);
        test.equal(zone.zone(), -900, "setting the zone to -15 should imply hours and convert to -900");

        zone.zone(16);
        test.equal(zone.zone(), 16, "setting the zone to 16 should imply minutes");

        zone.zone(-16);
        test.equal(zone.zone(), -16, "setting the zone to -16 should imply minutes");

        test.done();
    },

    "set zone with string" : function (test) {
        var zone = moment();

        zone.zone("+00:00");
        test.equal(zone.zone(), 0, "set the zone with a timezone string");

        zone.zone("2013-03-07T07:00:00-08:00");
        test.equal(zone.zone(), 480, "set the zone with a string that does not begin with the timezone");

        zone.zone("2013-03-07T07:00:00+0100");
        test.equal(zone.zone(), -60, "set the zone with a string that uses the +0000 syntax");

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

        zone.zone(1380);
        test.equal(zone.format("HH:mm"), "07:31", "UTC 6:31AM should be 7:31AM at +1380");

        test.done();
    },

    "distance from the unix epoch" : function (test) {
        var zoneA = moment(),
            zoneB = moment(zoneA),
            zoneC = moment(zoneA),
            zoneD = moment(zoneA),
            zoneE = moment(zoneA);

        zoneB.utc();
        test.equal(+zoneA, +zoneB, "moment should equal moment.utc");

        zoneC.zone(-60);
        test.equal(+zoneA, +zoneC, "moment should equal moment.zone(-60)");

        zoneD.zone(480);
        test.equal(+zoneA, +zoneD, "moment should equal moment.zone(480)");

        zoneE.zone(1000);
        test.equal(+zoneA, +zoneE, "moment should equal moment.zone(1000)");

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
    },

    "getters and setters" : function (test) {
        var a = moment([2011, 5, 20]);

        test.equal(a.clone().zone(120).year(2012).year(), 2012, "should get and set year correctly");
        test.equal(a.clone().zone(120).month(1).month(), 1, "should get and set month correctly");
        test.equal(a.clone().zone(120).date(2).date(), 2, "should get and set date correctly");
        test.equal(a.clone().zone(120).day(1).day(), 1, "should get and set day correctly");
        test.equal(a.clone().zone(120).hour(1).hour(), 1, "should get and set hour correctly");
        test.equal(a.clone().zone(120).minute(1).minute(), 1, "should get and set minute correctly");

        test.done();
    },

    "getters" : function (test) {
        var a = moment.utc([2012, 0, 1, 0, 0, 0]);

        test.equal(a.clone().zone(120).year(),  2011, "should get year correctly");
        test.equal(a.clone().zone(120).month(),   11, "should get month correctly");
        test.equal(a.clone().zone(120).date(),    31, "should get date correctly");
        test.equal(a.clone().zone(120).hour(),    22, "should get hour correctly");
        test.equal(a.clone().zone(120).minute(),   0, "should get minute correctly");

        test.equal(a.clone().zone(-120).year(),  2012, "should get year correctly");
        test.equal(a.clone().zone(-120).month(),    0, "should get month correctly");
        test.equal(a.clone().zone(-120).date(),     1, "should get date correctly");
        test.equal(a.clone().zone(-120).hour(),     2, "should get hour correctly");
        test.equal(a.clone().zone(-120).minute(),   0, "should get minute correctly");

        test.equal(a.clone().zone(-90).year(),  2012, "should get year correctly");
        test.equal(a.clone().zone(-90).month(),    0, "should get month correctly");
        test.equal(a.clone().zone(-90).date(),     1, "should get date correctly");
        test.equal(a.clone().zone(-90).hour(),     1, "should get hour correctly");
        test.equal(a.clone().zone(-90).minute(),  30, "should get minute correctly");

        test.done();
    },

    "from" : function (test) {
        var zoneA = moment(),
            zoneB = moment(zoneA).zone(720),
            zoneC = moment(zoneA).zone(360),
            zoneD = moment(zoneA).zone(-690),
            other = moment(zoneA).add('m', 35);

        test.equal(zoneA.from(other), zoneB.from(other), "moment#from should be the same in all zones");
        test.equal(zoneA.from(other), zoneC.from(other), "moment#from should be the same in all zones");
        test.equal(zoneA.from(other), zoneD.from(other), "moment#from should be the same in all zones");

        test.done();
    },

    "diff" : function (test) {
        var zoneA = moment(),
            zoneB = moment(zoneA).zone(720),
            zoneC = moment(zoneA).zone(360),
            zoneD = moment(zoneA).zone(-690),
            other = moment(zoneA).add('m', 35);

        test.equal(zoneA.diff(other), zoneB.diff(other), "moment#diff should be the same in all zones");
        test.equal(zoneA.diff(other), zoneC.diff(other), "moment#diff should be the same in all zones");
        test.equal(zoneA.diff(other), zoneD.diff(other), "moment#diff should be the same in all zones");

        test.equal(zoneA.diff(other, 'minute', true), zoneB.diff(other, 'minute', true), "moment#diff should be the same in all zones");
        test.equal(zoneA.diff(other, 'minute', true), zoneC.diff(other, 'minute', true), "moment#diff should be the same in all zones");
        test.equal(zoneA.diff(other, 'minute', true), zoneD.diff(other, 'minute', true), "moment#diff should be the same in all zones");

        test.equal(zoneA.diff(other, 'hour', true), zoneB.diff(other, 'hour', true), "moment#diff should be the same in all zones");
        test.equal(zoneA.diff(other, 'hour', true), zoneC.diff(other, 'hour', true), "moment#diff should be the same in all zones");
        test.equal(zoneA.diff(other, 'hour', true), zoneD.diff(other, 'hour', true), "moment#diff should be the same in all zones");

        test.done();
    },

    "unix offset and timestamp" : function (test) {
        var zoneA = moment(),
            zoneB = moment(zoneA).zone(720),
            zoneC = moment(zoneA).zone(360),
            zoneD = moment(zoneA).zone(-690);

        test.equal(zoneA.unix(), zoneB.unix(), "moment#unix should be the same in all zones");
        test.equal(zoneA.unix(), zoneC.unix(), "moment#unix should be the same in all zones");
        test.equal(zoneA.unix(), zoneD.unix(), "moment#unix should be the same in all zones");

        test.equal(+zoneA, +zoneB, "moment#valueOf should be the same in all zones");
        test.equal(+zoneA, +zoneC, "moment#valueOf should be the same in all zones");
        test.equal(+zoneA, +zoneD, "moment#valueOf should be the same in all zones");

        test.done();
    },

    "cloning" : function (test) {
        test.equal(moment().zone(120).clone().zone(),   120, "explicit cloning should retain the zone");
        test.equal(moment().zone(-120).clone().zone(), -120, "explicit cloning should retain the zone");
        test.equal(moment(moment().zone(120)).zone(),   120, "implicit cloning should retain the zone");
        test.equal(moment(moment().zone(-120)).zone(), -120, "implicit cloning should retain the zone");

        test.done();
    },

    "start of / end of" : function (test) {
        var a = moment.utc([2010, 1, 2, 0, 0, 0]).zone(450);

        test.equal(a.clone().startOf('day').hour(), 0, "start of day should work on moments with a zone");
        test.equal(a.clone().startOf('day').minute(), 0, "start of day should work on moments with a zone");
        test.equal(a.clone().startOf('hour').minute(), 0, "start of hour should work on moments with a zone");

        test.equal(a.clone().endOf('day').hour(), 23, "end of day should work on moments with a zone");
        test.equal(a.clone().endOf('day').minute(), 59, "end of day should work on moments with a zone");
        test.equal(a.clone().endOf('hour').minute(), 59, "end of hour should work on moments with a zone");

        test.done();
    },

    "reset zone with moment#utc" : function (test) {
        var a = moment.utc([2012]).zone(480);

        test.equal(a.clone().hour(),      16, "different zone should have different hour");
        test.equal(a.clone().utc().hour(), 0, "calling moment#utc should reset the offset");

        test.done();
    },

    "reset zone with moment#local" : function (test) {
        var a = moment([2012]).zone(480);

        test.equal(a.clone().local().hour(), 0, "calling moment#local should reset the offset");

        test.done();
    },

    "toDate" : function (test) {
        var zoneA = new Date(),
            zoneB = moment(zoneA).zone(720).toDate(),
            zoneC = moment(zoneA).zone(360).toDate(),
            zoneD = moment(zoneA).zone(-690).toDate();

        test.equal(+zoneA, +zoneB, "moment#toDate should output a date with the right unix timestamp");
        test.equal(+zoneA, +zoneC, "moment#toDate should output a date with the right unix timestamp");
        test.equal(+zoneA, +zoneD, "moment#toDate should output a date with the right unix timestamp");

        test.done();
    },

    "same / before / after" : function (test) {
        var zoneA = moment(),
            zoneB = moment(zoneA).zone(120),
            zoneC = moment(zoneA).zone(-120);

        test.ok(zoneA.isSame(zoneB), "two moments with different offsets should be the same");
        test.ok(zoneA.isSame(zoneC), "two moments with different offsets should be the same");

        test.ok(zoneA.isSame(zoneB, 'hour'), "two moments with different offsets should be the same hour");
        test.ok(zoneA.isSame(zoneC, 'hour'), "two moments with different offsets should be the same hour");

        zoneA.add('hour', 1);

        test.ok(zoneA.isAfter(zoneB), "isAfter should work with two moments with different offsets");
        test.ok(zoneA.isAfter(zoneC), "isAfter should work with two moments with different offsets");

        test.ok(zoneA.isAfter(zoneB, 'hour'), "isAfter:hour should work with two moments with different offsets");
        test.ok(zoneA.isAfter(zoneC, 'hour'), "isAfter:hour should work with two moments with different offsets");

        zoneA.subtract('hour', 2);

        test.ok(zoneA.isBefore(zoneB), "isBefore should work with two moments with different offsets");
        test.ok(zoneA.isBefore(zoneC), "isBefore should work with two moments with different offsets");

        test.ok(zoneA.isBefore(zoneB, 'hour'), "isBefore:hour should work with two moments with different offsets");
        test.ok(zoneA.isBefore(zoneC, 'hour'), "isBefore:hour should work with two moments with different offsets");

        test.done();
    },

    "add / subtract over dst" : function (test) {
        var oldOffset = moment.updateOffset,
            m = moment.utc([2000, 2, 31, 3]);

        moment.updateOffset = function (mom) {
            if (mom.clone().utc().month() > 2) {
                mom.zone(-60);
            } else {
                mom.zone(0);
            }
        };

        test.equal(m.hour(), 3, "should start at 00:00");

        m.add('hour', 24);

        test.equal(m.hour(), 4, "adding 24 hours should disregard dst");

        m.subtract('hour', 24);

        test.equal(m.hour(), 3, "subtracting 24 hours should disregard dst");

        m.add('day', 1);

        test.equal(m.hour(), 3, "adding 1 day should have the same hour");

        m.subtract('day', 1);

        test.equal(m.hour(), 3, "subtracting 1 day should have the same hour");

        m.add('month', 1);

        test.equal(m.hour(), 3, "adding 1 month should have the same hour");

        m.subtract('month', 1);

        test.equal(m.hour(), 3, "subtracting 1 month should have the same hour");

        moment.updateOffset = oldOffset;

        test.done();
    },

    "isDST" : function (test) {
        var oldOffset = moment.updateOffset;

        moment.updateOffset = function (mom) {
            if (mom.month() > 2 && mom.month() < 9) {
                mom.zone(-60);
            } else {
                mom.zone(0);
            }
        };

        test.ok(!moment().month(0).isDST(),  "Jan should not be summer dst");
        test.ok(moment().month(6).isDST(),   "Jul should be summer dst");
        test.ok(!moment().month(11).isDST(), "Dec should not be summer dst");

        moment.updateOffset = function (mom) {
            if (mom.month() > 2 && mom.month() < 9) {
                mom.zone(0);
            } else {
                mom.zone(-60);
            }
        };

        test.ok(moment().month(0).isDST(),  "Jan should be winter dst");
        test.ok(!moment().month(6).isDST(), "Jul should not be winter dst");
        test.ok(moment().month(11).isDST(), "Dec should be winter dst");

        moment.updateOffset = oldOffset;

        test.done();
    },

    "zone names" : function (test) {
        test.expect(8);

        test.equal(moment().zoneAbbr(),   "", "Local zone abbr should be empty");
        test.equal(moment().format('z'),  "", "Local zone formatted abbr should be empty");
        test.equal(moment().zoneName(),   "", "Local zone name should be empty");
        test.equal(moment().format('zz'), "", "Local zone formatted name should be empty");

        test.equal(moment.utc().zoneAbbr(),   "UTC", "UTC zone abbr should be UTC");
        test.equal(moment.utc().format('z'),  "UTC", "UTC zone formatted abbr should be UTC");
        test.equal(moment.utc().zoneName(),   "Coordinated Universal Time", "UTC zone abbr should be Coordinated Universal Time");
        test.equal(moment.utc().format('zz'), "Coordinated Universal Time", "UTC zone formatted abbr should be Coordinated Universal Time");

        test.done();
    }

};
