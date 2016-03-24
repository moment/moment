import { module, test } from '../qunit';
import moment from '../../moment';

module('zones', {
    'setup': function () {
        test.expectedDeprecations('moment().zone');
    }
});

test('set zone', function (assert) {
    var zone = moment();

    zone.zone(0);
    assert.equal(zone.zone(), 0, 'should be able to set the zone to 0');

    zone.zone(60);
    assert.equal(zone.zone(), 60, 'should be able to set the zone to 60');

    zone.zone(-60);
    assert.equal(zone.zone(), -60, 'should be able to set the zone to -60');
});

test('set zone shorthand', function (assert) {
    var zone = moment();

    zone.zone(1);
    assert.equal(zone.zone(), 60, 'setting the zone to 1 should imply hours and convert to 60');

    zone.zone(-1);
    assert.equal(zone.zone(), -60, 'setting the zone to -1 should imply hours and convert to -60');

    zone.zone(15);
    assert.equal(zone.zone(), 900, 'setting the zone to 15 should imply hours and convert to 900');

    zone.zone(-15);
    assert.equal(zone.zone(), -900, 'setting the zone to -15 should imply hours and convert to -900');

    zone.zone(16);
    assert.equal(zone.zone(), 16, 'setting the zone to 16 should imply minutes');

    zone.zone(-16);
    assert.equal(zone.zone(), -16, 'setting the zone to -16 should imply minutes');
});

test('set zone with string', function (assert) {
    var zone = moment();

    zone.zone('+00:00');
    assert.equal(zone.zone(), 0, 'set the zone with a timezone string');

    zone.zone('2013-03-07T07:00:00-08:00');
    assert.equal(zone.zone(), 480, 'set the zone with a string that does not begin with the timezone');

    zone.zone('2013-03-07T07:00:00+0100');
    assert.equal(zone.zone(), -60, 'set the zone with a string that uses the +0000 syntax');

    zone.zone('2013-03-07T07:00:00+02');
    assert.equal(zone.zone(), -120, 'set the zone with a string that uses the +00 syntax');

    zone.zone('03-07-2013T07:00:00-08:00');
    assert.equal(zone.zone(), 480, 'set the zone with a string with a non-ISO 8601 date');
});

test('change hours when changing the zone', function (assert) {
    var zone = moment.utc([2000, 0, 1, 6]);

    zone.zone(0);
    assert.equal(zone.hour(), 6, 'UTC 6AM should be 6AM at +0000');

    zone.zone(60);
    assert.equal(zone.hour(), 5, 'UTC 6AM should be 5AM at -0100');

    zone.zone(-60);
    assert.equal(zone.hour(), 7, 'UTC 6AM should be 7AM at +0100');
});

test('change minutes when changing the zone', function (assert) {
    var zone = moment.utc([2000, 0, 1, 6, 31]);

    zone.zone(0);
    assert.equal(zone.format('HH:mm'), '06:31', 'UTC 6:31AM should be 6:31AM at +0000');

    zone.zone(30);
    assert.equal(zone.format('HH:mm'), '06:01', 'UTC 6:31AM should be 6:01AM at -0030');

    zone.zone(-30);
    assert.equal(zone.format('HH:mm'), '07:01', 'UTC 6:31AM should be 7:01AM at +0030');

    zone.zone(1380);
    assert.equal(zone.format('HH:mm'), '07:31', 'UTC 6:31AM should be 7:31AM at +1380');
});

test('distance from the unix epoch', function (assert) {
    var zoneA = moment(),
        zoneB = moment(zoneA),
        zoneC = moment(zoneA),
        zoneD = moment(zoneA),
        zoneE = moment(zoneA);

    zoneB.utc();
    assert.equal(+zoneA, +zoneB, 'moment should equal moment.utc');

    zoneC.zone(-60);
    assert.equal(+zoneA, +zoneC, 'moment should equal moment.zone(-60)');

    zoneD.zone(480);
    assert.equal(+zoneA, +zoneD, 'moment should equal moment.zone(480)');

    zoneE.zone(1000);
    assert.equal(+zoneA, +zoneE, 'moment should equal moment.zone(1000)');
});

