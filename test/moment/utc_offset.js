/*global require, exports */

var moment = require('../../moment');

exports.utcOffset = {
    setUp : function (done) {
        moment.createFromInputFallback = function () {
            throw new Error('input not handled by moment');
        };
        done();
    },

    'setter / getter blackbox' : function (test) {
        var m = moment([2010]);

        test.equal(m.clone().utcOffset(0).utcOffset(), 0, 'utcOffset 0');

        test.equal(m.clone().utcOffset(1).utcOffset(), 60, 'utcOffset 1 is 60');
        test.equal(m.clone().utcOffset(60).utcOffset(), 60, 'utcOffset 60');
        test.equal(m.clone().utcOffset('+01:00').utcOffset(), 60, 'utcOffset +01:00 is 60');
        test.equal(m.clone().utcOffset('+0100').utcOffset(), 60, 'utcOffset +0100 is 60');

        test.equal(m.clone().utcOffset(-1).utcOffset(), -60, 'utcOffset -1 is -60');
        test.equal(m.clone().utcOffset(-60).utcOffset(), -60, 'utcOffset -60');
        test.equal(m.clone().utcOffset('-01:00').utcOffset(), -60, 'utcOffset -01:00 is -60');
        test.equal(m.clone().utcOffset('-0100').utcOffset(), -60, 'utcOffset -0100 is -60');

        test.equal(m.clone().utcOffset(1.5).utcOffset(), 90, 'utcOffset 1.5 is 90');
        test.equal(m.clone().utcOffset(90).utcOffset(), 90, 'utcOffset 1.5 is 90');
        test.equal(m.clone().utcOffset('+01:30').utcOffset(), 90, 'utcOffset +01:30 is 90');
        test.equal(m.clone().utcOffset('+0130').utcOffset(), 90, 'utcOffset +0130 is 90');

        test.equal(m.clone().utcOffset(-1.5).utcOffset(), -90, 'utcOffset -1.5');
        test.equal(m.clone().utcOffset(-90).utcOffset(), -90, 'utcOffset -90');
        test.equal(m.clone().utcOffset('-01:30').utcOffset(), -90, 'utcOffset +01:30 is 90');
        test.equal(m.clone().utcOffset('-0130').utcOffset(), -90, 'utcOffset +0130 is 90');

        test.done();
    },

    'utcOffset shorthand hours -> minutes' : function (test) {
        var i;
        for (i = -15; i <= 15; ++i) {
            test.equal(moment().utcOffset(i).utcOffset(), i * 60,
                    '' + i + ' -> ' + i * 60);
        }
        test.equal(moment().utcOffset(-16).utcOffset(), -16, '-16 -> -16');
        test.equal(moment().utcOffset(16).utcOffset(), 16, '16 -> 16');

        test.done();
    },

    'isLocal, isUtc, isUtcOffset' : function (test) {
        test.ok(moment().isLocal(), 'moment() creates objects in local time');
        test.ok(!moment.utc().isLocal(), 'moment.utc creates objects NOT in local time');
        test.ok(moment.utc().local().isLocal(), 'moment.fn.local() converts to local time');
        test.ok(!moment().utcOffset(5).isLocal(), 'moment.fn.utcOffset(N) puts objects NOT in local time');
        test.ok(moment().utcOffset(5).local().isLocal(), 'moment.fn.local() converts to local time');

        test.ok(moment.utc().isUtc(), 'moment.utc() creates objects in utc time');
        test.ok(moment().utcOffset(0).isUtc(), 'utcOffset(0) is equivalent to utc mode');
        test.ok(!moment().utcOffset(1).isUtc(), 'utcOffset(1) is NOT equivalent to utc mode');

        test.ok(!moment().isUtcOffset(), 'moment() creates objects NOT in utc-offset mode');
        test.ok(moment.utc().isUtcOffset(), 'moment.utc() creates objects in utc-offset mode');
        test.ok(moment().utcOffset(3).isUtcOffset(), 'utcOffset(N != 0) creates objects in utc-offset mode');
        test.ok(moment().utcOffset(0).isUtcOffset(), 'utcOffset(0) creates objects in utc-offset mode');

        test.done();
    },

    'isUTC' : function (test) {
        test.ok(moment.utc().isUTC(), 'moment.utc() creates objects in utc time');
        test.ok(moment().utcOffset(0).isUTC(), 'utcOffset(0) is equivalent to utc mode');
        test.ok(!moment().utcOffset(1).isUTC(), 'utcOffset(1) is NOT equivalent to utc mode');

        test.done();
    },

    'change hours when changing the utc offset' : function (test) {
        var m = moment.utc([2000, 0, 1, 6]);
        test.equal(m.hour(), 6, 'UTC 6AM should be 6AM at +0000');

        // sanity check
        m.utcOffset(0);
        test.equal(m.hour(), 6, 'UTC 6AM should be 6AM at +0000');

        m.utcOffset(-60);
        test.equal(m.hour(), 5, 'UTC 6AM should be 5AM at -0100');

        m.utcOffset(60);
        test.equal(m.hour(), 7, 'UTC 6AM should be 7AM at +0100');

        test.done();
    },

    'change minutes when changing the utc offset' : function (test) {
        var m = moment.utc([2000, 0, 1, 6, 31]);

        m.utcOffset(0);
        test.equal(m.format('HH:mm'), '06:31', 'UTC 6:31AM should be 6:31AM at +0000');

        m.utcOffset(-30);
        test.equal(m.format('HH:mm'), '06:01', 'UTC 6:31AM should be 6:01AM at -0030');

        m.utcOffset(30);
        test.equal(m.format('HH:mm'), '07:01', 'UTC 6:31AM should be 7:01AM at +0030');

        m.utcOffset(-1380);
        test.equal(m.format('HH:mm'), '07:31', 'UTC 6:31AM should be 7:31AM at +1380');

        test.done();
    },

    'distance from the unix epoch' : function (test) {
        var zoneA = moment(),
            zoneB = moment(zoneA),
            zoneC = moment(zoneA),
            zoneD = moment(zoneA),
            zoneE = moment(zoneA);

        zoneB.utc();
        test.equal(+zoneA, +zoneB, 'moment should equal moment.utc');

        zoneC.utcOffset(60);
        test.equal(+zoneA, +zoneC, 'moment should equal moment.utcOffset(60)');

        zoneD.utcOffset(-480);
        test.equal(+zoneA, +zoneD,
                'moment should equal moment.utcOffset(-480)');

        zoneE.utcOffset(-1000);
        test.equal(+zoneA, +zoneE,
                'moment should equal moment.utcOffset(-1000)');

        test.done();
    },

    'update offset after changing any values' : function (test) {
        var oldOffset = moment.updateOffset,
            m = moment.utc([2000, 6, 1]);

        moment.updateOffset = function (mom, keepTime) {
            if (mom.__doChange) {
                if (+mom > 962409600000) {
                    mom.utcOffset(-120, keepTime);
                } else {
                    mom.utcOffset(-60, keepTime);
                }
            }
        };

        test.equal(m.format('ZZ'), '+0000', 'should be at +0000');
        test.equal(m.format('HH:mm'), '00:00', 'should start 12AM at +0000 timezone');

        m.__doChange = true;
        m.add(1, 'h');

        test.equal(m.format('ZZ'), '-0200', 'should be at -0200');
        test.equal(m.format('HH:mm'), '23:00', '1AM at +0000 should be 11PM at -0200 timezone');

        m.subtract(1, 'h');

        test.equal(m.format('ZZ'), '-0100', 'should be at -0100');
        test.equal(m.format('HH:mm'), '23:00', '12AM at +0000 should be 11PM at -0100 timezone');

        moment.updateOffset = oldOffset;

        test.done();
    },

    //////////////////
    'getters and setters' : function (test) {
        var a = moment([2011, 5, 20]);

        test.equal(a.clone().utcOffset(-120).year(2012).year(), 2012, 'should get and set year correctly');
        test.equal(a.clone().utcOffset(-120).month(1).month(), 1, 'should get and set month correctly');
        test.equal(a.clone().utcOffset(-120).date(2).date(), 2, 'should get and set date correctly');
        test.equal(a.clone().utcOffset(-120).day(1).day(), 1, 'should get and set day correctly');
        test.equal(a.clone().utcOffset(-120).hour(1).hour(), 1, 'should get and set hour correctly');
        test.equal(a.clone().utcOffset(-120).minute(1).minute(), 1, 'should get and set minute correctly');

        test.done();
    },

    'getters' : function (test) {
        var a = moment.utc([2012, 0, 1, 0, 0, 0]);

        test.equal(a.clone().utcOffset(-120).year(),  2011, 'should get year correctly');
        test.equal(a.clone().utcOffset(-120).month(),   11, 'should get month correctly');
        test.equal(a.clone().utcOffset(-120).date(),    31, 'should get date correctly');
        test.equal(a.clone().utcOffset(-120).hour(),    22, 'should get hour correctly');
        test.equal(a.clone().utcOffset(-120).minute(),   0, 'should get minute correctly');

        test.equal(a.clone().utcOffset(120).year(),  2012, 'should get year correctly');
        test.equal(a.clone().utcOffset(120).month(),    0, 'should get month correctly');
        test.equal(a.clone().utcOffset(120).date(),     1, 'should get date correctly');
        test.equal(a.clone().utcOffset(120).hour(),     2, 'should get hour correctly');
        test.equal(a.clone().utcOffset(120).minute(),   0, 'should get minute correctly');

        test.equal(a.clone().utcOffset(90).year(),  2012, 'should get year correctly');
        test.equal(a.clone().utcOffset(90).month(),    0, 'should get month correctly');
        test.equal(a.clone().utcOffset(90).date(),     1, 'should get date correctly');
        test.equal(a.clone().utcOffset(90).hour(),     1, 'should get hour correctly');
        test.equal(a.clone().utcOffset(90).minute(),  30, 'should get minute correctly');

        test.done();
    },

    'from' : function (test) {
        var zoneA = moment(),
            zoneB = moment(zoneA).utcOffset(-720),
            zoneC = moment(zoneA).utcOffset(-360),
            zoneD = moment(zoneA).utcOffset(690),
            other = moment(zoneA).add(35, 'm');

        test.equal(zoneA.from(other), zoneB.from(other), 'moment#from should be the same in all zones');
        test.equal(zoneA.from(other), zoneC.from(other), 'moment#from should be the same in all zones');
        test.equal(zoneA.from(other), zoneD.from(other), 'moment#from should be the same in all zones');

        test.done();
    },

    'diff' : function (test) {
        var zoneA = moment(),
            zoneB = moment(zoneA).utcOffset(-720),
            zoneC = moment(zoneA).utcOffset(-360),
            zoneD = moment(zoneA).utcOffset(690),
            other = moment(zoneA).add(35, 'm');

        test.equal(zoneA.diff(other), zoneB.diff(other), 'moment#diff should be the same in all zones');
        test.equal(zoneA.diff(other), zoneC.diff(other), 'moment#diff should be the same in all zones');
        test.equal(zoneA.diff(other), zoneD.diff(other), 'moment#diff should be the same in all zones');

        test.equal(zoneA.diff(other, 'minute', true), zoneB.diff(other, 'minute', true), 'moment#diff should be the same in all zones');
        test.equal(zoneA.diff(other, 'minute', true), zoneC.diff(other, 'minute', true), 'moment#diff should be the same in all zones');
        test.equal(zoneA.diff(other, 'minute', true), zoneD.diff(other, 'minute', true), 'moment#diff should be the same in all zones');

        test.equal(zoneA.diff(other, 'hour', true), zoneB.diff(other, 'hour', true), 'moment#diff should be the same in all zones');
        test.equal(zoneA.diff(other, 'hour', true), zoneC.diff(other, 'hour', true), 'moment#diff should be the same in all zones');
        test.equal(zoneA.diff(other, 'hour', true), zoneD.diff(other, 'hour', true), 'moment#diff should be the same in all zones');

        test.done();
    },

    'unix offset and timestamp' : function (test) {
        var zoneA = moment(),
            zoneB = moment(zoneA).utcOffset(-720),
            zoneC = moment(zoneA).utcOffset(-360),
            zoneD = moment(zoneA).utcOffset(690);

        test.equal(zoneA.unix(), zoneB.unix(), 'moment#unix should be the same in all zones');
        test.equal(zoneA.unix(), zoneC.unix(), 'moment#unix should be the same in all zones');
        test.equal(zoneA.unix(), zoneD.unix(), 'moment#unix should be the same in all zones');

        test.equal(+zoneA, +zoneB, 'moment#valueOf should be the same in all zones');
        test.equal(+zoneA, +zoneC, 'moment#valueOf should be the same in all zones');
        test.equal(+zoneA, +zoneD, 'moment#valueOf should be the same in all zones');

        test.done();
    },

    'cloning' : function (test) {
        test.equal(moment().utcOffset(-120).clone().utcOffset(), -120,
                'explicit cloning should retain the offset');
        test.equal(moment().utcOffset(120).clone().utcOffset(), 120,
                'explicit cloning should retain the offset');
        test.equal(moment(moment().utcOffset(-120)).utcOffset(), -120,
                'implicit cloning should retain the offset');
        test.equal(moment(moment().utcOffset(120)).utcOffset(), 120,
                'implicit cloning should retain the offset');

        test.done();
    },

    'start of / end of' : function (test) {
        var a = moment.utc([2010, 1, 2, 0, 0, 0]).utcOffset(-450);

        test.equal(a.clone().startOf('day').hour(), 0,
                'start of day should work on moments with utc offset');
        test.equal(a.clone().startOf('day').minute(), 0,
                'start of day should work on moments with utc offset');
        test.equal(a.clone().startOf('hour').minute(), 0,
                'start of hour should work on moments with utc offset');

        test.equal(a.clone().endOf('day').hour(), 23,
                'end of day should work on moments with utc offset');
        test.equal(a.clone().endOf('day').minute(), 59,
                'end of day should work on moments with utc offset');
        test.equal(a.clone().endOf('hour').minute(), 59,
                'end of hour should work on moments with utc offset');

        test.done();
    },

    'reset offset with moment#utc' : function (test) {
        var a = moment.utc([2012]).utcOffset(-480);

        test.equal(a.clone().hour(),      16, 'different utc offset should have different hour');
        test.equal(a.clone().utc().hour(), 0, 'calling moment#utc should reset the offset');

        test.done();
    },

    'reset offset with moment#local' : function (test) {
        var a = moment([2012]).utcOffset(-480);

        test.equal(a.clone().local().hour(), 0, 'calling moment#local should reset the offset');

        test.done();
    },

    'toDate' : function (test) {
        var zoneA = new Date(),
            zoneB = moment(zoneA).utcOffset(-720).toDate(),
            zoneC = moment(zoneA).utcOffset(-360).toDate(),
            zoneD = moment(zoneA).utcOffset(690).toDate();

        test.equal(+zoneA, +zoneB, 'moment#toDate should output a date with the right unix timestamp');
        test.equal(+zoneA, +zoneC, 'moment#toDate should output a date with the right unix timestamp');
        test.equal(+zoneA, +zoneD, 'moment#toDate should output a date with the right unix timestamp');

        test.done();
    },

    'same / before / after' : function (test) {
        var zoneA = moment().utc(),
            zoneB = moment(zoneA).utcOffset(-120),
            zoneC = moment(zoneA).utcOffset(120);

        test.ok(zoneA.isSame(zoneB), 'two moments with different offsets should be the same');
        test.ok(zoneA.isSame(zoneC), 'two moments with different offsets should be the same');

        test.ok(zoneA.isSame(zoneB, 'hour'), 'two moments with different offsets should be the same hour');
        test.ok(zoneA.isSame(zoneC, 'hour'), 'two moments with different offsets should be the same hour');

        zoneA.add(1, 'hour');

        test.ok(zoneA.isAfter(zoneB), 'isAfter should work with two moments with different offsets');
        test.ok(zoneA.isAfter(zoneC), 'isAfter should work with two moments with different offsets');

        test.ok(zoneA.isAfter(zoneB, 'hour'), 'isAfter:hour should work with two moments with different offsets');
        test.ok(zoneA.isAfter(zoneC, 'hour'), 'isAfter:hour should work with two moments with different offsets');

        zoneA.subtract(2, 'hour');

        test.ok(zoneA.isBefore(zoneB), 'isBefore should work with two moments with different offsets');
        test.ok(zoneA.isBefore(zoneC), 'isBefore should work with two moments with different offsets');

        test.ok(zoneA.isBefore(zoneB, 'hour'), 'isBefore:hour should work with two moments with different offsets');
        test.ok(zoneA.isBefore(zoneC, 'hour'), 'isBefore:hour should work with two moments with different offsets');

        test.done();
    },

    'add / subtract over dst' : function (test) {
        var oldOffset = moment.updateOffset,
            m = moment.utc([2000, 2, 31, 3]);

        moment.updateOffset = function (mom, keepTime) {
            if (mom.clone().utc().month() > 2) {
                mom.utcOffset(60, keepTime);
            } else {
                mom.utcOffset(0, keepTime);
            }
        };

        test.equal(m.hour(), 3, 'should start at 00:00');

        m.add(24, 'hour');

        test.equal(m.hour(), 4, 'adding 24 hours should disregard dst');

        m.subtract(24, 'hour');

        test.equal(m.hour(), 3, 'subtracting 24 hours should disregard dst');

        m.add(1, 'day');

        test.equal(m.hour(), 3, 'adding 1 day should have the same hour');

        m.subtract(1, 'day');

        test.equal(m.hour(), 3, 'subtracting 1 day should have the same hour');

        m.add(1, 'month');

        test.equal(m.hour(), 3, 'adding 1 month should have the same hour');

        m.subtract(1, 'month');

        test.equal(m.hour(), 3, 'subtracting 1 month should have the same hour');

        moment.updateOffset = oldOffset;

        test.done();
    },

    'isDST' : function (test) {
        var oldOffset = moment.updateOffset;

        moment.updateOffset = function (mom, keepTime) {
            if (mom.month() > 2 && mom.month() < 9) {
                mom.utcOffset(60, keepTime);
            } else {
                mom.utcOffset(0, keepTime);
            }
        };

        test.ok(!moment().month(0).isDST(),  'Jan should not be summer dst');
        test.ok(moment().month(6).isDST(),   'Jul should be summer dst');
        test.ok(!moment().month(11).isDST(), 'Dec should not be summer dst');

        moment.updateOffset = function (mom) {
            if (mom.month() > 2 && mom.month() < 9) {
                mom.utcOffset(0);
            } else {
                mom.utcOffset(60);
            }
        };

        test.ok(moment().month(0).isDST(),  'Jan should be winter dst');
        test.ok(!moment().month(6).isDST(), 'Jul should not be winter dst');
        test.ok(moment().month(11).isDST(), 'Dec should be winter dst');

        moment.updateOffset = oldOffset;

        test.done();
    },

    'zone names' : function (test) {
        test.expect(8);

        test.equal(moment().zoneAbbr(),   '', 'Local zone abbr should be empty');
        test.equal(moment().format('z'),  '', 'Local zone formatted abbr should be empty');
        test.equal(moment().zoneName(),   '', 'Local zone name should be empty');
        test.equal(moment().format('zz'), '', 'Local zone formatted name should be empty');

        test.equal(moment.utc().zoneAbbr(),   'UTC', 'UTC zone abbr should be UTC');
        test.equal(moment.utc().format('z'),  'UTC', 'UTC zone formatted abbr should be UTC');
        test.equal(moment.utc().zoneName(),   'Coordinated Universal Time', 'UTC zone abbr should be Coordinated Universal Time');
        test.equal(moment.utc().format('zz'), 'Coordinated Universal Time', 'UTC zone formatted abbr should be Coordinated Universal Time');

        test.done();
    },

    'hours alignment with UTC' : function (test) {
        test.expect(4);

        test.equals(moment().utcOffset(-120).hasAlignedHourOffset(), true);
        test.equals(moment().utcOffset(180).hasAlignedHourOffset(), true);
        test.equals(moment().utcOffset(-90).hasAlignedHourOffset(), false);
        test.equals(moment().utcOffset(90).hasAlignedHourOffset(), false);

        test.done();
    },

    'hours alignment with other zone' : function (test) {
        test.expect(16);

        var m = moment().utcOffset(-120);

        test.equals(m.hasAlignedHourOffset(moment().utcOffset(-180)), true);
        test.equals(m.hasAlignedHourOffset(moment().utcOffset(180)), true);
        test.equals(m.hasAlignedHourOffset(moment().utcOffset(-90)), false);
        test.equals(m.hasAlignedHourOffset(moment().utcOffset(90)), false);

        m = moment().utcOffset(-90);

        test.equals(m.hasAlignedHourOffset(moment().utcOffset(-180)), false);
        test.equals(m.hasAlignedHourOffset(moment().utcOffset(180)), false);
        test.equals(m.hasAlignedHourOffset(moment().utcOffset(-30)), true);
        test.equals(m.hasAlignedHourOffset(moment().utcOffset(30)), true);

        m = moment().utcOffset(60);

        test.equals(m.hasAlignedHourOffset(moment().utcOffset(-180)), true);
        test.equals(m.hasAlignedHourOffset(moment().utcOffset(180)), true);
        test.equals(m.hasAlignedHourOffset(moment().utcOffset(-90)), false);
        test.equals(m.hasAlignedHourOffset(moment().utcOffset(90)), false);

        m = moment().utcOffset(-25);

        test.equals(m.hasAlignedHourOffset(moment().utcOffset(35)), true);
        test.equals(m.hasAlignedHourOffset(moment().utcOffset(-85)), true);

        test.equals(m.hasAlignedHourOffset(moment().utcOffset(-35)), false);
        test.equals(m.hasAlignedHourOffset(moment().utcOffset(85)), false);

        test.done();
    },

    'parse zone' : function (test) {
        test.expect(2);
        var m = moment('2013-01-01T00:00:00-13:00').parseZone();
        test.equal(m.utcOffset(), -13 * 60);
        test.equal(m.hours(), 0);
        test.done();
    },

    'parse zone static' : function (test) {
        test.expect(2);
        var m = moment.parseZone('2013-01-01T00:00:00-13:00');
        test.equal(m.utcOffset(), -13 * 60);
        test.equal(m.hours(), 0);
        test.done();
    },

    'parse zone with more arguments' : function (test) {
        var m;
        test.expect(3);

        m = moment.parseZone('2013 01 01 05 -13:00', 'YYYY MM DD HH ZZ');
        test.equal(m.format(), '2013-01-01T05:00:00-13:00', 'accept input and format');
        m = moment.parseZone('2013-01-01-13:00', 'YYYY MM DD ZZ', true);
        test.equal(m.isValid(), false, 'accept input, format and strict flag');
        m = moment.parseZone('2013-01-01-13:00', ['DD MM YYYY ZZ', 'YYYY MM DD ZZ']);
        test.equal(m.format(), '2013-01-01T00:00:00-13:00', 'accept input and array of formats');

        test.done();
    },

    'parse zone with a timezone from the format string' : function (test) {
        test.expect(1);

        var m = moment('11-12-2013 -0400 +1100', 'DD-MM-YYYY ZZ #####').parseZone();

        test.equal(m.utcOffset(), -4 * 60);
        test.done();
    },

    'parse zone without a timezone included in the format string' : function (test) {
        test.expect(1);

        var m = moment('11-12-2013 -0400 +1100', 'DD-MM-YYYY').parseZone();

        test.equal(m.utcOffset(), 11 * 60);
        test.done();
    },

    'timezone format' : function (test) {
        test.equal(moment().utcOffset(60).format('ZZ'), '+0100', '-60 -> +0100');
        test.equal(moment().utcOffset(90).format('ZZ'), '+0130', '-90 -> +0130');
        test.equal(moment().utcOffset(120).format('ZZ'), '+0200', '-120 -> +0200');

        test.equal(moment().utcOffset(-60).format('ZZ'), '-0100', '+60 -> -0100');
        test.equal(moment().utcOffset(-90).format('ZZ'), '-0130', '+90 -> -0130');
        test.equal(moment().utcOffset(-120).format('ZZ'), '-0200', '+120 -> -0200');
        test.done();
    },

    'local to utc, keepLocalTime = true' : function (test) {
        var m = moment(),
            fmt = 'YYYY-DD-MM HH:mm:ss';
        test.equal(m.clone().utc(true).format(fmt), m.format(fmt), 'local to utc failed to keep local time');

        test.done();
    },

    'local to utc, keepLocalTime = false' : function (test) {
        var m = moment();
        test.equal(m.clone().utc().valueOf(), m.valueOf(), 'local to utc failed to keep utc time (implicit)');
        test.equal(m.clone().utc(false).valueOf(), m.valueOf(), 'local to utc failed to keep utc time (explicit)');

        test.done();
    },

    'local to zone, keepLocalTime = true' : function (test) {
        var m = moment(),
            fmt = 'YYYY-DD-MM HH:mm:ss',
            z;

        // Apparently there is -12:00 and +14:00
        // http://en.wikipedia.org/wiki/UTC+14:00
        // http://en.wikipedia.org/wiki/UTC-12:00
        for (z = -12; z <= 14; ++z) {
            test.equal(m.clone().utcOffset(z * 60, true).format(fmt),
                    m.format(fmt),
                    'local to utcOffset(' + z + ':00) failed to keep local time');
        }

        test.done();
    },

    'local to zone, keepLocalTime = false' : function (test) {
        var m = moment(),
            z;

        // Apparently there is -12:00 and +14:00
        // http://en.wikipedia.org/wiki/UTC+14:00
        // http://en.wikipedia.org/wiki/UTC-12:00
        for (z = -12; z <= 14; ++z) {
            test.equal(m.clone().utcOffset(z * 60).valueOf(),
                    m.valueOf(),
                    'local to utcOffset(' + z + ':00) failed to keep utc time (implicit)');
            test.equal(m.clone().utcOffset(z * 60, false).valueOf(),
                    m.valueOf(),
                    'local to utcOffset(' + z + ':00) failed to keep utc time (explicit)');
        }

        test.done();
    },

    'utc to local, keepLocalTime = true' : function (test) {
        var um = moment.utc(),
            fmt = 'YYYY-DD-MM HH:mm:ss';

        test.equal(um.clone().local(true).format(fmt), um.format(fmt), 'utc to local failed to keep local time');

        test.done();
    },

    'utc to local, keepLocalTime = false' : function (test) {
        var um = moment.utc();
        test.equal(um.clone().local().valueOf(), um.valueOf(), 'utc to local failed to keep utc time (implicit)');
        test.equal(um.clone().local(false).valueOf(), um.valueOf(), 'utc to local failed to keep utc time (explicit)');

        test.done();
    },

    'zone to local, keepLocalTime = true' : function (test) {
        var m = moment(),
            fmt = 'YYYY-DD-MM HH:mm:ss',
            z;

        // Apparently there is -12:00 and +14:00
        // http://en.wikipedia.org/wiki/UTC+14:00
        // http://en.wikipedia.org/wiki/UTC-12:00
        for (z = -12; z <= 14; ++z) {
            m.utcOffset(z * 60);

            test.equal(m.clone().local(true).format(fmt),
                    m.format(fmt),
                    'utcOffset(' + z + ':00) to local failed to keep local time');
        }

        test.done();
    },

    'zone to local, keepLocalTime = false' : function (test) {
        var m = moment(),
            z;

        // Apparently there is -12:00 and +14:00
        // http://en.wikipedia.org/wiki/UTC+14:00
        // http://en.wikipedia.org/wiki/UTC-12:00
        for (z = -12; z <= 14; ++z) {
            m.utcOffset(z * 60);

            test.equal(m.clone().local(false).valueOf(), m.valueOf(),
                    'utcOffset(' + z + ':00) to local failed to keep utc time (explicit)');
            test.equal(m.clone().local().valueOf(), m.valueOf(),
                    'utcOffset(' + z + ':00) to local failed to keep utc time (implicit)');
        }

        test.done();
    }
};
