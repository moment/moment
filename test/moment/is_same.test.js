import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('is same', () => {
    test('is same without units', () => {
        var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
            mCopy = moment(m);
        expect(
            m.isSame(moment(new Date(2012, 3, 2, 3, 5, 5, 10))),
            'year is later'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2010, 3, 2, 3, 3, 5, 10))),
            'year is earlier'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 4, 2, 3, 4, 5, 10))),
            'month is later'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 2, 2, 3, 4, 5, 10))),
            'month is earlier'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 3, 3, 3, 4, 5, 10))),
            'day is later'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 3, 1, 3, 4, 5, 10))),
            'day is earlier'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 3, 2, 4, 4, 5, 10))),
            'hour is later'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 3, 2, 2, 4, 5, 10))),
            'hour is earlier'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 3, 2, 3, 5, 5, 10))),
            'minute is later'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 3, 2, 3, 3, 5, 10))),
            'minute is earlier'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 3, 2, 3, 4, 6, 10))),
            'second is later'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 3, 2, 3, 4, 4, 11))),
            'second is earlier'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 3, 2, 3, 4, 5, 10))),
            'millisecond match'
        ).toBe(true);
        expect(
            m.isSame(moment(new Date(2011, 3, 2, 3, 4, 5, 11))),
            'millisecond is later'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 3, 2, 3, 4, 5, 9))),
            'millisecond is earlier'
        ).toBe(false);
        expect(m.isSame(m), 'moments are the same as themselves').toBe(true);
        expect(+m, 'isSame second should not change moment').toBe(+mCopy);
    });

    test('is same year', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)),
            mCopy = moment(m);
        expect(
            m.isSame(moment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'year'),
            'year match'
        ).toBe(true);
        expect(
            m.isSame(moment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'years'),
            'plural should work'
        ).toBe(true);
        expect(
            m.isSame(moment(new Date(2012, 5, 6, 7, 8, 9, 10)), 'year'),
            'year mismatch'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 0, 1, 0, 0, 0, 0)), 'year'),
            'exact start of year'
        ).toBe(true);
        expect(
            m.isSame(moment(new Date(2011, 11, 31, 23, 59, 59, 999)), 'year'),
            'exact end of year'
        ).toBe(true);
        expect(
            m.isSame(moment(new Date(2012, 0, 1, 0, 0, 0, 0)), 'year'),
            'start of next year'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2010, 11, 31, 23, 59, 59, 999)), 'year'),
            'end of previous year'
        ).toBe(false);
        expect(m.isSame(m, 'year'), 'same moments are in the same year').toBe(
            true
        );
        expect(+m, 'isSame year should not change moment').toBe(+mCopy);
    });

    test('is same month', () => {
        var m = moment(new Date(2011, 2, 3, 4, 5, 6, 7)),
            mCopy = moment(m);
        expect(
            m.isSame(moment(new Date(2011, 2, 6, 7, 8, 9, 10)), 'month'),
            'month match'
        ).toBe(true);
        expect(
            m.isSame(moment(new Date(2011, 2, 6, 7, 8, 9, 10)), 'months'),
            'plural should work'
        ).toBe(true);
        expect(
            m.isSame(moment(new Date(2012, 2, 6, 7, 8, 9, 10)), 'month'),
            'year mismatch'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'month'),
            'month mismatch'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 2, 1, 0, 0, 0, 0)), 'month'),
            'exact start of month'
        ).toBe(true);
        expect(
            m.isSame(moment(new Date(2011, 2, 31, 23, 59, 59, 999)), 'month'),
            'exact end of month'
        ).toBe(true);
        expect(
            m.isSame(moment(new Date(2011, 3, 1, 0, 0, 0, 0)), 'month'),
            'start of next month'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 1, 27, 23, 59, 59, 999)), 'month'),
            'end of previous month'
        ).toBe(false);
        expect(m.isSame(m, 'month'), 'same moments are in the same month').toBe(
            true
        );
        expect(+m, 'isSame month should not change moment').toBe(+mCopy);
    });

    test('is same day', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)),
            mCopy = moment(m);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 7, 8, 9, 10)), 'day'),
            'day match'
        ).toBe(true);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 7, 8, 9, 10)), 'days'),
            'plural should work'
        ).toBe(true);
        expect(
            m.isSame(moment(new Date(2012, 1, 2, 7, 8, 9, 10)), 'day'),
            'year mismatch'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 2, 2, 7, 8, 9, 10)), 'day'),
            'month mismatch'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 1, 3, 7, 8, 9, 10)), 'day'),
            'day mismatch'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 0, 0, 0, 0)), 'day'),
            'exact start of day'
        ).toBe(true);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 23, 59, 59, 999)), 'day'),
            'exact end of day'
        ).toBe(true);
        expect(
            m.isSame(moment(new Date(2011, 1, 3, 0, 0, 0, 0)), 'day'),
            'start of next day'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 1, 1, 23, 59, 59, 999)), 'day'),
            'end of previous day'
        ).toBe(false);
        expect(m.isSame(m, 'day'), 'same moments are in the same day').toBe(
            true
        );
        expect(+m, 'isSame day should not change moment').toBe(+mCopy);
    });

    test('is same hour', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)),
            mCopy = moment(m);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 3, 8, 9, 10)), 'hour'),
            'hour match'
        ).toBe(true);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 3, 8, 9, 10)), 'hours'),
            'plural should work'
        ).toBe(true);
        expect(
            m.isSame(moment(new Date(2012, 1, 2, 3, 8, 9, 10)), 'hour'),
            'year mismatch'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 2, 2, 3, 8, 9, 10)), 'hour'),
            'month mismatch'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 1, 3, 3, 8, 9, 10)), 'hour'),
            'day mismatch'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 4, 8, 9, 10)), 'hour'),
            'hour mismatch'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 3, 0, 0, 0)), 'hour'),
            'exact start of hour'
        ).toBe(true);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 3, 59, 59, 999)), 'hour'),
            'exact end of hour'
        ).toBe(true);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 4, 0, 0, 0)), 'hour'),
            'start of next hour'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 2, 59, 59, 999)), 'hour'),
            'end of previous hour'
        ).toBe(false);
        expect(m.isSame(m, 'hour'), 'same moments are in the same hour').toBe(
            true
        );
        expect(+m, 'isSame hour should not change moment').toBe(+mCopy);
    });

    test('is same minute', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)),
            mCopy = moment(m);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 3, 4, 9, 10)), 'minute'),
            'minute match'
        ).toBe(true);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 3, 4, 9, 10)), 'minutes'),
            'plural should work'
        ).toBe(true);
        expect(
            m.isSame(moment(new Date(2012, 1, 2, 3, 4, 9, 10)), 'minute'),
            'year mismatch'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 2, 2, 3, 4, 9, 10)), 'minute'),
            'month mismatch'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 1, 3, 3, 4, 9, 10)), 'minute'),
            'day mismatch'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 4, 4, 9, 10)), 'minute'),
            'hour mismatch'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 3, 5, 9, 10)), 'minute'),
            'minute mismatch'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 3, 4, 0, 0)), 'minute'),
            'exact start of minute'
        ).toBe(true);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 3, 4, 59, 999)), 'minute'),
            'exact end of minute'
        ).toBe(true);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 3, 5, 0, 0)), 'minute'),
            'start of next minute'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 3, 3, 59, 999)), 'minute'),
            'end of previous minute'
        ).toBe(false);
        expect(
            m.isSame(m, 'minute'),
            'same moments are in the same minute'
        ).toBe(true);
        expect(+m, 'isSame minute should not change moment').toBe(+mCopy);
    });

    test('is same second', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)),
            mCopy = moment(m);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 3, 4, 5, 10)), 'second'),
            'second match'
        ).toBe(true);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 3, 4, 5, 10)), 'seconds'),
            'plural should work'
        ).toBe(true);
        expect(
            m.isSame(moment(new Date(2012, 1, 2, 3, 4, 5, 10)), 'second'),
            'year mismatch'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 2, 2, 3, 4, 5, 10)), 'second'),
            'month mismatch'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 1, 3, 3, 4, 5, 10)), 'second'),
            'day mismatch'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 4, 4, 5, 10)), 'second'),
            'hour mismatch'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 3, 5, 5, 10)), 'second'),
            'minute mismatch'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 3, 4, 6, 10)), 'second'),
            'second mismatch'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 3, 4, 5, 0)), 'second'),
            'exact start of second'
        ).toBe(true);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 3, 4, 5, 999)), 'second'),
            'exact end of second'
        ).toBe(true);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 3, 4, 6, 0)), 'second'),
            'start of next second'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 1, 2, 3, 4, 4, 999)), 'second'),
            'end of previous second'
        ).toBe(false);
        expect(
            m.isSame(m, 'second'),
            'same moments are in the same second'
        ).toBe(true);
        expect(+m, 'isSame second should not change moment').toBe(+mCopy);
    });

    test('is same millisecond', () => {
        var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
            mCopy = moment(m);
        expect(
            m.isSame(moment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'millisecond'),
            'millisecond match'
        ).toBe(true);
        expect(
            m.isSame(moment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'milliseconds'),
            'plural should work'
        ).toBe(true);
        expect(
            m.isSame(moment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'millisecond'),
            'year is later'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2010, 3, 2, 3, 4, 5, 10)), 'millisecond'),
            'year is earlier'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 4, 2, 3, 4, 5, 10)), 'millisecond'),
            'month is later'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 2, 2, 3, 4, 5, 10)), 'millisecond'),
            'month is earlier'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 3, 3, 3, 4, 5, 10)), 'millisecond'),
            'day is later'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 3, 1, 1, 4, 5, 10)), 'millisecond'),
            'day is earlier'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 3, 2, 4, 4, 5, 10)), 'millisecond'),
            'hour is later'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 3, 1, 4, 1, 5, 10)), 'millisecond'),
            'hour is earlier'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 3, 2, 3, 5, 5, 10)), 'millisecond'),
            'minute is later'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 3, 2, 3, 3, 5, 10)), 'millisecond'),
            'minute is earlier'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 3, 2, 3, 4, 6, 10)), 'millisecond'),
            'second is later'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 3, 2, 3, 4, 4, 5)), 'millisecond'),
            'second is earlier'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 3, 2, 3, 4, 6, 11)), 'millisecond'),
            'millisecond is later'
        ).toBe(false);
        expect(
            m.isSame(moment(new Date(2011, 3, 2, 3, 4, 4, 9)), 'millisecond'),
            'millisecond is earlier'
        ).toBe(false);
        expect(
            m.isSame(m, 'millisecond'),
            'same moments are in the same millisecond'
        ).toBe(true);
        expect(+m, 'isSame millisecond should not change moment').toBe(+mCopy);
    });

    test('is same with utc offset moments', () => {
        expect(
            moment
                .parseZone('2013-02-01T00:00:00-05:00')
                .isSame(moment('2013-02-01'), 'year'),
            'zoned vs local moment'
        ).toBeTruthy();
        expect(
            moment('2013-02-01').isSame(
                moment('2013-02-01').utcOffset('-05:00'),
                'year'
            ),
            'local vs zoned moment'
        ).toBeTruthy();
        expect(
            moment
                .parseZone('2013-02-01T00:00:00-05:00')
                .isSame(moment.parseZone('2013-02-01T00:00:00-06:30'), 'year'),
            'zoned vs (differently) zoned moment'
        ).toBeTruthy();
    });

    test('is same with invalid moments', () => {
        expect(
            moment.invalid().isSame(moment.invalid()),
            'invalid moments are not considered equal'
        ).toBe(false);
    });
});