test('update offset after changing any values', function (assert) {
    var oldOffset = moment.updateOffset,
        m = moment.utc([2000, 6, 1]);

    moment.updateOffset = function (mom, keepTime) {
        if (mom.__doChange) {
            if (+mom > 962409600000) {
                mom.zone(120, keepTime);
            } else {
                mom.zone(60, keepTime);
            }
        }
    };

    assert.equal(m.format('ZZ'), '+0000', 'should be at +0000');
    assert.equal(m.format('HH:mm'), '00:00', 'should start 12AM at +0000 timezone');

    m.__doChange = true;
    m.add(1, 'h');

    assert.equal(m.format('ZZ'), '-0200', 'should be at -0200');
    assert.equal(m.format('HH:mm'), '23:00', '1AM at +0000 should be 11PM at -0200 timezone');

    m.subtract(1, 'h');

    assert.equal(m.format('ZZ'), '-0100', 'should be at -0100');
    assert.equal(m.format('HH:mm'), '23:00', '12AM at +0000 should be 11PM at -0100 timezone');

    moment.updateOffset = oldOffset;
});

test('getters and setters', function (assert) {
    var a = moment([2011, 5, 20]);

    assert.equal(a.clone().zone(120).year(2012).year(), 2012, 'should get and set year correctly');
    assert.equal(a.clone().zone(120).month(1).month(), 1, 'should get and set month correctly');
    assert.equal(a.clone().zone(120).date(2).date(), 2, 'should get and set date correctly');
    assert.equal(a.clone().zone(120).day(1).day(), 1, 'should get and set day correctly');
    assert.equal(a.clone().zone(120).hour(1).hour(), 1, 'should get and set hour correctly');
    assert.equal(a.clone().zone(120).minute(1).minute(), 1, 'should get and set minute correctly');
});

test('getters', function (assert) {
    var a = moment.utc([2012, 0, 1, 0, 0, 0]);

    assert.equal(a.clone().zone(120).year(),  2011, 'should get year correctly');
    assert.equal(a.clone().zone(120).month(),   11, 'should get month correctly');
    assert.equal(a.clone().zone(120).date(),    31, 'should get date correctly');
    assert.equal(a.clone().zone(120).hour(),    22, 'should get hour correctly');
    assert.equal(a.clone().zone(120).minute(),   0, 'should get minute correctly');

    assert.equal(a.clone().zone(-120).year(),  2012, 'should get year correctly');
    assert.equal(a.clone().zone(-120).month(),    0, 'should get month correctly');
    assert.equal(a.clone().zone(-120).date(),     1, 'should get date correctly');
    assert.equal(a.clone().zone(-120).hour(),     2, 'should get hour correctly');
    assert.equal(a.clone().zone(-120).minute(),   0, 'should get minute correctly');

    assert.equal(a.clone().zone(-90).year(),  2012, 'should get year correctly');
    assert.equal(a.clone().zone(-90).month(),    0, 'should get month correctly');
    assert.equal(a.clone().zone(-90).date(),     1, 'should get date correctly');
    assert.equal(a.clone().zone(-90).hour(),     1, 'should get hour correctly');
    assert.equal(a.clone().zone(-90).minute(),  30, 'should get minute correctly');
});

test('from', function (assert) {
    var zoneA = moment(),
        zoneB = moment(zoneA).zone(720),
        zoneC = moment(zoneA).zone(360),
        zoneD = moment(zoneA).zone(-690),
        other = moment(zoneA).add(35, 'm');

    assert.equal(zoneA.from(other), zoneB.from(other), 'moment#from should be the same in all zones');
    assert.equal(zoneA.from(other), zoneC.from(other), 'moment#from should be the same in all zones');
    assert.equal(zoneA.from(other), zoneD.from(other), 'moment#from should be the same in all zones');
});

