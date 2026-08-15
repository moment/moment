import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('utc offset', () => {
    test('setter / getter blackbox', () => {
        var m = moment([2010]);

        expect(m.clone().utcOffset(0).utcOffset(), 'utcOffset 0').toBe(0);

        expect(m.clone().utcOffset(1).utcOffset(), 'utcOffset 1 is 60').toBe(
            60
        );
        expect(m.clone().utcOffset(60).utcOffset(), 'utcOffset 60').toBe(60);
        expect(
            m.clone().utcOffset('+01:00').utcOffset(),
            'utcOffset +01:00 is 60'
        ).toBe(60);
        expect(
            m.clone().utcOffset('+0100').utcOffset(),
            'utcOffset +0100 is 60'
        ).toBe(60);

        expect(m.clone().utcOffset(-1).utcOffset(), 'utcOffset -1 is -60').toBe(
            -60
        );
        expect(m.clone().utcOffset(-60).utcOffset(), 'utcOffset -60').toBe(-60);
        expect(
            m.clone().utcOffset('-01:00').utcOffset(),
            'utcOffset -01:00 is -60'
        ).toBe(-60);
        expect(
            m.clone().utcOffset('-0100').utcOffset(),
            'utcOffset -0100 is -60'
        ).toBe(-60);

        expect(
            m.clone().utcOffset(1.5).utcOffset(),
            'utcOffset 1.5 is 90'
        ).toBe(90);
        expect(m.clone().utcOffset(90).utcOffset(), 'utcOffset 1.5 is 90').toBe(
            90
        );
        expect(
            m.clone().utcOffset('+01:30').utcOffset(),
            'utcOffset +01:30 is 90'
        ).toBe(90);
        expect(
            m.clone().utcOffset('+0130').utcOffset(),
            'utcOffset +0130 is 90'
        ).toBe(90);

        expect(m.clone().utcOffset(-1.5).utcOffset(), 'utcOffset -1.5').toBe(
            -90
        );
        expect(m.clone().utcOffset(-90).utcOffset(), 'utcOffset -90').toBe(-90);
        expect(
            m.clone().utcOffset('-01:30').utcOffset(),
            'utcOffset +01:30 is 90'
        ).toBe(-90);
        expect(
            m.clone().utcOffset('-0130').utcOffset(),
            'utcOffset +0130 is 90'
        ).toBe(-90);
        expect(
            m.clone().utcOffset('+00:10').utcOffset(),
            'utcOffset +00:10 is 10'
        ).toBe(10);
        expect(
            m.clone().utcOffset('-00:10').utcOffset(),
            'utcOffset +00:10 is 10'
        ).toBe(-10);
        expect(
            m.clone().utcOffset('+0010').utcOffset(),
            'utcOffset +0010 is 10'
        ).toBe(10);
        expect(
            m.clone().utcOffset('-0010').utcOffset(),
            'utcOffset +0010 is 10'
        ).toBe(-10);
    });

    test('utcOffset shorthand hours -> minutes', () => {
        var i;
        for (i = -15; i <= 15; ++i) {
            expect(
                moment().utcOffset(i).utcOffset(),
                '' + i + ' -> ' + i * 60
            ).toBe(i * 60);
        }
        expect(moment().utcOffset(-16).utcOffset(), '-16 -> -16').toBe(-16);
        expect(moment().utcOffset(16).utcOffset(), '16 -> 16').toBe(16);
    });

    test('isLocal, isUtc, isUtcOffset', () => {
        expect(
            moment().isLocal(),
            'moment() creates objects in local time'
        ).toBeTruthy();
        expect(
            !moment.utc().isLocal(),
            'moment.utc creates objects NOT in local time'
        ).toBeTruthy();
        expect(
            moment.utc().local().isLocal(),
            'moment.fn.local() converts to local time'
        ).toBeTruthy();
        expect(
            !moment().utcOffset(5).isLocal(),
            'moment.fn.utcOffset(N) puts objects NOT in local time'
        ).toBeTruthy();
        expect(
            moment().utcOffset(5).local().isLocal(),
            'moment.fn.local() converts to local time'
        ).toBeTruthy();

        expect(
            moment.utc().isUtc(),
            'moment.utc() creates objects in utc time'
        ).toBeTruthy();
        expect(
            moment().utcOffset(0).isUtc(),
            'utcOffset(0) is equivalent to utc mode'
        ).toBeTruthy();
        expect(
            !moment().utcOffset(1).isUtc(),
            'utcOffset(1) is NOT equivalent to utc mode'
        ).toBeTruthy();

        expect(
            !moment().isUtcOffset(),
            'moment() creates objects NOT in utc-offset mode'
        ).toBeTruthy();
        expect(
            moment.utc().isUtcOffset(),
            'moment.utc() creates objects in utc-offset mode'
        ).toBeTruthy();
        expect(
            moment().utcOffset(3).isUtcOffset(),
            'utcOffset(N != 0) creates objects in utc-offset mode'
        ).toBeTruthy();
        expect(
            moment().utcOffset(0).isUtcOffset(),
            'utcOffset(0) creates objects in utc-offset mode'
        ).toBeTruthy();
    });

    test('isUTC', () => {
        expect(
            moment.utc().isUTC(),
            'moment.utc() creates objects in utc time'
        ).toBeTruthy();
        expect(
            moment().utcOffset(0).isUTC(),
            'utcOffset(0) is equivalent to utc mode'
        ).toBeTruthy();
        expect(
            !moment().utcOffset(1).isUTC(),
            'utcOffset(1) is NOT equivalent to utc mode'
        ).toBeTruthy();
    });

    test('change hours when changing the utc offset', () => {
        var m = moment.utc([2000, 0, 1, 6]);
        expect(m.hour(), 'UTC 6AM should be 6AM at +0000').toBe(6);

        // sanity check
        m.utcOffset(0);
        expect(m.hour(), 'UTC 6AM should be 6AM at +0000').toBe(6);

        m.utcOffset(-60);
        expect(m.hour(), 'UTC 6AM should be 5AM at -0100').toBe(5);

        m.utcOffset(60);
        expect(m.hour(), 'UTC 6AM should be 7AM at +0100').toBe(7);
    });

    test('change minutes when changing the utc offset', () => {
        var m = moment.utc([2000, 0, 1, 6, 31]);

        m.utcOffset(0);
        expect(m.format('HH:mm'), 'UTC 6:31AM should be 6:31AM at +0000').toBe(
            '06:31'
        );

        m.utcOffset(-30);
        expect(m.format('HH:mm'), 'UTC 6:31AM should be 6:01AM at -0030').toBe(
            '06:01'
        );

        m.utcOffset(30);
        expect(m.format('HH:mm'), 'UTC 6:31AM should be 7:01AM at +0030').toBe(
            '07:01'
        );

        m.utcOffset(-1380);
        expect(m.format('HH:mm'), 'UTC 6:31AM should be 7:31AM at +1380').toBe(
            '07:31'
        );
    });

    test('distance from the unix epoch', () => {
        var zoneA = moment(),
            zoneB = moment(zoneA),
            zoneC = moment(zoneA),
            zoneD = moment(zoneA),
            zoneE = moment(zoneA);

        zoneB.utc();
        expect(+zoneA, 'moment should equal moment.utc').toBe(+zoneB);

        zoneC.utcOffset(60);
        expect(+zoneA, 'moment should equal moment.utcOffset(60)').toBe(+zoneC);

        zoneD.utcOffset(-480);
        expect(+zoneA, 'moment should equal moment.utcOffset(-480)').toBe(
            +zoneD
        );

        zoneE.utcOffset(-1000);
        expect(+zoneA, 'moment should equal moment.utcOffset(-1000)').toBe(
            +zoneE
        );
    });

    test('update offset after changing any values', () => {
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

    //////////////////
    test('getters and setters', () => {
        var a = moment([2011, 5, 20]);

        expect(
            a.clone().utcOffset(-120).year(2012).year(),
            'should get and set year correctly'
        ).toBe(2012);
        expect(
            a.clone().utcOffset(-120).month(1).month(),
            'should get and set month correctly'
        ).toBe(1);
        expect(
            a.clone().utcOffset(-120).date(2).date(),
            'should get and set date correctly'
        ).toBe(2);
        expect(
            a.clone().utcOffset(-120).day(1).day(),
            'should get and set day correctly'
        ).toBe(1);
        expect(
            a.clone().utcOffset(-120).hour(1).hour(),
            'should get and set hour correctly'
        ).toBe(1);
        expect(
            a.clone().utcOffset(-120).minute(1).minute(),
            'should get and set minute correctly'
        ).toBe(1);
    });

    test('getters', () => {
        var a = moment.utc([2012, 0, 1, 0, 0, 0]);

        expect(
            a.clone().utcOffset(-120).year(),
            'should get year correctly'
        ).toBe(2011);
        expect(
            a.clone().utcOffset(-120).month(),
            'should get month correctly'
        ).toBe(11);
        expect(
            a.clone().utcOffset(-120).date(),
            'should get date correctly'
        ).toBe(31);
        expect(
            a.clone().utcOffset(-120).hour(),
            'should get hour correctly'
        ).toBe(22);
        expect(
            a.clone().utcOffset(-120).minute(),
            'should get minute correctly'
        ).toBe(0);

        expect(
            a.clone().utcOffset(120).year(),
            'should get year correctly'
        ).toBe(2012);
        expect(
            a.clone().utcOffset(120).month(),
            'should get month correctly'
        ).toBe(0);
        expect(
            a.clone().utcOffset(120).date(),
            'should get date correctly'
        ).toBe(1);
        expect(
            a.clone().utcOffset(120).hour(),
            'should get hour correctly'
        ).toBe(2);
        expect(
            a.clone().utcOffset(120).minute(),
            'should get minute correctly'
        ).toBe(0);

        expect(
            a.clone().utcOffset(90).year(),
            'should get year correctly'
        ).toBe(2012);
        expect(
            a.clone().utcOffset(90).month(),
            'should get month correctly'
        ).toBe(0);
        expect(
            a.clone().utcOffset(90).date(),
            'should get date correctly'
        ).toBe(1);
        expect(
            a.clone().utcOffset(90).hour(),
            'should get hour correctly'
        ).toBe(1);
        expect(
            a.clone().utcOffset(90).minute(),
            'should get minute correctly'
        ).toBe(30);
    });

    test('from', () => {
        var zoneA = moment(),
            zoneB = moment(zoneA).utcOffset(-720),
            zoneC = moment(zoneA).utcOffset(-360),
            zoneD = moment(zoneA).utcOffset(690),
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
            zoneB = moment(zoneA).utcOffset(-720),
            zoneC = moment(zoneA).utcOffset(-360),
            zoneD = moment(zoneA).utcOffset(690),
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
            zoneB = moment(zoneA).utcOffset(-720),
            zoneC = moment(zoneA).utcOffset(-360),
            zoneD = moment(zoneA).utcOffset(690);

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
            moment().utcOffset(-120).clone().utcOffset(),
            'explicit cloning should retain the offset'
        ).toBe(-120);
        expect(
            moment().utcOffset(120).clone().utcOffset(),
            'explicit cloning should retain the offset'
        ).toBe(120);
        expect(
            moment(moment().utcOffset(-120)).utcOffset(),
            'implicit cloning should retain the offset'
        ).toBe(-120);
        expect(
            moment(moment().utcOffset(120)).utcOffset(),
            'implicit cloning should retain the offset'
        ).toBe(120);
    });

    test('start of / end of', () => {
        var a = moment.utc([2010, 1, 2, 0, 0, 0]).utcOffset(-450);

        expect(
            a.clone().startOf('day').hour(),
            'start of day should work on moments with utc offset'
        ).toBe(0);
        expect(
            a.clone().startOf('day').minute(),
            'start of day should work on moments with utc offset'
        ).toBe(0);
        expect(
            a.clone().startOf('hour').minute(),
            'start of hour should work on moments with utc offset'
        ).toBe(0);

        expect(
            a.clone().endOf('day').hour(),
            'end of day should work on moments with utc offset'
        ).toBe(23);
        expect(
            a.clone().endOf('day').minute(),
            'end of day should work on moments with utc offset'
        ).toBe(59);
        expect(
            a.clone().endOf('hour').minute(),
            'end of hour should work on moments with utc offset'
        ).toBe(59);
    });

    test('reset offset with moment#utc', () => {
        var a = moment.utc([2012]).utcOffset(-480);

        expect(
            a.clone().hour(),
            'different utc offset should have different hour'
        ).toBe(16);
        expect(
            a.clone().utc().hour(),
            'calling moment#utc should reset the offset'
        ).toBe(0);
    });

    test('reset offset with moment#local', () => {
        var a = moment([2012]).utcOffset(-480);

        expect(
            a.clone().local().hour(),
            'calling moment#local should reset the offset'
        ).toBe(0);
    });

    test('toDate', () => {
        var zoneA = new Date(),
            zoneB = moment(zoneA).utcOffset(-720).toDate(),
            zoneC = moment(zoneA).utcOffset(-360).toDate(),
            zoneD = moment(zoneA).utcOffset(690).toDate();

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
            zoneB = moment(zoneA).utcOffset(-120),
            zoneC = moment(zoneA).utcOffset(120);

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
                mom.utcOffset(60, keepTime);
            } else {
                mom.utcOffset(0, keepTime);
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
                mom.utcOffset(60, keepTime);
            } else {
                mom.utcOffset(0, keepTime);
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
                mom.utcOffset(0);
            } else {
                mom.utcOffset(60);
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
        expect(moment().utcOffset(-120).hasAlignedHourOffset()).toBe(true);
        expect(moment().utcOffset(180).hasAlignedHourOffset()).toBe(true);
        expect(moment().utcOffset(-90).hasAlignedHourOffset()).toBe(false);
        expect(moment().utcOffset(90).hasAlignedHourOffset()).toBe(false);
    });

    test('hours alignment with other zone', () => {
        var m = moment().utcOffset(-120);

        expect(m.hasAlignedHourOffset(moment().utcOffset(-180))).toBe(true);
        expect(m.hasAlignedHourOffset(moment().utcOffset(180))).toBe(true);
        expect(m.hasAlignedHourOffset(moment().utcOffset(-90))).toBe(false);
        expect(m.hasAlignedHourOffset(moment().utcOffset(90))).toBe(false);

        m = moment().utcOffset(-90);

        expect(m.hasAlignedHourOffset(moment().utcOffset(-180))).toBe(false);
        expect(m.hasAlignedHourOffset(moment().utcOffset(180))).toBe(false);
        expect(m.hasAlignedHourOffset(moment().utcOffset(-30))).toBe(true);
        expect(m.hasAlignedHourOffset(moment().utcOffset(30))).toBe(true);

        m = moment().utcOffset(60);

        expect(m.hasAlignedHourOffset(moment().utcOffset(-180))).toBe(true);
        expect(m.hasAlignedHourOffset(moment().utcOffset(180))).toBe(true);
        expect(m.hasAlignedHourOffset(moment().utcOffset(-90))).toBe(false);
        expect(m.hasAlignedHourOffset(moment().utcOffset(90))).toBe(false);

        m = moment().utcOffset(-25);

        expect(m.hasAlignedHourOffset(moment().utcOffset(35))).toBe(true);
        expect(m.hasAlignedHourOffset(moment().utcOffset(-85))).toBe(true);

        expect(m.hasAlignedHourOffset(moment().utcOffset(-35))).toBe(false);
        expect(m.hasAlignedHourOffset(moment().utcOffset(85))).toBe(false);
    });

    test('parse zone', () => {
        var m = moment('2013-01-01T00:00:00-13:00').parseZone();
        expect(m.utcOffset()).toBe(-13 * 60);
        expect(m.hours()).toBe(0);
    });

    test('parse UTC zone', () => {
        var m = moment('2013-01-01T05:00:00+00:00').parseZone();
        expect(m.utcOffset()).toBe(0);
        expect(m.hours()).toBe(5);
    });

    test('parse zone static', () => {
        var m = moment.parseZone('2013-01-01T00:00:00-13:00');
        expect(m.utcOffset()).toBe(-13 * 60);
        expect(m.hours()).toBe(0);
    });

    test('parse zone with more arguments', () => {
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

        expect(m.utcOffset()).toBe(-4 * 60);
    });

    test('parse zone without a timezone included in the format string', () => {
        var m = moment('11-12-2013 -0400 +1100', 'DD-MM-YYYY').parseZone();

        expect(m.utcOffset()).toBe(11 * 60);
    });

    test('timezone format', () => {
        expect(moment().utcOffset(60).format('ZZ'), '-60 -> +0100').toBe(
            '+0100'
        );
        expect(moment().utcOffset(90).format('ZZ'), '-90 -> +0130').toBe(
            '+0130'
        );
        expect(moment().utcOffset(120).format('ZZ'), '-120 -> +0200').toBe(
            '+0200'
        );

        expect(moment().utcOffset(-60).format('ZZ'), '+60 -> -0100').toBe(
            '-0100'
        );
        expect(moment().utcOffset(-90).format('ZZ'), '+90 -> -0130').toBe(
            '-0130'
        );
        expect(moment().utcOffset(-120).format('ZZ'), '+120 -> -0200').toBe(
            '-0200'
        );
    });
});
