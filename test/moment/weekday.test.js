import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('week day', () => {
    test('iso weekday', () => {
        var i;

        for (i = 0; i < 7; ++i) {
            moment.locale('dow:' + i + ',doy: 6', { week: { dow: i, doy: 6 } });
            expect(
                moment([1985, 1, 4]).isoWeekday(),
                'Feb  4 1985 is Monday    -- 1st day'
            ).toBe(1);
            expect(
                moment([2029, 8, 18]).isoWeekday(),
                'Sep 18 2029 is Tuesday   -- 2nd day'
            ).toBe(2);
            expect(
                moment([2013, 3, 24]).isoWeekday(),
                'Apr 24 2013 is Wednesday -- 3rd day'
            ).toBe(3);
            expect(
                moment([2015, 2, 5]).isoWeekday(),
                'Mar  5 2015 is Thursday  -- 4th day'
            ).toBe(4);
            expect(
                moment([1970, 0, 2]).isoWeekday(),
                'Jan  2 1970 is Friday    -- 5th day'
            ).toBe(5);
            expect(
                moment([2001, 4, 12]).isoWeekday(),
                'May 12 2001 is Saturday  -- 6th day'
            ).toBe(6);
            expect(
                moment([2000, 0, 2]).isoWeekday(),
                'Jan  2 2000 is Sunday    -- 7th day'
            ).toBe(7);
        }
    });

    test('iso weekday setter', () => {
        var a = moment([2011, 0, 10]);
        expect(moment(a).isoWeekday(1).date(), 'set from mon to mon').toBe(10);
        expect(moment(a).isoWeekday(4).date(), 'set from mon to thu').toBe(13);
        expect(moment(a).isoWeekday(7).date(), 'set from mon to sun').toBe(16);
        expect(
            moment(a).isoWeekday(-6).date(),
            'set from mon to last mon'
        ).toBe(3);
        expect(
            moment(a).isoWeekday(-3).date(),
            'set from mon to last thu'
        ).toBe(6);
        expect(moment(a).isoWeekday(0).date(), 'set from mon to last sun').toBe(
            9
        );
        expect(moment(a).isoWeekday(8).date(), 'set from mon to next mon').toBe(
            17
        );
        expect(
            moment(a).isoWeekday(11).date(),
            'set from mon to next thu'
        ).toBe(20);
        expect(
            moment(a).isoWeekday(14).date(),
            'set from mon to next sun'
        ).toBe(23);

        a = moment([2011, 0, 13]);
        expect(moment(a).isoWeekday(1).date(), 'set from thu to mon').toBe(10);
        expect(moment(a).isoWeekday(4).date(), 'set from thu to thu').toBe(13);
        expect(moment(a).isoWeekday(7).date(), 'set from thu to sun').toBe(16);
        expect(
            moment(a).isoWeekday(-6).date(),
            'set from thu to last mon'
        ).toBe(3);
        expect(
            moment(a).isoWeekday(-3).date(),
            'set from thu to last thu'
        ).toBe(6);
        expect(moment(a).isoWeekday(0).date(), 'set from thu to last sun').toBe(
            9
        );
        expect(moment(a).isoWeekday(8).date(), 'set from thu to next mon').toBe(
            17
        );
        expect(
            moment(a).isoWeekday(11).date(),
            'set from thu to next thu'
        ).toBe(20);
        expect(
            moment(a).isoWeekday(14).date(),
            'set from thu to next sun'
        ).toBe(23);

        a = moment([2011, 0, 16]);
        expect(moment(a).isoWeekday(1).date(), 'set from sun to mon').toBe(10);
        expect(moment(a).isoWeekday(4).date(), 'set from sun to thu').toBe(13);
        expect(moment(a).isoWeekday(7).date(), 'set from sun to sun').toBe(16);
        expect(
            moment(a).isoWeekday(-6).date(),
            'set from sun to last mon'
        ).toBe(3);
        expect(
            moment(a).isoWeekday(-3).date(),
            'set from sun to last thu'
        ).toBe(6);
        expect(moment(a).isoWeekday(0).date(), 'set from sun to last sun').toBe(
            9
        );
        expect(moment(a).isoWeekday(8).date(), 'set from sun to next mon').toBe(
            17
        );
        expect(
            moment(a).isoWeekday(11).date(),
            'set from sun to next thu'
        ).toBe(20);
        expect(
            moment(a).isoWeekday(14).date(),
            'set from sun to next sun'
        ).toBe(23);
    });

    test('iso weekday setter with day name', () => {
        moment.locale('en');

        var a = moment([2011, 0, 10]);
        expect(
            moment(a).isoWeekday('Monday').date(),
            'set from mon to mon'
        ).toBe(10);
        expect(
            moment(a).isoWeekday('Thursday').date(),
            'set from mon to thu'
        ).toBe(13);
        expect(
            moment(a).isoWeekday('Sunday').date(),
            'set from mon to sun'
        ).toBe(16);

        a = moment([2011, 0, 13]);
        expect(
            moment(a).isoWeekday('Monday').date(),
            'set from thu to mon'
        ).toBe(10);
        expect(
            moment(a).isoWeekday('Thursday').date(),
            'set from thu to thu'
        ).toBe(13);
        expect(
            moment(a).isoWeekday('Sunday').date(),
            'set from thu to sun'
        ).toBe(16);

        a = moment([2011, 0, 16]);
        expect(
            moment(a).isoWeekday('Monday').date(),
            'set from sun to mon'
        ).toBe(10);
        expect(
            moment(a).isoWeekday('Thursday').date(),
            'set from sun to thu'
        ).toBe(13);
        expect(
            moment(a).isoWeekday('Sunday').date(),
            'set from sun to sun'
        ).toBe(16);
    });

    test('weekday first day of week Sunday (dow 0)', () => {
        moment.locale('dow: 0,doy: 6', { week: { dow: 0, doy: 6 } });
        expect(
            moment([1985, 1, 3]).weekday(),
            'Feb  3 1985 is Sunday    -- 0th day'
        ).toBe(0);
        expect(
            moment([2029, 8, 17]).weekday(),
            'Sep 17 2029 is Monday    -- 1st day'
        ).toBe(1);
        expect(
            moment([2013, 3, 23]).weekday(),
            'Apr 23 2013 is Tuesday   -- 2nd day'
        ).toBe(2);
        expect(
            moment([2015, 2, 4]).weekday(),
            'Mar  4 2015 is Wednesday -- 3nd day'
        ).toBe(3);
        expect(
            moment([1970, 0, 1]).weekday(),
            'Jan  1 1970 is Thursday  -- 4th day'
        ).toBe(4);
        expect(
            moment([2001, 4, 11]).weekday(),
            'May 11 2001 is Friday    -- 5th day'
        ).toBe(5);
        expect(
            moment([2000, 0, 1]).weekday(),
            'Jan  1 2000 is Saturday  -- 6th day'
        ).toBe(6);
    });

    test('weekday first day of week Monday (dow 1)', () => {
        moment.locale('dow: 1,doy: 6', { week: { dow: 1, doy: 6 } });
        expect(
            moment([1985, 1, 4]).weekday(),
            'Feb  4 1985 is Monday    -- 0th day'
        ).toBe(0);
        expect(
            moment([2029, 8, 18]).weekday(),
            'Sep 18 2029 is Tuesday   -- 1st day'
        ).toBe(1);
        expect(
            moment([2013, 3, 24]).weekday(),
            'Apr 24 2013 is Wednesday -- 2nd day'
        ).toBe(2);
        expect(
            moment([2015, 2, 5]).weekday(),
            'Mar  5 2015 is Thursday  -- 3nd day'
        ).toBe(3);
        expect(
            moment([1970, 0, 2]).weekday(),
            'Jan  2 1970 is Friday    -- 4th day'
        ).toBe(4);
        expect(
            moment([2001, 4, 12]).weekday(),
            'May 12 2001 is Saturday  -- 5th day'
        ).toBe(5);
        expect(
            moment([2000, 0, 2]).weekday(),
            'Jan  2 2000 is Sunday    -- 6th day'
        ).toBe(6);
    });

    test('weekday first day of week Tuesday (dow 2)', () => {
        moment.locale('dow: 2,doy: 6', { week: { dow: 2, doy: 6 } });
        expect(
            moment([1985, 1, 5]).weekday(),
            'Feb  5 1985 is Tuesday   -- 0th day'
        ).toBe(0);
        expect(
            moment([2029, 8, 19]).weekday(),
            'Sep 19 2029 is Wednesday -- 1st day'
        ).toBe(1);
        expect(
            moment([2013, 3, 25]).weekday(),
            'Apr 25 2013 is Thursday  -- 2nd day'
        ).toBe(2);
        expect(
            moment([2015, 2, 6]).weekday(),
            'Mar  6 2015 is Friday    -- 3nd day'
        ).toBe(3);
        expect(
            moment([1970, 0, 3]).weekday(),
            'Jan  3 1970 is Saturday  -- 4th day'
        ).toBe(4);
        expect(
            moment([2001, 4, 13]).weekday(),
            'May 13 2001 is Sunday    -- 5th day'
        ).toBe(5);
        expect(
            moment([2000, 0, 3]).weekday(),
            'Jan  3 2000 is Monday    -- 6th day'
        ).toBe(6);
    });

    test('weekday first day of week Wednesday (dow 3)', () => {
        moment.locale('dow: 3,doy: 6', { week: { dow: 3, doy: 6 } });
        expect(
            moment([1985, 1, 6]).weekday(),
            'Feb  6 1985 is Wednesday -- 0th day'
        ).toBe(0);
        expect(
            moment([2029, 8, 20]).weekday(),
            'Sep 20 2029 is Thursday  -- 1st day'
        ).toBe(1);
        expect(
            moment([2013, 3, 26]).weekday(),
            'Apr 26 2013 is Friday    -- 2nd day'
        ).toBe(2);
        expect(
            moment([2015, 2, 7]).weekday(),
            'Mar  7 2015 is Saturday  -- 3nd day'
        ).toBe(3);
        expect(
            moment([1970, 0, 4]).weekday(),
            'Jan  4 1970 is Sunday    -- 4th day'
        ).toBe(4);
        expect(
            moment([2001, 4, 14]).weekday(),
            'May 14 2001 is Monday    -- 5th day'
        ).toBe(5);
        expect(
            moment([2000, 0, 4]).weekday(),
            'Jan  4 2000 is Tuesday   -- 6th day'
        ).toBe(6);
    });

    test('weekday first day of week Thursday (dow 4)', () => {
        moment.locale('dow: 4,doy: 6', { week: { dow: 4, doy: 6 } });
        expect(
            moment([1985, 1, 7]).weekday(),
            'Feb  7 1985 is Thursday  -- 0th day'
        ).toBe(0);
        expect(
            moment([2029, 8, 21]).weekday(),
            'Sep 21 2029 is Friday    -- 1st day'
        ).toBe(1);
        expect(
            moment([2013, 3, 27]).weekday(),
            'Apr 27 2013 is Saturday  -- 2nd day'
        ).toBe(2);
        expect(
            moment([2015, 2, 8]).weekday(),
            'Mar  8 2015 is Sunday    -- 3nd day'
        ).toBe(3);
        expect(
            moment([1970, 0, 5]).weekday(),
            'Jan  5 1970 is Monday    -- 4th day'
        ).toBe(4);
        expect(
            moment([2001, 4, 15]).weekday(),
            'May 15 2001 is Tuesday   -- 5th day'
        ).toBe(5);
        expect(
            moment([2000, 0, 5]).weekday(),
            'Jan  5 2000 is Wednesday -- 6th day'
        ).toBe(6);
    });

    test('weekday first day of week Friday (dow 5)', () => {
        moment.locale('dow: 5,doy: 6', { week: { dow: 5, doy: 6 } });
        expect(
            moment([1985, 1, 8]).weekday(),
            'Feb  8 1985 is Friday    -- 0th day'
        ).toBe(0);
        expect(
            moment([2029, 8, 22]).weekday(),
            'Sep 22 2029 is Saturday  -- 1st day'
        ).toBe(1);
        expect(
            moment([2013, 3, 28]).weekday(),
            'Apr 28 2013 is Sunday    -- 2nd day'
        ).toBe(2);
        expect(
            moment([2015, 2, 9]).weekday(),
            'Mar  9 2015 is Monday    -- 3nd day'
        ).toBe(3);
        expect(
            moment([1970, 0, 6]).weekday(),
            'Jan  6 1970 is Tuesday   -- 4th day'
        ).toBe(4);
        expect(
            moment([2001, 4, 16]).weekday(),
            'May 16 2001 is Wednesday -- 5th day'
        ).toBe(5);
        expect(
            moment([2000, 0, 6]).weekday(),
            'Jan  6 2000 is Thursday  -- 6th day'
        ).toBe(6);
    });

    test('weekday first day of week Saturday (dow 6)', () => {
        moment.locale('dow: 6,doy: 6', { week: { dow: 6, doy: 6 } });
        expect(
            moment([1985, 1, 9]).weekday(),
            'Feb  9 1985 is Saturday  -- 0th day'
        ).toBe(0);
        expect(
            moment([2029, 8, 23]).weekday(),
            'Sep 23 2029 is Sunday    -- 1st day'
        ).toBe(1);
        expect(
            moment([2013, 3, 29]).weekday(),
            'Apr 29 2013 is Monday    -- 2nd day'
        ).toBe(2);
        expect(
            moment([2015, 2, 10]).weekday(),
            'Mar 10 2015 is Tuesday   -- 3nd day'
        ).toBe(3);
        expect(
            moment([1970, 0, 7]).weekday(),
            'Jan  7 1970 is Wednesday -- 4th day'
        ).toBe(4);
        expect(
            moment([2001, 4, 17]).weekday(),
            'May 17 2001 is Thursday  -- 5th day'
        ).toBe(5);
        expect(
            moment([2000, 0, 7]).weekday(),
            'Jan  7 2000 is Friday    -- 6th day'
        ).toBe(6);
    });
});