test('diff', function (assert) {
    var zoneA = moment(),
        zoneB = moment(zoneA).zone(720),
        zoneC = moment(zoneA).zone(360),
        zoneD = moment(zoneA).zone(-690),
        other = moment(zoneA).add(35, 'm');

    assert.equal(zoneA.diff(other), zoneB.diff(other), 'moment#diff should be the same in all zones');
    assert.equal(zoneA.diff(other), zoneC.diff(other), 'moment#diff should be the same in all zones');
    assert.equal(zoneA.diff(other), zoneD.diff(other), 'moment#diff should be the same in all zones');

    assert.equal(zoneA.diff(other, 'minute', true), zoneB.diff(other, 'minute', true), 'moment#diff should be the same in all zones');
    assert.equal(zoneA.diff(other, 'minute', true), zoneC.diff(other, 'minute', true), 'moment#diff should be the same in all zones');
    assert.equal(zoneA.diff(other, 'minute', true), zoneD.diff(other, 'minute', true), 'moment#diff should be the same in all zones');

    assert.equal(zoneA.diff(other, 'hour', true), zoneB.diff(other, 'hour', true), 'moment#diff should be the same in all zones');
    assert.equal(zoneA.diff(other, 'hour', true), zoneC.diff(other, 'hour', true), 'moment#diff should be the same in all zones');
    assert.equal(zoneA.diff(other, 'hour', true), zoneD.diff(other, 'hour', true), 'moment#diff should be the same in all zones');
});

test('unix offset and timestamp', function (assert) {
    var zoneA = moment(),
        zoneB = moment(zoneA).zone(720),
        zoneC = moment(zoneA).zone(360),
        zoneD = moment(zoneA).zone(-690);

    assert.equal(zoneA.unix(), zoneB.unix(), 'moment#unix should be the same in all zones');
    assert.equal(zoneA.unix(), zoneC.unix(), 'moment#unix should be the same in all zones');
    assert.equal(zoneA.unix(), zoneD.unix(), 'moment#unix should be the same in all zones');

    assert.equal(+zoneA, +zoneB, 'moment#valueOf should be the same in all zones');
    assert.equal(+zoneA, +zoneC, 'moment#valueOf should be the same in all zones');
    assert.equal(+zoneA, +zoneD, 'moment#valueOf should be the same in all zones');
});

test('cloning', function (assert) {
    assert.equal(moment().zone(120).clone().zone(),   120, 'explicit cloning should retain the zone');
    assert.equal(moment().zone(-120).clone().zone(), -120, 'explicit cloning should retain the zone');
    assert.equal(moment(moment().zone(120)).zone(),   120, 'implicit cloning should retain the zone');
    assert.equal(moment(moment().zone(-120)).zone(), -120, 'implicit cloning should retain the zone');
});

test('start of / end of', function (assert) {
    var a = moment.utc([2010, 1, 2, 0, 0, 0]).zone(450);

    assert.equal(a.clone().startOf('day').hour(), 0, 'start of day should work on moments with a zone');
    assert.equal(a.clone().startOf('day').minute(), 0, 'start of day should work on moments with a zone');
    assert.equal(a.clone().startOf('hour').minute(), 0, 'start of hour should work on moments with a zone');

    assert.equal(a.clone().endOf('day').hour(), 23, 'end of day should work on moments with a zone');
    assert.equal(a.clone().endOf('day').minute(), 59, 'end of day should work on moments with a zone');
    assert.equal(a.clone().endOf('hour').minute(), 59, 'end of hour should work on moments with a zone');
});

test('reset zone with moment#utc', function (assert) {
    var a = moment.utc([2012]).zone(480);

    assert.equal(a.clone().hour(),      16, 'different zone should have different hour');
    assert.equal(a.clone().utc().hour(), 0, 'calling moment#utc should reset the offset');
});

test('reset zone with moment#local', function (assert) {
    var a = moment([2012]).zone(480);

    assert.equal(a.clone().local().hour(), 0, 'calling moment#local should reset the offset');
});

test('toDate', function (assert) {
    var zoneA = new Date(),
        zoneB = moment(zoneA).zone(720).toDate(),
        zoneC = moment(zoneA).zone(360).toDate(),
        zoneD = moment(zoneA).zone(-690).toDate();

    assert.equal(+zoneA, +zoneB, 'moment#toDate should output a date with the right unix timestamp');
    assert.equal(+zoneA, +zoneC, 'moment#toDate should output a date with the right unix timestamp');
    assert.equal(+zoneA, +zoneD, 'moment#toDate should output a date with the right unix timestamp');
});

