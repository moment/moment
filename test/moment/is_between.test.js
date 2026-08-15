import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('is between', () => {
    test('is between without units', () => {
        var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
            mCopy = moment(m);
        expect(
            m.isBetween(
                moment(new Date(2009, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10))
            ),
            'year is later'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2013, 3, 2, 3, 4, 5, 10))
            ),
            'year is earlier'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2012, 3, 2, 3, 4, 5, 10))
            ),
            'year is between'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10))
            ),
            'month is later'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 5, 2, 3, 4, 5, 10))
            ),
            'month is earlier'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 2, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 4, 2, 3, 4, 5, 10))
            ),
            'month is between'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2011, 3, 1, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10))
            ),
            'day is later'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 4, 3, 4, 5, 10))
            ),
            'day is earlier'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 3, 1, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 3, 3, 4, 5, 10))
            ),
            'day is between'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 1, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10))
            ),
            'hour is later'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 5, 4, 5, 10))
            ),
            'hour is earlier'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 2, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 4, 4, 5, 10))
            ),
            'hour is between'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 6, 5, 10))
            ),
            'minute is later'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 2, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10))
            ),
            'minute is earlier'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 3, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 5, 5, 10))
            ),
            'minute is between'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 7, 10))
            ),
            'second is later'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 3, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10))
            ),
            'second is earlier'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 4, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 6, 10))
            ),
            'second is between'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 12))
            ),
            'millisecond is later'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 8)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10))
            ),
            'millisecond is earlier'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 9)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 11))
            ),
            'millisecond is between'
        ).toBe(true);
        expect(m.isBetween(m, m), 'moments are not between themselves').toBe(
            false
        );
        expect(+m, 'isBetween second should not change moment').toBe(+mCopy);
    });

    test('is between without units inclusivity', () => {
        var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10));
        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2012, 3, 2, 3, 4, 5, 10)),
                null,
                '()'
            ),
            'start and end are excluded, start is equal to moment'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                null,
                '()'
            ),
            'start and end are excluded, end is equal to moment'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2012, 3, 2, 3, 4, 5, 10)),
                null,
                '()'
            ),
            'start and end are excluded, is between'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2009, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                null,
                '()'
            ),
            'start and end are excluded, is not between'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                null,
                '()'
            ),
            'start and end are excluded, should fail on same start/end date.'
        ).toBe(false);

        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2012, 3, 2, 3, 4, 5, 10)),
                null,
                '(]'
            ),
            'start is excluded and end is included should fail on same start date'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                null,
                '(]'
            ),
            'start is excluded and end is included should succeed on end date'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2012, 3, 2, 3, 4, 5, 10)),
                null,
                '(]'
            ),
            'start is excluded and end is included, is between'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2009, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                null,
                '(]'
            ),
            'start is excluded and end is included, is not between'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                null,
                '(]'
            ),
            'start is excluded and end is included, should fail on same start/end date.'
        ).toBe(false);

        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2012, 3, 2, 3, 4, 5, 10)),
                null,
                '[)'
            ),
            'start is included and end is excluded should succeed on same start date'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                null,
                '[)'
            ),
            'start is included and end is excluded should fail on same end date'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2012, 3, 2, 3, 4, 5, 10)),
                null,
                '[)'
            ),
            'start is included and end is excluded, is between'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2009, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                null,
                '[)'
            ),
            'start is included and end is excluded, is not between'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                null,
                '[)'
            ),
            'start is included and end is excluded, should fail on same end and start date'
        ).toBe(false);

        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2012, 3, 2, 3, 4, 5, 10)),
                null,
                '[]'
            ),
            'start and end inclusive should succeed on same start date'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                null,
                '[]'
            ),
            'start and end inclusive should succeed on same end date'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2012, 3, 2, 3, 4, 5, 10)),
                null,
                '[]'
            ),
            'start and end inclusive, is between'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2009, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                null,
                '[]'
            ),
            'start and end inclusive, is not between'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                null,
                '[]'
            ),
            'start and end inclusive, should handle same end and start date'
        ).toBe(true);
    });

    test('is between milliseconds inclusivity', () => {
        var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10));
        expect(
            m.isBetween(
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2012, 3, 2, 3, 4, 5, 10)),
                'milliseconds'
            ),
            'options, no inclusive'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2012, 3, 2, 3, 4, 5, 10)),
                'milliseconds',
                '()'
            ),
            'start and end are excluded, start is equal to moment'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                'milliseconds',
                '()'
            ),
            'start and end are excluded, end is equal to moment'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2012, 3, 2, 3, 4, 5, 10)),
                'milliseconds',
                '()'
            ),
            'start and end are excluded, is between'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2009, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                'milliseconds',
                '()'
            ),
            'start and end are excluded, is not between'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                'milliseconds',
                '()'
            ),
            'start and end are excluded, should fail on same start/end date.'
        ).toBe(false);

        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2012, 3, 2, 3, 4, 5, 10)),
                'milliseconds',
                '(]'
            ),
            'start is excluded and end is included should fail on same start date'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                'milliseconds',
                '(]'
            ),
            'start is excluded and end is included should succeed on end date'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2012, 3, 2, 3, 4, 5, 10)),
                'milliseconds',
                '(]'
            ),
            'start is excluded and end is included, is between'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2009, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                'milliseconds',
                '(]'
            ),
            'start is excluded and end is included, is not between'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                'milliseconds',
                '(]'
            ),
            'start is excluded and end is included, should fail on same start/end date.'
        ).toBe(false);

        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2012, 3, 2, 3, 4, 5, 10)),
                'milliseconds',
                '[)'
            ),
            'start is included and end is excluded should succeed on same start date'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                'milliseconds',
                '[)'
            ),
            'start is included and end is excluded should fail on same end date'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2012, 3, 2, 3, 4, 5, 10)),
                'milliseconds',
                '[)'
            ),
            'start is included and end is excluded, is between'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2009, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                'milliseconds',
                '[)'
            ),
            'start is included and end is excluded, is not between'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                'milliseconds',
                '[)'
            ),
            'start is included and end is excluded, should fail on same end and start date'
        ).toBe(false);

        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2012, 3, 2, 3, 4, 5, 10)),
                'milliseconds',
                '[]'
            ),
            'start and end inclusive should succeed on same start date'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                'milliseconds',
                '[]'
            ),
            'start and end inclusive should succeed on same end date'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2012, 3, 2, 3, 4, 5, 10)),
                'milliseconds',
                '[]'
            ),
            'start and end inclusive, is between'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2009, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2010, 3, 2, 3, 4, 5, 10)),
                'milliseconds',
                '[]'
            ),
            'start and end inclusive, is not between'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 3, 2, 3, 4, 5, 10)),
                'milliseconds',
                '[]'
            ),
            'start and end inclusive, should handle same end and start date'
        ).toBe(true);
    });

    test('is between year', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)),
            mCopy = moment(m);
        expect(
            m.isBetween(
                moment(new Date(2011, 5, 6, 7, 8, 9, 10)),
                moment(new Date(2011, 5, 6, 7, 8, 9, 10)),
                'year'
            ),
            'year match'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2010, 5, 6, 7, 8, 9, 10)),
                moment(new Date(2012, 5, 6, 7, 8, 9, 10)),
                'years'
            ),
            'plural should work'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2010, 5, 6, 7, 8, 9, 10)),
                moment(new Date(2012, 5, 6, 7, 8, 9, 10)),
                'year'
            ),
            'year is between'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2011, 5, 6, 7, 8, 9, 10)),
                moment(new Date(2013, 5, 6, 7, 8, 9, 10)),
                'year'
            ),
            'year is earlier'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2010, 5, 6, 7, 8, 9, 10)),
                moment(new Date(2011, 5, 6, 7, 8, 9, 10)),
                'year'
            ),
            'year is later'
        ).toBe(false);
        expect(
            m.isBetween(m, m, 'year'),
            'same moments are not between the same year'
        ).toBe(false);
        expect(+m, 'isBetween year should not change moment').toBe(+mCopy);
    });

    test('is between month', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)),
            mCopy = moment(m);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 6, 7, 8, 9, 10)),
                moment(new Date(2011, 1, 6, 7, 8, 9, 10)),
                'month'
            ),
            'month match'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 0, 6, 7, 8, 9, 10)),
                moment(new Date(2011, 2, 6, 7, 8, 9, 10)),
                'months'
            ),
            'plural should work'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2011, 0, 31, 23, 59, 59, 999)),
                moment(new Date(2011, 2, 1, 0, 0, 0, 0)),
                'month'
            ),
            'month is between'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 6, 7, 8, 9, 10)),
                moment(new Date(2011, 2, 6, 7, 8, 9, 10)),
                'month'
            ),
            'month is earlier'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 11, 6, 7, 8, 9, 10)),
                moment(new Date(2011, 1, 6, 7, 8, 9, 10)),
                'month'
            ),
            'month is later'
        ).toBe(false);
        expect(
            m.isBetween(m, m, 'month'),
            'same moments are not between the same month'
        ).toBe(false);
        expect(+m, 'isBetween month should not change moment').toBe(+mCopy);
    });

    test('is between day', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)),
            mCopy = moment(m);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 2, 7, 8, 9, 10)),
                moment(new Date(2011, 1, 2, 7, 8, 9, 10)),
                'day'
            ),
            'day match'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 1, 7, 8, 9, 10)),
                moment(new Date(2011, 1, 3, 7, 8, 9, 10)),
                'days'
            ),
            'plural should work'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 1, 7, 8, 9, 10)),
                moment(new Date(2011, 1, 3, 7, 8, 9, 10)),
                'day'
            ),
            'day is between'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 2, 7, 8, 9, 10)),
                moment(new Date(2011, 1, 4, 7, 8, 9, 10)),
                'day'
            ),
            'day is earlier'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 1, 7, 8, 9, 10)),
                moment(new Date(2011, 1, 2, 7, 8, 9, 10)),
                'day'
            ),
            'day is later'
        ).toBe(false);
        expect(
            m.isBetween(m, m, 'day'),
            'same moments are not between the same day'
        ).toBe(false);
        expect(+m, 'isBetween day should not change moment').toBe(+mCopy);
    });

    test('is between hour', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)),
            mCopy = moment(m);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 2, 3, 5, 9, 10)),
                moment(new Date(2011, 1, 2, 3, 9, 9, 10)),
                'hour'
            ),
            'hour match'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 2, 1, 59, 59, 999)),
                moment(new Date(2011, 1, 2, 4, 0, 0, 0)),
                'hours'
            ),
            'plural should work'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 2, 2, 59, 59, 999)),
                moment(new Date(2011, 1, 2, 4, 0, 0, 0)),
                'hour'
            ),
            'hour is between'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 2, 7, 8, 9, 10)),
                moment(new Date(2011, 1, 2, 7, 8, 9, 10)),
                'hour'
            ),
            'hour is earlier'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 2, 7, 8, 9, 10)),
                moment(new Date(2011, 1, 2, 7, 8, 9, 10)),
                'hour'
            ),
            'hour is later'
        ).toBe(false);
        expect(
            m.isBetween(m, m, 'hour'),
            'same moments are not between the same hour'
        ).toBe(false);
        expect(+m, 'isBetween hour should not change moment').toBe(+mCopy);
    });

    test('is between minute', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)),
            mCopy = moment(m);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 2, 3, 4, 9, 10)),
                moment(new Date(2011, 1, 2, 3, 4, 9, 10)),
                'minute'
            ),
            'minute match'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 2, 3, 3, 9, 10)),
                moment(new Date(2011, 1, 2, 3, 5, 9, 10)),
                'minutes'
            ),
            'plural should work'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 2, 3, 3, 59, 999)),
                moment(new Date(2011, 1, 2, 3, 5, 0, 0)),
                'minute'
            ),
            'minute is between'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 2, 3, 5, 0, 0)),
                moment(new Date(2011, 1, 2, 3, 8, 9, 10)),
                'minute'
            ),
            'minute is earlier'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 2, 3, 2, 9, 10)),
                moment(new Date(2011, 1, 2, 3, 3, 59, 999)),
                'minute'
            ),
            'minute is later'
        ).toBe(false);
        expect(
            m.isBetween(m, m, 'minute'),
            'same moments are not between the same minute'
        ).toBe(false);
        expect(+m, 'isBetween minute should not change moment').toBe(+mCopy);
    });

    test('is between second', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)),
            mCopy = moment(m);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 2, 3, 4, 5, 10)),
                moment(new Date(2011, 1, 2, 3, 4, 5, 10)),
                'second'
            ),
            'second match'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 2, 3, 4, 4, 10)),
                moment(new Date(2011, 1, 2, 3, 4, 6, 10)),
                'seconds'
            ),
            'plural should work'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 2, 3, 4, 4, 999)),
                moment(new Date(2011, 1, 2, 3, 4, 6, 0)),
                'second'
            ),
            'second is between'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 2, 3, 4, 6, 0)),
                moment(new Date(2011, 1, 2, 3, 4, 7, 10)),
                'second'
            ),
            'second is earlier'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 2, 3, 4, 3, 10)),
                moment(new Date(2011, 1, 2, 3, 4, 4, 999)),
                'second'
            ),
            'second is later'
        ).toBe(false);
        expect(
            m.isBetween(m, m, 'second'),
            'same moments are not between the same second'
        ).toBe(false);
        expect(+m, 'isBetween second should not change moment').toBe(+mCopy);
    });

    test('is between millisecond', () => {
        var m = moment(new Date(2011, 1, 2, 3, 4, 5, 6)),
            mCopy = moment(m);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 2, 3, 4, 5, 6)),
                moment(new Date(2011, 1, 2, 3, 4, 5, 6)),
                'millisecond'
            ),
            'millisecond match'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 2, 3, 4, 5, 5)),
                moment(new Date(2011, 1, 2, 3, 4, 5, 7)),
                'milliseconds'
            ),
            'plural should work'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 2, 3, 4, 5, 5)),
                moment(new Date(2011, 1, 2, 3, 4, 5, 7)),
                'millisecond'
            ),
            'millisecond is between'
        ).toBe(true);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 2, 3, 4, 5, 7)),
                moment(new Date(2011, 1, 2, 3, 4, 5, 10)),
                'millisecond'
            ),
            'millisecond is earlier'
        ).toBe(false);
        expect(
            m.isBetween(
                moment(new Date(2011, 1, 2, 3, 4, 5, 4)),
                moment(new Date(2011, 1, 2, 3, 4, 5, 6)),
                'millisecond'
            ),
            'millisecond is later'
        ).toBe(false);
        expect(
            m.isBetween(m, m, 'millisecond'),
            'same moments are not between the same millisecond'
        ).toBe(false);
        expect(+m, 'isBetween millisecond should not change moment').toBe(
            +mCopy
        );
    });

    test('is between invalid', () => {
        var invalid = moment(NaN),
            valid = moment(new Date(2011, 1, 2, 3, 4, 5, 6)),
            validFrom = moment(new Date(2010, 1, 2, 3, 4, 5, 6)),
            validTo = moment(new Date(2012, 1, 2, 3, 4, 5, 6));
        expect(
            invalid.isBetween(validFrom, validTo),
            'this instance invalid'
        ).toBe(false);
        expect(
            invalid.isBetween(validFrom, validTo, '[]'),
            'this instance invalid []'
        ).toBe(false);
        expect(
            invalid.isBetween(validFrom, validTo, '[)'),
            'this instance invalid [)'
        ).toBe(false);
        expect(
            invalid.isBetween(validFrom, validTo, '(]'),
            'this instance invalid (]'
        ).toBe(false);
        expect(
            invalid.isBetween(validFrom, validTo, '()'),
            'this instance invalid ()'
        ).toBe(false);

        expect(valid.isBetween(invalid, validTo), 'from invalid moment').toBe(
            false
        );
        expect(
            valid.isBetween(invalid, validTo, '[]'),
            'from invalid moment []'
        ).toBe(false);
        expect(
            valid.isBetween(invalid, validTo, '[)'),
            'from invalid moment [)'
        ).toBe(false);
        expect(
            valid.isBetween(invalid, validTo, '(]'),
            'from invalid moment (]'
        ).toBe(false);
        expect(
            valid.isBetween(invalid, validTo, '()'),
            'from invalid moment ()'
        ).toBe(false);

        expect(valid.isBetween(validFrom, invalid), 'to invalid moment').toBe(
            false
        );
        expect(
            valid.isBetween(validFrom, invalid, '[]'),
            'to invalid moment []'
        ).toBe(false);
        expect(
            valid.isBetween(validFrom, invalid, '[)'),
            'to invalid moment [)'
        ).toBe(false);
        expect(
            valid.isBetween(validFrom, invalid, '(]'),
            'to invalid moment (]'
        ).toBe(false);
        expect(
            valid.isBetween(validFrom, invalid, '()'),
            'to invalid moment ()'
        ).toBe(false);
    });
});
