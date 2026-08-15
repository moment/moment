import { beforeEach, describe, expect, test } from 'vitest';
import { expectDeprecations } from '../helpers/deprecation-handler';
import moment from '../../src/moment';

describe('zones', () => {
    beforeEach(() => {
        expectDeprecations('moment().zone');
    });

    test('set zone', () => {
        var zone = moment();

        zone.zone(0);
        expect(zone.zone(), 'should be able to set the zone to 0').toBeCloseTo(
            0
        );

        zone.zone(60);
        expect(zone.zone(), 'should be able to set the zone to 60').toBe(60);

        zone.zone(-60);
        expect(zone.zone(), 'should be able to set the zone to -60').toBe(-60);
    });

    test('set zone shorthand', () => {
        var zone = moment();

        zone.zone(1);
        expect(
            zone.zone(),
            'setting the zone to 1 should imply hours and convert to 60'
        ).toBe(60);

        zone.zone(-1);
        expect(
            zone.zone(),
            'setting the zone to -1 should imply hours and convert to -60'
        ).toBe(-60);

        zone.zone(15);
        expect(
            zone.zone(),
            'setting the zone to 15 should imply hours and convert to 900'
        ).toBe(900);

        zone.zone(-15);
        expect(
            zone.zone(),
            'setting the zone to -15 should imply hours and convert to -900'
        ).toBe(-900);

        zone.zone(16);
        expect(zone.zone(), 'setting the zone to 16 should imply minutes').toBe(
            16
        );

        zone.zone(-16);
        expect(
            zone.zone(),
            'setting the zone to -16 should imply minutes'
        ).toBe(-16);
    });

    test('set zone with string', () => {
        var zone = moment();

        zone.zone('+00:00');
        expect(zone.zone(), 'set the zone with a timezone string').toBeCloseTo(
            0
        );

        zone.zone('2013-03-07T07:00:00-08:00');
        expect(
            zone.zone(),
            'set the zone with a string that does not begin with the timezone'
        ).toBe(480);

        zone.zone('2013-03-07T07:00:00+0100');
        expect(
            zone.zone(),
            'set the zone with a string that uses the +0000 syntax'
        ).toBe(-60);

        zone.zone('2013-03-07T07:00:00+02');
        expect(
            zone.zone(),
            'set the zone with a string that uses the +00 syntax'
        ).toBe(-120);

        zone.zone('03-07-2013T07:00:00-08:00');
        expect(
            zone.zone(),
            'set the zone with a string with a non-ISO 8601 date'
        ).toBe(480);
    });

    test('change hours when changing the zone', () => {
        var zone = moment.utc([2000, 0, 1, 6]);

        zone.zone(0);
        expect(zone.hour(), 'UTC 6AM should be 6AM at +0000').toBe(6);

        zone.zone(60);
        expect(zone.hour(), 'UTC 6AM should be 5AM at -0100').toBe(5);

        zone.zone(-60);
        expect(zone.hour(), 'UTC 6AM should be 7AM at +0100').toBe(7);
    });

    test('change minutes when changing the zone', () => {
        var zone = moment.utc([2000, 0, 1, 6, 31]);

        zone.zone(0);
        expect(
            zone.format('HH:mm'),
            'UTC 6:31AM should be 6:31AM at +0000'
        ).toBe('06:31');

        zone.zone(30);
        expect(
            zone.format('HH:mm'),
            'UTC 6:31AM should be 6:01AM at -0030'
        ).toBe('06:01');

        zone.zone(-30);
        expect(
            zone.format('HH:mm'),
            'UTC 6:31AM should be 7:01AM at +0030'
        ).toBe('07:01');

        zone.zone(1380);
        expect(
            zone.format('HH:mm'),
            'UTC 6:31AM should be 7:31AM at +1380'
        ).toBe('07:31');
    });

    test('distance from the unix epoch', () => {
        var zoneA = moment(),
            zoneB = moment(zoneA),
            zoneC = moment(zoneA),
            zoneD = moment(zoneA),
            zoneE = moment(zoneA);

        zoneB.utc();
        expect(+zoneA, 'moment should equal moment.utc').toBe(+zoneB);

        zoneC.zone(-60);
        expect(+zoneA, 'moment should equal moment.zone(-60)').toBe(+zoneC);

        zoneD.zone(480);
        expect(+zoneA, 'moment should equal moment.zone(480)').toBe(+zoneD);

        zoneE.zone(1000);
        expect(+zoneA, 'moment should equal moment.zone(1000)').toBe(+zoneE);
    });

    test('update offset after changing any values', () => {
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

        expect(m.format('ZZ'), 'should be at +0000').toBe('+0000');
        expect(m.format('HH:mm'), 'should start 12AM at +0000 timezone').toBe(
            '00:00'
        );

        m.__doChange = true;
        m.add(1, 'h');

        expect(m.format('ZZ'), 'should be at -0200').toBe('-0200');
        expect(
            m.format('HH:mm'),
            '1AM at +0000 should be 11PM at -0200 timezone'
        ).toBe('23:00');

        m.subtract(1, 'h');

        expect(m.format('ZZ'), 'should be at -0100').toBe('-0100');
        expect(
            m.format('HH:mm'),
            '12AM at +0000 should be 11PM at -0100 timezone'
        ).toBe('23:00');

        moment.updateOffset = oldOffset;
    });

    test('getters and setters', () => {
        var a = moment([2011, 5, 20]);

        expect(
            a.clone().zone(120).year(2012).year(),
            'should get and set year correctly'
        ).toBe(2012);
        expect(
            a.clone().zone(120).month(1).month(),
            'should get and set month correctly'
        ).toBe(1);
        expect(
            a.clone().zone(120).date(2).date(),
            'should get and set date correctly'
        ).toBe(2);
        expect(
            a.clone().zone(120).day(1).day(),
            'should get and set day correctly'
        ).toBe(1);
        expect(
            a.clone().zone(120).hour(1).hour(),
            'should get and set hour correctly'
        ).toBe(1);
        expect(
            a.clone().zone(120).minute(1).minute(),
            'should get and set minute correctly'
        ).toBe(1);
    });

    test('getters', () => {
        var a = moment.utc([2012, 0, 1, 0, 0, 0]);

        expect(a.clone().zone(120).year(), 'should get year correctly').toBe(
            2011
        );
        expect(a.clone().zone(120).month(), 'should get month correctly').toBe(
            11
        );
        expect(a.clone().zone(120).date(), 'should get date correctly').toBe(
            31
        );
        expect(a.clone().zone(120).hour(), 'should get hour correctly').toBe(
            22
        );
        expect(
            a.clone().zone(120).minute(),
            'should get minute correctly'
        ).toBe(0);

        expect(a.clone().zone(-120).year(), 'should get year correctly').toBe(
            2012
        );
        expect(a.clone().zone(-120).month(), 'should get month correctly').toBe(
            0
        );
        expect(a.clone().zone(-120).date(), 'should get date correctly').toBe(
            1
        );
        expect(a.clone().zone(-120).hour(), 'should get hour correctly').toBe(
            2
        );
        expect(
            a.clone().zone(-120).minute(),
            'should get minute correctly'
        ).toBe(0);

        expect(a.clone().zone(-90).year(), 'should get year correctly').toBe(
            2012
        );
        expect(a.clone().zone(-90).month(), 'should get month correctly').toBe(
            0
        );
        expect(a.clone().zone(-90).date(), 'should get date correctly').toBe(1);
        expect(a.clone().zone(-90).hour(), 'should get hour correctly').toBe(1);
        expect(
            a.clone().zone(-90).minute(),
            'should get minute correctly'
        ).toBe(30);
    });

    test('from', () => {
        var zoneA = moment(),
            zoneB = moment(zoneA).zone(720),
            zoneC = moment(zoneA).zone(360),
            zoneD = moment(zoneA).zone(-690),
            other = moment(zoneA).add(35, 'm');

        expect(
            zoneA.from(other),
            'moment#from should be the same in all zones'
        ).toBe(zoneB.from(other));
        expect(
            zoneA.from(other),
            'moment#from should be the same in all zones'
        ).toBe(zoneC.from(other));
        expect(
            zoneA.from(other),
            'moment#from should be the same in all zones'
        ).toBe(zoneD.from(other));
    });

    test('diff', () => {
        var zoneA = moment(),
            zoneB = moment(zoneA).zone(720),
            zoneC = moment(zoneA).zone(360),
            zoneD = moment(zoneA).zone(-690),
            other = moment(zoneA).add(35, 'm');

        expect(
            zoneA.diff(other),
            'moment#diff should be the same in all zones'
        ).toBe(zoneB.diff(other));
        expect(
            zoneA.diff(other),
            'moment#diff should be the same in all zones'
        ).toBe(zoneC.diff(other));
        expect(
            zoneA.diff(other),
            'moment#diff should be the same in all zones'
        ).toBe(zoneD.diff(other));

        expect(
            zoneA.diff(other, 'minute', true),
            'moment#diff should be the same in all zones'
        ).toBe(zoneB.diff(other, 'minute', true));
        expect(
            zoneA.diff(other, 'minute', true),
            'moment#diff should be the same in all zones'
        ).toBe(zoneC.diff(other, 'minute', true));
        expect(
            zoneA.diff(other, 'minute', true),
            'moment#diff should be the same in all zones'
        ).toBe(zoneD.diff(other, 'minute', true));

        expect(
            zoneA.diff(other, 'hour', true),
            'moment#diff should be the same in all zones'
        ).toBe(zoneB.diff(other, 'hour', true));
        expect(
            zoneA.diff(other, 'hour', true),
            'moment#diff should be the same in all zones'
        ).toBe(zoneC.diff(other, 'hour', true));
        expect(
            zoneA.diff(other, 'hour', true),
            'moment#diff should be the same in all zones'
        ).toBe(zoneD.diff(other, 'hour', true));
    });

    test('unix offset and timestamp', () => {
        var zoneA = moment(),
            zoneB = moment(zoneA).zone(720),
            zoneC = moment(zoneA).zone(360),
            zoneD = moment(zoneA).zone(-690);

        expect(
            zoneA.unix(),
            'moment#unix should be the same in all zones'
        ).toBe(zoneB.unix());
        expect(
            zoneA.unix(),
            'moment#unix should be the same in all zones'
        ).toBe(zoneC.unix());
        expect(
            zoneA.unix(),
            'moment#unix should be the same in all zones'
        ).toBe(zoneD.unix());

        expect(+zoneA, 'moment#valueOf should be the same in all zones').toBe(
            +zoneB
        );
        expect(+zoneA, 'moment#valueOf should be the same in all zones').toBe(
            +zoneC
        );
        expect(+zoneA, 'moment#valueOf should be the same in all zones').toBe(
            +zoneD
        );
    });

    test('cloning', () => {
        expect(
            moment().zone(120).clone().zone(),
            'explicit cloning should retain the zone'
        ).toBe(120);
        expect(
            moment().zone(-120).clone().zone(),
            'explicit cloning should retain the zone'
        ).toBe(-120);
        expect(
            moment(moment().zone(120)).zone(),
            'implicit cloning should retain the zone'
        ).toBe(120);
        expect(
            moment(moment().zone(-120)).zone(),
            'implicit cloning should retain the zone'
        ).toBe(-120);
    });

    test('start of / end of', () => {
        var a = moment.utc([2010, 1, 2, 0, 0, 0]).zone(450);

        expect(
            a.clone().startOf('day').hour(),
            'start of day should work on moments with a zone'
        ).toBe(0);
        expect(
            a.clone().startOf('day').minute(),
            'start of day should work on moments with a zone'
        ).toBe(0);
        expect(
            a.clone().startOf('hour').minute(),
            'start of hour should work on moments with a zone'
        ).toBe(0);

        expect(
            a.clone().endOf('day').hour(),
            'end of day should work on moments with a zone'
        ).toBe(23);
        expect(
            a.clone().endOf('day').minute(),
            'end of day should work on moments with a zone'
        ).toBe(59);
        expect(
            a.clone().endOf('hour').minute(),
            'end of hour should work on moments with a zone'
        ).toBe(59);
    });

    test('reset zone with moment#utc', () => {
        var a = moment.utc([2012]).zone(480);

        expect(
            a.clone().hour(),
            'different zone should have different hour'
        ).toBe(16);
        expect(
            a.clone().utc().hour(),
            'calling moment#utc should reset the offset'
        ).toBe(0);
    });

    test('reset zone with moment#local', () => {
        var a = moment([2012]).zone(480);

        expect(
            a.clone().local().hour(),
            'calling moment#local should reset the offset'
        ).toBe(0);
    });

    test('toDate', () => {
        var zoneA = new Date(),
            zoneB = moment(zoneA).zone(720).toDate(),
            zoneC = moment(zoneA).zone(360).toDate(),
            zoneD = moment(zoneA).zone(-690).toDate();

        expect(
            +zoneA,
            'moment#toDate should output a date with the right unix timestamp'
        ).toBe(+zoneB);
        expect(
            +zoneA,
            'moment#toDate should output a date with the right unix timestamp'
        ).toBe(+zoneC);
        expect(
            +zoneA,
            'moment#toDate should output a date with the right unix timestamp'
        ).toBe(+zoneD);
    });

    test('same / before / after', () => {
        var zoneA = moment().utc(),
            zoneB = moment(zoneA).zone(120),
            zoneC = moment(zoneA).zone(-120);

        expect(
            zoneA.isSame(zoneB),
            'two moments with different offsets should be the same'
        ).toBeTruthy();
        expect(
            zoneA.isSame(zoneC),
            'two moments with different offsets should be the same'
        ).toBeTruthy();

        expect(
            zoneA.isSame(zoneB, 'hour'),
            'two moments with different offsets should be the same hour'
        ).toBeTruthy();
        expect(
            zoneA.isSame(zoneC, 'hour'),
            'two moments with different offsets should be the same hour'
        ).toBeTruthy();

        zoneA.add(1, 'hour');

        expect(
            zoneA.isAfter(zoneB),
            'isAfter should work with two moments with different offsets'
        ).toBeTruthy();
        expect(
            zoneA.isAfter(zoneC),
            'isAfter should work with two moments with different offsets'
        ).toBeTruthy();

        expect(
            zoneA.isAfter(zoneB, 'hour'),
            'isAfter:hour should work with two moments with different offsets'
        ).toBeTruthy();
        expect(
            zoneA.isAfter(zoneC, 'hour'),
            'isAfter:hour should work with two moments with different offsets'
        ).toBeTruthy();

        zoneA.subtract(2, 'hour');

        expect(
            zoneA.isBefore(zoneB),
            'isBefore should work with two moments with different offsets'
        ).toBeTruthy();
        expect(
            zoneA.isBefore(zoneC),
            'isBefore should work with two moments with different offsets'
        ).toBeTruthy();

        expect(
            zoneA.isBefore(zoneB, 'hour'),
            'isBefore:hour should work with two moments with different offsets'
        ).toBeTruthy();
        expect(
            zoneA.isBefore(zoneC, 'hour'),
            'isBefore:hour should work with two moments with different offsets'
        ).toBeTruthy();
    });

    test('add / subtract over dst', () => {
        var oldOffset = moment.updateOffset,
            m = moment.utc([2000, 2, 31, 3]);

        moment.updateOffset = function (mom, keepTime) {
            if (mom.clone().utc().month() > 2) {
                mom.zone(-60, keepTime);
            } else {
                mom.zone(0, keepTime);
            }
        };

        expect(m.hour(), 'should start at 00:00').toBe(3);

        m.add(24, 'hour');

        expect(m.hour(), 'adding 24 hours should disregard dst').toBe(4);

        m.subtract(24, 'hour');

        expect(m.hour(), 'subtracting 24 hours should disregard dst').toBe(3);

        m.add(1, 'day');

        expect(m.hour(), 'adding 1 day should have the same hour').toBe(3);

        m.subtract(1, 'day');

        expect(m.hour(), 'subtracting 1 day should have the same hour').toBe(3);

        m.add(1, 'month');

        expect(m.hour(), 'adding 1 month should have the same hour').toBe(3);

        m.subtract(1, 'month');

        expect(m.hour(), 'subtracting 1 month should have the same hour').toBe(
            3
        );

        moment.updateOffset = oldOffset;
    });

    test('isDST', () => {
        var oldOffset = moment.updateOffset;

        moment.updateOffset = function (mom, keepTime) {
            if (mom.month() > 2 && mom.month() < 9) {
                mom.zone(-60, keepTime);
            } else {
                mom.zone(0, keepTime);
            }
        };

        expect(
            !moment().month(0).isDST(),
            'Jan should not be summer dst'
        ).toBeTruthy();
        expect(
            moment().month(6).isDST(),
            'Jul should be summer dst'
        ).toBeTruthy();
        expect(
            !moment().month(11).isDST(),
            'Dec should not be summer dst'
        ).toBeTruthy();

        moment.updateOffset = function (mom) {
            if (mom.month() > 2 && mom.month() < 9) {
                mom.zone(0);
            } else {
                mom.zone(-60);
            }
        };

        expect(
            moment().month(0).isDST(),
            'Jan should be winter dst'
        ).toBeTruthy();
        expect(
            !moment().month(6).isDST(),
            'Jul should not be winter dst'
        ).toBeTruthy();
        expect(
            moment().month(11).isDST(),
            'Dec should be winter dst'
        ).toBeTruthy();

        moment.updateOffset = oldOffset;
    });

    test('zone names', () => {
        expectDeprecations();
        expect(moment().zoneAbbr(), 'Local zone abbr should be empty').toBe('');
        expect(
            moment().format('z'),
            'Local zone formatted abbr should be empty'
        ).toBe('');
        expect(moment().zoneName(), 'Local zone name should be empty').toBe('');
        expect(
            moment().format('zz'),
            'Local zone formatted name should be empty'
        ).toBe('');

        expect(moment.utc().zoneAbbr(), 'UTC zone abbr should be UTC').toBe(
            'UTC'
        );
        expect(
            moment.utc().format('z'),
            'UTC zone formatted abbr should be UTC'
        ).toBe('UTC');
        expect(
            moment.utc().zoneName(),
            'UTC zone abbr should be Coordinated Universal Time'
        ).toBe('Coordinated Universal Time');
        expect(
            moment.utc().format('zz'),
            'UTC zone formatted abbr should be Coordinated Universal Time'
        ).toBe('Coordinated Universal Time');
    });

    test('hours alignment with UTC', () => {
        expect(moment().zone(120).hasAlignedHourOffset()).toBe(true);
        expect(moment().zone(-180).hasAlignedHourOffset()).toBe(true);
        expect(moment().zone(90).hasAlignedHourOffset()).toBe(false);
        expect(moment().zone(-90).hasAlignedHourOffset()).toBe(false);
    });

    test('hours alignment with other zone', () => {
        var m = moment().zone(120);

        expect(m.hasAlignedHourOffset(moment().zone(180))).toBe(true);
        expect(m.hasAlignedHourOffset(moment().zone(-180))).toBe(true);
        expect(m.hasAlignedHourOffset(moment().zone(90))).toBe(false);
        expect(m.hasAlignedHourOffset(moment().zone(-90))).toBe(false);

        m = moment().zone(90);

        expect(m.hasAlignedHourOffset(moment().zone(180))).toBe(false);
        expect(m.hasAlignedHourOffset(moment().zone(-180))).toBe(false);
        expect(m.hasAlignedHourOffset(moment().zone(30))).toBe(true);
        expect(m.hasAlignedHourOffset(moment().zone(-30))).toBe(true);

        m = moment().zone(-60);

        expect(m.hasAlignedHourOffset(moment().zone(180))).toBe(true);
        expect(m.hasAlignedHourOffset(moment().zone(-180))).toBe(true);
        expect(m.hasAlignedHourOffset(moment().zone(90))).toBe(false);
        expect(m.hasAlignedHourOffset(moment().zone(-90))).toBe(false);

        m = moment().zone(25);

        expect(m.hasAlignedHourOffset(moment().zone(-35))).toBe(true);
        expect(m.hasAlignedHourOffset(moment().zone(85))).toBe(true);

        expect(m.hasAlignedHourOffset(moment().zone(35))).toBe(false);
        expect(m.hasAlignedHourOffset(moment().zone(-85))).toBe(false);
    });

    test('parse zone', () => {
        var m = moment('2013-01-01T00:00:00-13:00').parseZone();
        expect(m.zone()).toBe(13 * 60);
        expect(m.hours()).toBe(0);
    });

    test('parse zone static', () => {
        var m = moment.parseZone('2013-01-01T00:00:00-13:00');
        expect(m.zone()).toBe(13 * 60);
        expect(m.hours()).toBe(0);
    });

    test('parse zone with more arguments', () => {
        expectDeprecations();
        var m;
        m = moment.parseZone('2013 01 01 05 -13:00', 'YYYY MM DD HH ZZ');
        expect(m.format(), 'accept input and format').toBe(
            '2013-01-01T05:00:00-13:00'
        );
        m = moment.parseZone('2013-01-01-13:00', 'YYYY MM DD ZZ', true);
        expect(m.isValid(), 'accept input, format and strict flag').toBe(false);
        m = moment.parseZone('2013-01-01-13:00', [
            'DD MM YYYY ZZ',
            'YYYY MM DD ZZ',
        ]);
        expect(m.format(), 'accept input and array of formats').toBe(
            '2013-01-01T00:00:00-13:00'
        );
    });

    test('parse zone with a timezone from the format string', () => {
        var m = moment(
            '11-12-2013 -0400 +1100',
            'DD-MM-YYYY ZZ #####'
        ).parseZone();

        expect(m.zone()).toBe(4 * 60);
    });

    test('parse zone without a timezone included in the format string', () => {
        var m = moment('11-12-2013 -0400 +1100', 'DD-MM-YYYY').parseZone();

        expect(m.zone()).toBe(-11 * 60);
    });

    test('timezone format', () => {
        expect(moment().zone(-60).format('ZZ'), '-60 -> +0100').toBe('+0100');
        expect(moment().zone(-90).format('ZZ'), '-90 -> +0130').toBe('+0130');
        expect(moment().zone(-120).format('ZZ'), '-120 -> +0200').toBe('+0200');

        expect(moment().zone(+60).format('ZZ'), '+60 -> -0100').toBe('-0100');
        expect(moment().zone(+90).format('ZZ'), '+90 -> -0130').toBe('-0130');
        expect(moment().zone(+120).format('ZZ'), '+120 -> -0200').toBe('-0200');
    });

    test('parse zone without a timezone', () => {
        expectDeprecations();
        var m1 = moment.parseZone('2016-02-01T00:00:00'),
            m2 = moment.parseZone('2016-02-01T00:00:00Z'),
            m3 = moment.parseZone('2016-02-01T00:00:00+00:00'), //Someone might argue this is not necessary, you could even argue that is wrong being here.
            m4 = moment.parseZone('2016-02-01T00:00:00+0000'); //Someone might argue this is not necessary, you could even argue that is wrong being here.
        expect(
            m1.format('M D YYYY HH:mm:ss ZZ'),
            'Not providing a timezone should keep the time and change the zone to 0'
        ).toBe('2 1 2016 00:00:00 +0000');
        expect(
            m2.format('M D YYYY HH:mm:ss ZZ'),
            'Not providing a timezone should keep the time and change the zone to 0'
        ).toBe('2 1 2016 00:00:00 +0000');
        expect(
            m3.format('M D YYYY HH:mm:ss ZZ'),
            'Not providing a timezone should keep the time and change the zone to 0'
        ).toBe('2 1 2016 00:00:00 +0000');
        expect(
            m4.format('M D YYYY HH:mm:ss ZZ'),
            'Not providing a timezone should keep the time and change the zone to 0'
        ).toBe('2 1 2016 00:00:00 +0000');
    });

    test('parse zone with a minutes unit abs less than 16 should retain minutes', () => {
        //ensure when minutes are explicitly parsed, they are retained
        //instead of converted to hours, even if less than 16
        var n = moment.parseZone('2013-01-01T00:00:00-00:15'),
            o;
        expect(n.utcOffset()).toBe(-15);
        expect(n.zone()).toBe(15);
        expect(n.hour()).toBe(0);

        o = moment.parseZone('2013-01-01T00:00:00+00:15');
        expect(o.utcOffset()).toBe(15);
        expect(o.zone()).toBe(-15);
        expect(o.hour()).toBe(0);
    });

    test('parse zone with weekday on verifies day according to the offset', () => {
        expectDeprecations();
        expect(
            moment.parseZone('Mon 03:59 +12:00', 'ddd HH:mm Z', true).isValid(),
            'Monday 03:59'
        ).toBeTruthy();
    });
});