test('same / before / after', function (assert) {
    var zoneA = moment().utc(),
        zoneB = moment(zoneA).zone(120),
        zoneC = moment(zoneA).zone(-120);

    assert.ok(zoneA.isSame(zoneB), 'two moments with different offsets should be the same');
    assert.ok(zoneA.isSame(zoneC), 'two moments with different offsets should be the same');

    assert.ok(zoneA.isSame(zoneB, 'hour'), 'two moments with different offsets should be the same hour');
    assert.ok(zoneA.isSame(zoneC, 'hour'), 'two moments with different offsets should be the same hour');

    zoneA.add(1, 'hour');

    assert.ok(zoneA.isAfter(zoneB), 'isAfter should work with two moments with different offsets');
    assert.ok(zoneA.isAfter(zoneC), 'isAfter should work with two moments with different offsets');

    assert.ok(zoneA.isAfter(zoneB, 'hour'), 'isAfter:hour should work with two moments with different offsets');
    assert.ok(zoneA.isAfter(zoneC, 'hour'), 'isAfter:hour should work with two moments with different offsets');

    zoneA.subtract(2, 'hour');

    assert.ok(zoneA.isBefore(zoneB), 'isBefore should work with two moments with different offsets');
    assert.ok(zoneA.isBefore(zoneC), 'isBefore should work with two moments with different offsets');

    assert.ok(zoneA.isBefore(zoneB, 'hour'), 'isBefore:hour should work with two moments with different offsets');
    assert.ok(zoneA.isBefore(zoneC, 'hour'), 'isBefore:hour should work with two moments with different offsets');
});

test('add / subtract over dst', function (assert) {
    var oldOffset = moment.updateOffset,
        m = moment.utc([2000, 2, 31, 3]);

    moment.updateOffset = function (mom, keepTime) {
        if (mom.clone().utc().month() > 2) {
            mom.zone(-60, keepTime);
        } else {
            mom.zone(0, keepTime);
        }
    };

    assert.equal(m.hour(), 3, 'should start at 00:00');

    m.add(24, 'hour');

    assert.equal(m.hour(), 4, 'adding 24 hours should disregard dst');

    m.subtract(24, 'hour');

    assert.equal(m.hour(), 3, 'subtracting 24 hours should disregard dst');

    m.add(1, 'day');

    assert.equal(m.hour(), 3, 'adding 1 day should have the same hour');

    m.subtract(1, 'day');

    assert.equal(m.hour(), 3, 'subtracting 1 day should have the same hour');

    m.add(1, 'month');

    assert.equal(m.hour(), 3, 'adding 1 month should have the same hour');

    m.subtract(1, 'month');

    assert.equal(m.hour(), 3, 'subtracting 1 month should have the same hour');

    moment.updateOffset = oldOffset;
});

test('isDST', function (assert) {
    var oldOffset = moment.updateOffset;

    moment.updateOffset = function (mom, keepTime) {
        if (mom.month() > 2 && mom.month() < 9) {
            mom.zone(-60, keepTime);
        } else {
            mom.zone(0, keepTime);
        }
    };

    assert.ok(!moment().month(0).isDST(),  'Jan should not be summer dst');
    assert.ok(moment().month(6).isDST(),   'Jul should be summer dst');
    assert.ok(!moment().month(11).isDST(), 'Dec should not be summer dst');

    moment.updateOffset = function (mom) {
        if (mom.month() > 2 && mom.month() < 9) {
            mom.zone(0);
        } else {
            mom.zone(-60);
        }
    };

    assert.ok(moment().month(0).isDST(),  'Jan should be winter dst');
    assert.ok(!moment().month(6).isDST(), 'Jul should not be winter dst');
    assert.ok(moment().month(11).isDST(), 'Dec should be winter dst');

    moment.updateOffset = oldOffset;
});

test('zone names', function (assert) {
    test.expectedDeprecations();
    assert.equal(moment().zoneAbbr(),   '', 'Local zone abbr should be empty');
    assert.equal(moment().format('z'),  '', 'Local zone formatted abbr should be empty');
    assert.equal(moment().zoneName(),   '', 'Local zone name should be empty');
    assert.equal(moment().format('zz'), '', 'Local zone formatted name should be empty');

    assert.equal(moment.utc().zoneAbbr(),   'UTC', 'UTC zone abbr should be UTC');
    assert.equal(moment.utc().format('z'),  'UTC', 'UTC zone formatted abbr should be UTC');
    assert.equal(moment.utc().zoneName(),   'Coordinated Universal Time', 'UTC zone abbr should be Coordinated Universal Time');
    assert.equal(moment.utc().format('zz'), 'Coordinated Universal Time', 'UTC zone formatted abbr should be Coordinated Universal Time');
});

