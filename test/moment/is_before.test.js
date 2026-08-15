import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('is before', () => {
    test('is after without units', () => {
        var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
            mCopy = moment(m);
        expect(
            m.isBefore(moment(new Date(2012, 3, 2, 3, 5, 5, 10))),
            'year is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2010, 3, 2, 3, 3, 5, 10))),
            'year is earlier'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 4, 2, 3, 4, 5, 10))),
            'month is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 2, 2, 3, 4, 5, 10))),
            'month is earlier'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 3, 3, 4, 5, 10))),
            'day is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 3, 1, 3, 4, 5, 10))),
            'day is earlier'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 4, 4, 5, 10))),
            'hour is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 2, 4, 5, 10))),
            'hour is earlier'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 5, 5, 10))),
            'minute is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 3, 5, 10))),
            'minute is earlier'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 6, 10))),
            'second is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 4, 11))),
            'second is earlier'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 5, 10))),
            'millisecond match'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 5, 11))),
            'millisecond is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 5, 9))),
            'millisecond is earlier'
        ).toBe(false);
        expect(m.isBefore(m), 'moments are not before themselves').toBe(false);
        expect(+m, 'isBefore second should not change moment').toBe(+mCopy);
    });

    test('is before year', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)),
            mCopy = moment(m);
        expect(
            m.isBefore(moment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'year'),
            'year match'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2012, 5, 6, 7, 8, 9, 10)), 'years'),
            'plural should work'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2013, 5, 6, 7, 8, 9, 10)), 'year'),
            'year is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2010, 5, 6, 7, 8, 9, 10)), 'year'),
            'year is earlier'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 0, 1, 0, 0, 0, 0)), 'year'),
            'exact start of year'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 11, 31, 23, 59, 59, 999)), 'year'),
            'exact end of year'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2012, 0, 1, 0, 0, 0, 0)), 'year'),
            'start of next year'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2010, 11, 31, 23, 59, 59, 999)), 'year'),
            'end of previous year'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(1980, 11, 31, 23, 59, 59, 999)), 'year'),
            'end of year far before'
        ).toBe(false);
        expect(
            m.isBefore(m, 'year'),
            'same moments are not before the same year'
        ).toBe(false);
        expect(+m, 'isBefore year should not change moment').toBe(+mCopy);
    });

    test('is before month', () => {
        var m = moment(new Date(2011, 2, 3, 4, 5, 6, 7)),
            mCopy = moment(m);
        expect(
            m.isBefore(moment(new Date(2011, 2, 6, 7, 8, 9, 10)), 'month'),
            'month match'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2012, 2, 6, 7, 8, 9, 10)), 'months'),
            'plural should work'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2012, 2, 6, 7, 8, 9, 10)), 'month'),
            'year is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2010, 2, 6, 7, 8, 9, 10)), 'month'),
            'year is earlier'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 5, 6, 7, 8, 9, 10)), 'month'),
            'month is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 1, 6, 7, 8, 9, 10)), 'month'),
            'month is earlier'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 2, 1, 0, 0, 0, 0)), 'month'),
            'exact start of month'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 2, 31, 23, 59, 59, 999)), 'month'),
            'exact end of month'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 1, 0, 0, 0, 0)), 'month'),
            'start of next month'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 1, 27, 23, 59, 59, 999)), 'month'),
            'end of previous month'
        ).toBe(false);
        expect(
            m.isBefore(
                moment(new Date(2010, 12, 31, 23, 59, 59, 999)),
                'month'
            ),
            'later month but earlier year'
        ).toBe(false);
        expect(
            m.isBefore(m, 'month'),
            'same moments are not before the same month'
        ).toBe(false);
        expect(+m, 'isBefore month should not change moment').toBe(+mCopy);
    });

    test('is before day', () => {
        var m = moment(new Date(2011, 3, 2, 3, 4, 5, 6)),
            mCopy = moment(m);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 7, 8, 9, 10)), 'day'),
            'day match'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2012, 3, 2, 7, 8, 9, 10)), 'days'),
            'plural should work'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2012, 3, 2, 7, 8, 9, 10)), 'day'),
            'year is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2010, 3, 2, 7, 8, 9, 10)), 'day'),
            'year is earlier'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 4, 2, 7, 8, 9, 10)), 'day'),
            'month is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 2, 2, 7, 8, 9, 10)), 'day'),
            'month is earlier'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 3, 7, 8, 9, 10)), 'day'),
            'day is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 3, 1, 7, 8, 9, 10)), 'day'),
            'day is earlier'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 0, 0, 0, 0)), 'day'),
            'exact start of day'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 23, 59, 59, 999)), 'day'),
            'exact end of day'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 3, 0, 0, 0, 0)), 'day'),
            'start of next day'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 3, 1, 23, 59, 59, 999)), 'day'),
            'end of previous day'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2010, 3, 10, 0, 0, 0, 0)), 'day'),
            'later day but earlier year'
        ).toBe(false);
        expect(
            m.isBefore(m, 'day'),
            'same moments are not before the same day'
        ).toBe(false);
        expect(+m, 'isBefore day should not change moment').toBe(+mCopy);
    });

    test('is before hour', () => {
        var m = moment(new Date(2011, 3, 2, 3, 4, 5, 6)),
            mCopy = moment(m);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 8, 9, 10)), 'hour'),
            'hour match'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2012, 3, 2, 3, 8, 9, 10)), 'hours'),
            'plural should work'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2012, 3, 2, 3, 8, 9, 10)), 'hour'),
            'year is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2010, 3, 2, 3, 8, 9, 10)), 'hour'),
            'year is earlier'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 4, 2, 3, 8, 9, 10)), 'hour'),
            'month is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 1, 2, 3, 8, 9, 10)), 'hour'),
            'month is earlier'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 3, 3, 8, 9, 10)), 'hour'),
            'day is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 3, 1, 3, 8, 9, 10)), 'hour'),
            'day is earlier'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 4, 8, 9, 10)), 'hour'),
            'hour is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 8, 9, 10)), 'hour'),
            'hour is earlier'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 0, 0, 0)), 'hour'),
            'exact start of hour'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 59, 59, 999)), 'hour'),
            'exact end of hour'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 4, 0, 0, 0)), 'hour'),
            'start of next hour'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 2, 59, 59, 999)), 'hour'),
            'end of previous hour'
        ).toBe(false);
        expect(
            m.isBefore(m, 'hour'),
            'same moments are not before the same hour'
        ).toBe(false);
        expect(+m, 'isBefore hour should not change moment').toBe(+mCopy);
    });

    test('is before minute', () => {
        var m = moment(new Date(2011, 3, 2, 3, 4, 5, 6)),
            mCopy = moment(m);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 9, 10)), 'minute'),
            'minute match'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2012, 3, 2, 3, 4, 9, 10)), 'minutes'),
            'plural should work'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2012, 3, 2, 3, 4, 9, 10)), 'minute'),
            'year is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2010, 3, 2, 3, 4, 9, 10)), 'minute'),
            'year is earlier'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 4, 2, 3, 4, 9, 10)), 'minute'),
            'month is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 2, 2, 3, 4, 9, 10)), 'minute'),
            'month is earlier'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 3, 3, 4, 9, 10)), 'minute'),
            'day is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 3, 1, 3, 4, 9, 10)), 'minute'),
            'day is earlier'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 4, 4, 9, 10)), 'minute'),
            'hour is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 2, 4, 9, 10)), 'minute'),
            'hour is earlier'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 5, 9, 10)), 'minute'),
            'minute is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 3, 9, 10)), 'minute'),
            'minute is earlier'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 0, 0)), 'minute'),
            'exact start of minute'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 59, 999)), 'minute'),
            'exact end of minute'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 5, 0, 0)), 'minute'),
            'start of next minute'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 3, 59, 999)), 'minute'),
            'end of previous minute'
        ).toBe(false);
        expect(
            m.isBefore(m, 'minute'),
            'same moments are not before the same minute'
        ).toBe(false);
        expect(+m, 'isBefore minute should not change moment').toBe(+mCopy);
    });

    test('is before second', () => {
        var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
            mCopy = moment(m);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 5, 10)), 'second'),
            'second match'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'seconds'),
            'plural should work'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2012, 3, 2, 3, 4, 5, 10)), 'second'),
            'year is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2010, 3, 2, 3, 4, 5, 10)), 'second'),
            'year is earlier'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 4, 2, 3, 4, 5, 10)), 'second'),
            'month is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 2, 2, 3, 4, 5, 10)), 'second'),
            'month is earlier'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 3, 3, 4, 5, 10)), 'second'),
            'day is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 3, 1, 1, 4, 5, 10)), 'second'),
            'day is earlier'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 4, 4, 5, 10)), 'second'),
            'hour is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 3, 1, 4, 1, 5, 10)), 'second'),
            'hour is earlier'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 5, 5, 10)), 'second'),
            'minute is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 3, 5, 10)), 'second'),
            'minute is earlier'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 6, 10)), 'second'),
            'second is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 4, 5)), 'second'),
            'second is earlier'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 5, 0)), 'second'),
            'exact start of second'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 5, 999)), 'second'),
            'exact end of second'
        ).toBe(false);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 6, 0)), 'second'),
            'start of next second'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 4, 999)), 'second'),
            'end of previous second'
        ).toBe(false);
        expect(
            m.isBefore(m, 'second'),
            'same moments are not before the same second'
        ).toBe(false);
        expect(+m, 'isBefore second should not change moment').toBe(+mCopy);
    });

    test('is before millisecond', () => {
        var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
            mCopy = moment(m);
        expect(
            m.isBefore(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                'millisecond'
            ),
            'millisecond match'
        ).toBe(false);
        expect(
            m.isBefore(
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                'milliseconds'
            ),
            'plural should work'
        ).toBe(false);
        expect(
            m.isBefore(
                moment(new Date(2012, 3, 2, 3, 4, 5, 10)),
                'millisecond'
            ),
            'year is later'
        ).toBe(true);
        expect(
            m.isBefore(
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                'millisecond'
            ),
            'year is earlier'
        ).toBe(false);
        expect(
            m.isBefore(
                moment(new Date(2011, 4, 2, 3, 4, 5, 10)),
                'millisecond'
            ),
            'month is later'
        ).toBe(true);
        expect(
            m.isBefore(
                moment(new Date(2011, 2, 2, 3, 4, 5, 10)),
                'millisecond'
            ),
            'month is earlier'
        ).toBe(false);
        expect(
            m.isBefore(
                moment(new Date(2011, 3, 3, 3, 4, 5, 10)),
                'millisecond'
            ),
            'day is later'
        ).toBe(true);
        expect(
            m.isBefore(
                moment(new Date(2011, 3, 1, 1, 4, 5, 10)),
                'millisecond'
            ),
            'day is earlier'
        ).toBe(false);
        expect(
            m.isBefore(
                moment(new Date(2011, 3, 2, 4, 4, 5, 10)),
                'millisecond'
            ),
            'hour is later'
        ).toBe(true);
        expect(
            m.isBefore(
                moment(new Date(2011, 3, 1, 4, 1, 5, 10)),
                'millisecond'
            ),
            'hour is earlier'
        ).toBe(false);
        expect(
            m.isBefore(
                moment(new Date(2011, 3, 2, 3, 5, 5, 10)),
                'millisecond'
            ),
            'minute is later'
        ).toBe(true);
        expect(
            m.isBefore(
                moment(new Date(2011, 3, 2, 3, 3, 5, 10)),
                'millisecond'
            ),
            'minute is earlier'
        ).toBe(false);
        expect(
            m.isBefore(
                moment(new Date(2011, 3, 2, 3, 4, 6, 10)),
                'millisecond'
            ),
            'second is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 4, 5)), 'millisecond'),
            'second is earlier'
        ).toBe(false);
        expect(
            m.isBefore(
                moment(new Date(2011, 3, 2, 3, 4, 6, 11)),
                'millisecond'
            ),
            'millisecond is later'
        ).toBe(true);
        expect(
            m.isBefore(moment(new Date(2011, 3, 2, 3, 4, 4, 9)), 'millisecond'),
            'millisecond is earlier'
        ).toBe(false);
        expect(
            m.isBefore(m, 'millisecond'),
            'same moments are not before the same millisecond'
        ).toBe(false);
        expect(+m, 'isBefore millisecond should not change moment').toBe(
            +mCopy
        );
    });

    test('is before invalid', () => {
        var m = moment(),
            invalid = moment.invalid();
        expect(
            m.isBefore(invalid),
            'valid moment is not before invalid moment'
        ).toBe(false);
        expect(
            invalid.isBefore(m),
            'invalid moment is not before valid moment'
        ).toBe(false);
        expect(m.isBefore(invalid, 'year'), 'invalid moment year').toBe(false);
        expect(m.isBefore(invalid, 'month'), 'invalid moment month').toBe(
            false
        );
        expect(m.isBefore(invalid, 'day'), 'invalid moment day').toBe(false);
        expect(m.isBefore(invalid, 'hour'), 'invalid moment hour').toBe(false);
        expect(m.isBefore(invalid, 'minute'), 'invalid moment minute').toBe(
            false
        );
        expect(m.isBefore(invalid, 'second'), 'invalid moment second').toBe(
            false
        );
        expect(
            m.isBefore(invalid, 'milliseconds'),
            'invalid moment milliseconds'
        ).toBe(false);
    });
});
