import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

function expectClose(a, b, message) {
    expect(
        Math.abs(a - b) < 0.00000001,
        '(' + a + ' === ' + b + ') ' + message
    ).toBeTruthy();
}

function dstForYear(year) {
    var start = moment([year]),
        end = moment([year + 1]),
        current = start.clone(),
        last;

    while (current < end) {
        last = current.clone();
        current.add(24, 'hour');
        if (last.utcOffset() !== current.utcOffset()) {
            end = current.clone();
            current = last.clone();
            break;
        }
    }

    while (current < end) {
        last = current.clone();
        current.add(1, 'hour');
        if (last.utcOffset() !== current.utcOffset()) {
            return {
                moment: last,
                diff: -(current.utcOffset() - last.utcOffset()) / 60,
            };
        }
    }
}

describe('diff', () => {
    test('diff', () => {
        expect(moment(1000).diff(0), '1 second - 0 = 1000').toBe(1000);
        expect(moment(1000).diff(500), '1 second - 0.5 seconds = 500').toBe(
            500
        );
        expect(moment(0).diff(1000), '0 - 1 second = -1000').toBe(-1000);
        expect(
            moment(new Date(1000)).diff(1000),
            '1 second - 1 second = 0'
        ).toBe(0);
        var oneHourDate = new Date(2015, 5, 21),
            nowDate = new Date(+oneHourDate);
        oneHourDate.setHours(oneHourDate.getHours() + 1);
        expect(
            moment(oneHourDate).diff(nowDate),
            '1 hour from now = 3600000'
        ).toBe(60 * 60 * 1000);
    });

    test('diff key after', () => {
        expect(moment([2010]).diff([2011], 'years'), 'year diff').toBe(-1);
        expect(moment([2010]).diff([2010, 2], 'months'), 'month diff').toBe(-2);
        expect(moment([2010]).diff([2010, 0, 7], 'weeks'), 'week diff').toBe(0);
        expect(moment([2010]).diff([2010, 0, 8], 'weeks'), 'week diff').toBe(
            -1
        );
        expect(moment([2010]).diff([2010, 0, 21], 'weeks'), 'week diff').toBe(
            -2
        );
        expect(moment([2010]).diff([2010, 0, 22], 'weeks'), 'week diff').toBe(
            -3
        );
        expect(moment([2010]).diff([2010, 0, 4], 'days'), 'day diff').toBe(-3);
        expect(moment([2010]).diff([2010, 0, 1, 4], 'hours'), 'hour diff').toBe(
            -4
        );
        expect(
            moment([2010]).diff([2010, 0, 1, 0, 5], 'minutes'),
            'minute diff'
        ).toBe(-5);
        expect(
            moment([2010]).diff([2010, 0, 1, 0, 0, 6], 'seconds'),
            'second diff'
        ).toBe(-6);
    });

    test('diff key before', () => {
        expect(moment([2011]).diff([2010], 'years'), 'year diff').toBe(1);
        expect(moment([2010, 2]).diff([2010], 'months'), 'month diff').toBe(2);
        expect(moment([2010, 0, 4]).diff([2010], 'days'), 'day diff').toBe(3);
        expect(moment([2010, 0, 7]).diff([2010], 'weeks'), 'week diff').toBe(0);
        expect(moment([2010, 0, 8]).diff([2010], 'weeks'), 'week diff').toBe(1);
        expect(moment([2010, 0, 21]).diff([2010], 'weeks'), 'week diff').toBe(
            2
        );
        expect(moment([2010, 0, 22]).diff([2010], 'weeks'), 'week diff').toBe(
            3
        );
        expect(moment([2010, 0, 1, 4]).diff([2010], 'hours'), 'hour diff').toBe(
            4
        );
        expect(
            moment([2010, 0, 1, 0, 5]).diff([2010], 'minutes'),
            'minute diff'
        ).toBe(5);
        expect(
            moment([2010, 0, 1, 0, 0, 6]).diff([2010], 'seconds'),
            'second diff'
        ).toBe(6);
    });

    test('diff key before singular', () => {
        expect(moment([2011]).diff([2010], 'year'), 'year diff singular').toBe(
            1
        );
        expect(
            moment([2010, 2]).diff([2010], 'month'),
            'month diff singular'
        ).toBe(2);
        expect(
            moment([2010, 0, 4]).diff([2010], 'day'),
            'day diff singular'
        ).toBe(3);
        expect(
            moment([2010, 0, 7]).diff([2010], 'week'),
            'week diff singular'
        ).toBe(0);
        expect(
            moment([2010, 0, 8]).diff([2010], 'week'),
            'week diff singular'
        ).toBe(1);
        expect(
            moment([2010, 0, 21]).diff([2010], 'week'),
            'week diff singular'
        ).toBe(2);
        expect(
            moment([2010, 0, 22]).diff([2010], 'week'),
            'week diff singular'
        ).toBe(3);
        expect(
            moment([2010, 0, 1, 4]).diff([2010], 'hour'),
            'hour diff singular'
        ).toBe(4);
        expect(
            moment([2010, 0, 1, 0, 5]).diff([2010], 'minute'),
            'minute diff singular'
        ).toBe(5);
        expect(
            moment([2010, 0, 1, 0, 0, 6]).diff([2010], 'second'),
            'second diff singular'
        ).toBe(6);
    });

    test('diff key before abbreviated', () => {
        expect(moment([2011]).diff([2010], 'y'), 'year diff abbreviated').toBe(
            1
        );
        expect(
            moment([2010, 2]).diff([2010], 'M'),
            'month diff abbreviated'
        ).toBe(2);
        expect(
            moment([2010, 0, 4]).diff([2010], 'd'),
            'day diff abbreviated'
        ).toBe(3);
        expect(
            moment([2010, 0, 7]).diff([2010], 'w'),
            'week diff abbreviated'
        ).toBe(0);
        expect(
            moment([2010, 0, 8]).diff([2010], 'w'),
            'week diff abbreviated'
        ).toBe(1);
        expect(
            moment([2010, 0, 21]).diff([2010], 'w'),
            'week diff abbreviated'
        ).toBe(2);
        expect(
            moment([2010, 0, 22]).diff([2010], 'w'),
            'week diff abbreviated'
        ).toBe(3);
        expect(
            moment([2010, 0, 1, 4]).diff([2010], 'h'),
            'hour diff abbreviated'
        ).toBe(4);
        expect(
            moment([2010, 0, 1, 0, 5]).diff([2010], 'm'),
            'minute diff abbreviated'
        ).toBe(5);
        expect(
            moment([2010, 0, 1, 0, 0, 6]).diff([2010], 's'),
            'second diff abbreviated'
        ).toBe(6);
    });

    test('diff month', () => {
        expect(
            moment([2011, 0, 31]).diff([2011, 2, 1], 'months'),
            'month diff'
        ).toBe(-1);
    });

    test('end of month diff', () => {
        expect(
            moment('2016-02-29').diff('2016-01-30', 'months'),
            'Feb 29 to Jan 30 should be 1 month'
        ).toBe(1);
        expect(
            moment('2016-02-29').diff('2016-01-31', 'months'),
            'Feb 29 to Jan 31 should be 1 month'
        ).toBe(1);
        expect(
            moment('2016-05-31')
                .add(1, 'month')
                .diff(moment('2016-05-31'), 'month'),
            '(May 31 plus 1 month) to May 31 should be 1 month diff'
        ).toBe(1);
    });

    test('end of month diff with time behind', () => {
        expect(
            moment('2017-03-31').diff('2017-02-28', 'months'),
            'Feb 28 to March 31 should be 1 month'
        ).toBe(1);
        expect(
            moment('2017-02-28').diff('2017-03-31', 'months'),
            'Feb 28 to March 31 should be 1 month'
        ).toBe(-1);
    });

    test('diff across DST', () => {
        var dst = dstForYear(2012),
            a,
            b;
        if (!dst) {
            expect(42, 'at least one assertion').toBe(42);
            return;
        }

        a = dst.moment;
        b = a.clone().utc().add(12, 'hours').local();
        expect(b.diff(a, 'milliseconds', true), 'ms diff across DST').toBe(
            12 * 60 * 60 * 1000
        );
        expect(b.diff(a, 'seconds', true), 'second diff across DST').toBe(
            12 * 60 * 60
        );
        expect(b.diff(a, 'minutes', true), 'minute diff across DST').toBe(
            12 * 60
        );
        expect(b.diff(a, 'hours', true), 'hour diff across DST').toBe(12);
        expect(b.diff(a, 'days', true), 'day diff across DST').toBe(
            (12 - dst.diff) / 24
        );
        expectClose(
            b.diff(a, 'weeks', true),
            (12 - dst.diff) / 24 / 7,
            'week diff across DST'
        );
        expect(
            0.95 / (2 * 31) < b.diff(a, 'months', true),
            'month diff across DST, lower bound'
        ).toBeTruthy();
        expect(
            b.diff(a, 'month', true) < 1.05 / (2 * 28),
            'month diff across DST, upper bound'
        ).toBeTruthy();
        expect(
            0.95 / (2 * 31 * 12) < b.diff(a, 'years', true),
            'year diff across DST, lower bound'
        ).toBeTruthy();
        expect(
            b.diff(a, 'year', true) < 1.05 / (2 * 28 * 12),
            'year diff across DST, upper bound'
        ).toBeTruthy();

        a = dst.moment;
        b = a
            .clone()
            .utc()
            .add(12 + dst.diff, 'hours')
            .local();

        expect(b.diff(a, 'milliseconds', true), 'ms diff across DST').toBe(
            (12 + dst.diff) * 60 * 60 * 1000
        );
        expect(b.diff(a, 'seconds', true), 'second diff across DST').toBe(
            (12 + dst.diff) * 60 * 60
        );
        expect(b.diff(a, 'minutes', true), 'minute diff across DST').toBe(
            (12 + dst.diff) * 60
        );
        expect(b.diff(a, 'hours', true), 'hour diff across DST').toBe(
            12 + dst.diff
        );
        expect(b.diff(a, 'days', true), 'day diff across DST').toBe(12 / 24);
        expectClose(
            b.diff(a, 'weeks', true),
            12 / 24 / 7,
            'week diff across DST'
        );
        expect(
            0.95 / (2 * 31) < b.diff(a, 'months', true),
            'month diff across DST, lower bound'
        ).toBeTruthy();
        expect(
            b.diff(a, 'month', true) < 1.05 / (2 * 28),
            'month diff across DST, upper bound'
        ).toBeTruthy();
        expect(
            0.95 / (2 * 31 * 12) < b.diff(a, 'years', true),
            'year diff across DST, lower bound'
        ).toBeTruthy();
        expect(
            b.diff(a, 'year', true) < 1.05 / (2 * 28 * 12),
            'year diff across DST, upper bound'
        ).toBeTruthy();
    });

    test('diff overflow', () => {
        expect(moment([2011]).diff([2010], 'months'), 'month diff').toBe(12);
        expect(moment([2010, 0, 2]).diff([2010], 'hours'), 'hour diff').toBe(
            24
        );
        expect(
            moment([2010, 0, 1, 2]).diff([2010], 'minutes'),
            'minute diff'
        ).toBe(120);
        expect(
            moment([2010, 0, 1, 0, 4]).diff([2010], 'seconds'),
            'second diff'
        ).toBe(240);
    });

    test('diff between utc and local', () => {
        if (moment([2012]).utcOffset() === moment([2011]).utcOffset()) {
            // Russia's utc offset on 1st of Jan 2012 vs 2011 is different
            expect(
                moment([2012]).utc().diff([2011], 'years'),
                'year diff'
            ).toBe(1);
        }
        expect(
            moment([2010, 2, 2]).utc().diff([2010, 0, 2], 'months'),
            'month diff'
        ).toBe(2);
        expect(
            moment([2010, 0, 4]).utc().diff([2010], 'days'),
            'day diff'
        ).toBe(3);
        expect(
            moment([2010, 0, 22]).utc().diff([2010], 'weeks'),
            'week diff'
        ).toBe(3);
        expect(
            moment([2010, 0, 1, 4]).utc().diff([2010], 'hours'),
            'hour diff'
        ).toBe(4);
        expect(
            moment([2010, 0, 1, 0, 5]).utc().diff([2010], 'minutes'),
            'minute diff'
        ).toBe(5);
        expect(
            moment([2010, 0, 1, 0, 0, 6]).utc().diff([2010], 'seconds'),
            'second diff'
        ).toBe(6);
    });

    test('diff floored', () => {
        expect(
            moment([2010, 0, 1, 23]).diff([2010], 'day'),
            '23 hours = 0 days'
        ).toBe(0);
        expect(
            moment([2010, 0, 1, 23, 59]).diff([2010], 'day'),
            '23:59 hours = 0 days'
        ).toBe(0);
        expect(
            moment([2010, 0, 1, 24]).diff([2010], 'day'),
            '24 hours = 1 day'
        ).toBe(1);
        expect(
            moment([2010, 0, 2]).diff([2011, 0, 1], 'year'),
            'year rounded down'
        ).toBe(0);
        expect(
            moment([2011, 0, 1]).diff([2010, 0, 2], 'year'),
            'year rounded down'
        ).toBe(0);
        expect(
            moment([2010, 0, 2]).diff([2011, 0, 2], 'year'),
            'year rounded down'
        ).toBe(-1);
        expect(
            moment([2011, 0, 2]).diff([2010, 0, 2], 'year'),
            'year rounded down'
        ).toBe(1);
    });

    test('year diffs include dates', () => {
        expect(
            moment([2012, 1, 19]).diff(moment([2002, 1, 20]), 'years', true) <
                10,
            'year diff should include date of month'
        ).toBeTruthy();
    });

    test('month diffs', () => {
        // due to floating point math errors, these tests just need to be accurate within 0.00000001
        expect(
            moment([2012, 0, 1]).diff([2012, 1, 1], 'months', true),
            'Jan 1 to Feb 1 should be 1 month'
        ).toBe(-1);
        expectClose(
            moment([2012, 0, 1]).diff([2012, 0, 1, 12], 'months', true),
            -0.5 / 31,
            'Jan 1 to Jan 1 noon should be 0.5 / 31 months'
        );
        expect(
            moment([2012, 0, 15]).diff([2012, 1, 15], 'months', true),
            'Jan 15 to Feb 15 should be 1 month'
        ).toBe(-1);
        expect(
            moment([2012, 0, 28]).diff([2012, 1, 28], 'months', true),
            'Jan 28 to Feb 28 should be 1 month'
        ).toBe(-1);
        expect(
            moment([2012, 0, 31]).diff([2012, 1, 29], 'months', true),
            -1
        ).toBeTruthy();
        expect(
            -1 > moment([2012, 0, 31]).diff([2012, 2, 1], 'months', true),
            'Jan 31 to Mar 1 should be more than 1 month'
        ).toBeTruthy();
        expect(
            -30 / 28 < moment([2012, 0, 31]).diff([2012, 2, 1], 'months', true),
            'Jan 31 to Mar 1 should be less than 1 month and 1 day'
        ).toBeTruthy();
        expectClose(
            moment([2012, 0, 1]).diff([2012, 0, 31], 'months', true),
            -(30 / 31),
            'Jan 1 to Jan 31 should be 30 / 31 months'
        );
        expect(
            0 < moment('2014-02-01').diff(moment('2014-01-31'), 'months', true),
            'jan-31 to feb-1 diff is positive'
        ).toBeTruthy();
    });

    test('exact month diffs', () => {
        // generate all pairs of months and compute month diff, with fixed day
        // of month = 15.

        var m1, m2;
        for (m1 = 0; m1 < 12; ++m1) {
            for (m2 = m1; m2 < 12; ++m2) {
                expect(
                    moment([2013, m2, 15]).diff(
                        moment([2013, m1, 15]),
                        'months',
                        true
                    ),
                    'month diff from 2013-' + m1 + '-15 to 2013-' + m2 + '-15'
                ).toBe(m2 - m1);
            }
        }
    });

    test('year diffs', () => {
        // due to floating point math errors, these tests just need to be accurate within 0.00000001
        expectClose(
            moment([2012, 0, 1]).diff([2013, 0, 1], 'years', true),
            -1,
            'Jan 1 2012 to Jan 1 2013 should be 1 year'
        );
        expectClose(
            moment([2012, 1, 28]).diff([2013, 1, 28], 'years', true),
            -1,
            'Feb 28 2012 to Feb 28 2013 should be 1 year'
        );
        expectClose(
            moment([2012, 2, 1]).diff([2013, 2, 1], 'years', true),
            -1,
            'Mar 1 2012 to Mar 1 2013 should be 1 year'
        );
        expectClose(
            moment([2012, 11, 1]).diff([2013, 11, 1], 'years', true),
            -1,
            'Dec 1 2012 to Dec 1 2013 should be 1 year'
        );
        expectClose(
            moment([2012, 11, 31]).diff([2013, 11, 31], 'years', true),
            -1,
            'Dec 31 2012 to Dec 31 2013 should be 1 year'
        );
        expectClose(
            moment([2012, 0, 1]).diff([2013, 6, 1], 'years', true),
            -1.5,
            'Jan 1 2012 to Jul 1 2013 should be 1.5 years'
        );
        expectClose(
            moment([2012, 0, 31]).diff([2013, 6, 31], 'years', true),
            -1.5,
            'Jan 31 2012 to Jul 31 2013 should be 1.5 years'
        );
        expectClose(
            moment([2012, 0, 1]).diff([2013, 0, 1, 12], 'years', true),
            -1 - 0.5 / 31 / 12,
            'Jan 1 2012 to Jan 1 2013 noon should be 1+(0.5 / 31) / 12 years'
        );
        expectClose(
            moment([2012, 0, 1]).diff([2013, 6, 1, 12], 'years', true),
            -1.5 - 0.5 / 31 / 12,
            'Jan 1 2012 to Jul 1 2013 noon should be 1.5+(0.5 / 31) / 12 years'
        );
        expectClose(
            moment([2012, 1, 29]).diff([2013, 1, 28], 'years', true),
            -1,
            'Feb 29 2012 to Feb 28 2013 should be 1-(1 / 28.5) / 12 years'
        );
    });

    test('negative zero', () => {
        function isNegative(n) {
            return 1 / n < 0;
        }
        expect(
            !isNegative(
                moment([2012, 0, 1]).diff(moment([2012, 0, 1]), 'months')
            ),
            'month diff on same date is zero, not -0'
        ).toBeTruthy();
        expect(
            !isNegative(
                moment([2012, 0, 1]).diff(moment([2012, 0, 1]), 'years')
            ),
            'year diff on same date is zero, not -0'
        ).toBeTruthy();
        expect(
            !isNegative(
                moment([2012, 0, 1]).diff(moment([2012, 0, 1]), 'quarters')
            ),
            'quarter diff on same date is zero, not -0'
        ).toBeTruthy();
        expect(
            !isNegative(
                moment([2012, 0, 1]).diff(moment([2012, 0, 1, 1]), 'days')
            ),
            'days diff on same date is zero, not -0'
        ).toBeTruthy();
        expect(
            !isNegative(
                moment([2012, 0, 1]).diff(moment([2012, 0, 1, 0, 1]), 'hours')
            ),
            'hour diff on same hour is zero, not -0'
        ).toBeTruthy();
        expect(
            !isNegative(
                moment([2012, 0, 1]).diff(
                    moment([2012, 0, 1, 0, 0, 1]),
                    'minutes'
                )
            ),
            'minute diff on same minute is zero, not -0'
        ).toBeTruthy();
        expect(
            !isNegative(
                moment([2012, 0, 1]).diff(
                    moment([2012, 0, 1, 0, 0, 0, 1]),
                    'seconds'
                )
            ),
            'second diff on same second is zero, not -0'
        ).toBeTruthy();
    });
});