test('hours alignment with UTC', function (assert) {
    assert.equal(moment().zone(120).hasAlignedHourOffset(), true);
    assert.equal(moment().zone(-180).hasAlignedHourOffset(), true);
    assert.equal(moment().zone(90).hasAlignedHourOffset(), false);
    assert.equal(moment().zone(-90).hasAlignedHourOffset(), false);
});

test('hours alignment with other zone', function (assert) {
    var m = moment().zone(120);

    assert.equal(m.hasAlignedHourOffset(moment().zone(180)), true);
    assert.equal(m.hasAlignedHourOffset(moment().zone(-180)), true);
    assert.equal(m.hasAlignedHourOffset(moment().zone(90)), false);
    assert.equal(m.hasAlignedHourOffset(moment().zone(-90)), false);

    m = moment().zone(90);

    assert.equal(m.hasAlignedHourOffset(moment().zone(180)), false);
    assert.equal(m.hasAlignedHourOffset(moment().zone(-180)), false);
    assert.equal(m.hasAlignedHourOffset(moment().zone(30)), true);
    assert.equal(m.hasAlignedHourOffset(moment().zone(-30)), true);

    m = moment().zone(-60);

    assert.equal(m.hasAlignedHourOffset(moment().zone(180)), true);
    assert.equal(m.hasAlignedHourOffset(moment().zone(-180)), true);
    assert.equal(m.hasAlignedHourOffset(moment().zone(90)), false);
    assert.equal(m.hasAlignedHourOffset(moment().zone(-90)), false);

    m = moment().zone(25);

    assert.equal(m.hasAlignedHourOffset(moment().zone(-35)), true);
    assert.equal(m.hasAlignedHourOffset(moment().zone(85)), true);

    assert.equal(m.hasAlignedHourOffset(moment().zone(35)), false);
    assert.equal(m.hasAlignedHourOffset(moment().zone(-85)), false);
});

test('parse zone', function (assert) {
    var m = moment('2013-01-01T00:00:00-13:00').parseZone();
    assert.equal(m.zone(), 13 * 60);
    assert.equal(m.hours(), 0);
});

test('parse zone static', function (assert) {
    var m = moment.parseZone('2013-01-01T00:00:00-13:00');
    assert.equal(m.zone(), 13 * 60);
    assert.equal(m.hours(), 0);
});

test('parse zone with more arguments', function (assert) {
    test.expectedDeprecations();
    var m;
    m = moment.parseZone('2013 01 01 05 -13:00', 'YYYY MM DD HH ZZ');
    assert.equal(m.format(), '2013-01-01T05:00:00-13:00', 'accept input and format');
    m = moment.parseZone('2013-01-01-13:00', 'YYYY MM DD ZZ', true);
    assert.equal(m.isValid(), false, 'accept input, format and strict flag');
    m = moment.parseZone('2013-01-01-13:00', ['DD MM YYYY ZZ', 'YYYY MM DD ZZ']);
    assert.equal(m.format(), '2013-01-01T00:00:00-13:00', 'accept input and array of formats');
});

test('parse zone with a timezone from the format string', function (assert) {
    var m = moment('11-12-2013 -0400 +1100', 'DD-MM-YYYY ZZ #####').parseZone();

    assert.equal(m.zone(), 4 * 60);
});

test('parse zone without a timezone included in the format string', function (assert) {
    var m = moment('11-12-2013 -0400 +1100', 'DD-MM-YYYY').parseZone();

    assert.equal(m.zone(), -11 * 60);
});

test('timezone format', function (assert) {
    assert.equal(moment().zone(-60).format('ZZ'), '+0100', '-60 -> +0100');
    assert.equal(moment().zone(-90).format('ZZ'), '+0130', '-90 -> +0130');
    assert.equal(moment().zone(-120).format('ZZ'), '+0200', '-120 -> +0200');

    assert.equal(moment().zone(+60).format('ZZ'), '-0100', '+60 -> -0100');
    assert.equal(moment().zone(+90).format('ZZ'), '-0130', '+90 -> -0130');
    assert.equal(moment().zone(+120).format('ZZ'), '-0200', '+120 -> -0200');
});
