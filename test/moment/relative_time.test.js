import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('relative time', () => {
    test('default thresholds fromNow', () => {
        var a = moment();

        // Seconds to minutes threshold
        a.subtract(44, 'seconds');
        expect(a.fromNow(), 'Below default seconds to minutes threshold').toBe(
            'a few seconds ago'
        );
        a.subtract(1, 'seconds');
        expect(a.fromNow(), 'Above default seconds to minutes threshold').toBe(
            'a minute ago'
        );

        // Minutes to hours threshold
        a = moment();
        a.subtract(44, 'minutes');
        expect(a.fromNow(), 'Below default minute to hour threshold').toBe(
            '44 minutes ago'
        );
        a.subtract(1, 'minutes');
        expect(a.fromNow(), 'Above default minute to hour threshold').toBe(
            'an hour ago'
        );

        // Hours to days threshold
        a = moment();
        a.subtract(21, 'hours');
        expect(a.fromNow(), 'Below default hours to day threshold').toBe(
            '21 hours ago'
        );
        a.subtract(1, 'hours');
        expect(a.fromNow(), 'Above default hours to day threshold').toBe(
            'a day ago'
        );

        // Days to month threshold
        a = moment();
        a.subtract(25, 'days');
        expect(
            a.fromNow(),
            'Below default days to month (singular) threshold'
        ).toBe('25 days ago');
        a.subtract(1, 'days');
        expect(
            a.fromNow(),
            'Above default days to month (singular) threshold'
        ).toBe('a month ago');

        // months to year threshold
        a = moment();
        a.subtract(10, 'months');
        expect(a.fromNow(), 'Below default days to years threshold').toBe(
            '10 months ago'
        );
        a.subtract(1, 'month');
        expect(a.fromNow(), 'Above default days to years threshold').toBe(
            'a year ago'
        );
    });

    test('default thresholds toNow', () => {
        var a = moment();

        // Seconds to minutes threshold
        a.subtract(44, 'seconds');
        expect(a.toNow(), 'Below default seconds to minutes threshold').toBe(
            'in a few seconds'
        );
        a.subtract(1, 'seconds');
        expect(a.toNow(), 'Above default seconds to minutes threshold').toBe(
            'in a minute'
        );

        // Minutes to hours threshold
        a = moment();
        a.subtract(44, 'minutes');
        expect(a.toNow(), 'Below default minute to hour threshold').toBe(
            'in 44 minutes'
        );
        a.subtract(1, 'minutes');
        expect(a.toNow(), 'Above default minute to hour threshold').toBe(
            'in an hour'
        );

        // Hours to days threshold
        a = moment();
        a.subtract(21, 'hours');
        expect(a.toNow(), 'Below default hours to day threshold').toBe(
            'in 21 hours'
        );
        a.subtract(1, 'hours');
        expect(a.toNow(), 'Above default hours to day threshold').toBe(
            'in a day'
        );

        // Days to month threshold
        a = moment();
        a.subtract(25, 'days');
        expect(
            a.toNow(),
            'Below default days to month (singular) threshold'
        ).toBe('in 25 days');
        a.subtract(1, 'days');
        expect(
            a.toNow(),
            'Above default days to month (singular) threshold'
        ).toBe('in a month');

        // months to year threshold
        a = moment();
        a.subtract(10, 'months');
        expect(a.toNow(), 'Below default days to years threshold').toBe(
            'in 10 months'
        );
        a.subtract(1, 'month');
        expect(a.toNow(), 'Above default days to years threshold').toBe(
            'in a year'
        );
    });

    test('custom thresholds', () => {
        var a, dd;

        // including weeks
        moment.relativeTimeThreshold('w', 4);
        dd = moment.relativeTimeThreshold('d');
        moment.relativeTimeThreshold('d', 7);
        // threshold for days to weeks with including weeks
        a = moment();
        a.subtract(6, 'days');
        expect(a.fromNow(), 'Below threshold days for weeks').toBe(
            '6 days ago'
        );
        a.subtract(1, 'days');
        expect(a.fromNow(), 'Above threshold days for weeks').toBe(
            'a week ago'
        );

        // threshold for days to weeks with including weeks
        a = moment();
        a.subtract(3, 'weeks');
        expect(a.fromNow(), 'Below threshold weeks for months').toBe(
            '3 weeks ago'
        );
        a.subtract(1, 'week');
        expect(a.fromNow(), 'Above threshold weeks for months').toBe(
            'a month ago'
        );
        // moment.relativeTimeIncludeWeeks(false);
        moment.relativeTimeThreshold('w', null);
        moment.relativeTimeThreshold('d', dd);
        // Seconds to minute threshold, under 30
        moment.relativeTimeThreshold('s', 25);

        a = moment();
        a.subtract(24, 'seconds');
        expect(
            a.fromNow(),
            'Below custom seconds to minute threshold, s < 30'
        ).toBe('a few seconds ago');
        a.subtract(1, 'seconds');
        expect(
            a.fromNow(),
            'Above custom seconds to minute threshold, s < 30'
        ).toBe('a minute ago');

        // Seconds to minutes threshold
        moment.relativeTimeThreshold('s', 55);

        a = moment();
        a.subtract(54, 'seconds');
        expect(a.fromNow(), 'Below custom seconds to minutes threshold').toBe(
            'a few seconds ago'
        );
        a.subtract(1, 'seconds');
        expect(a.fromNow(), 'Above custom seconds to minutes threshold').toBe(
            'a minute ago'
        );

        moment.relativeTimeThreshold('s', 45);

        // A few seconds to seconds threshold
        moment.relativeTimeThreshold('ss', 3);

        a = moment();
        a.subtract(3, 'seconds');
        expect(
            a.fromNow(),
            'Below custom a few seconds to seconds threshold'
        ).toBe('a few seconds ago');
        a.subtract(1, 'seconds');
        expect(
            a.fromNow(),
            'Above custom a few seconds to seconds threshold'
        ).toBe('4 seconds ago');

        moment.relativeTimeThreshold('ss', 44);

        // Minutes to hours threshold
        moment.relativeTimeThreshold('m', 55);
        a = moment();
        a.subtract(54, 'minutes');
        expect(a.fromNow(), 'Below custom minutes to hours threshold').toBe(
            '54 minutes ago'
        );
        a.subtract(1, 'minutes');
        expect(a.fromNow(), 'Above custom minutes to hours threshold').toBe(
            'an hour ago'
        );
        moment.relativeTimeThreshold('m', 45);

        // Hours to days threshold
        moment.relativeTimeThreshold('h', 24);
        a = moment();
        a.subtract(23, 'hours');
        expect(a.fromNow(), 'Below custom hours to days threshold').toBe(
            '23 hours ago'
        );
        a.subtract(1, 'hours');
        expect(a.fromNow(), 'Above custom hours to days threshold').toBe(
            'a day ago'
        );
        moment.relativeTimeThreshold('h', 22);

        // Days to month threshold
        moment.relativeTimeThreshold('d', 28);
        a = moment();
        a.subtract(27, 'days');
        expect(
            a.fromNow(),
            'Below custom days to month (singular) threshold'
        ).toBe('27 days ago');
        a.subtract(1, 'days');
        expect(
            a.fromNow(),
            'Above custom days to month (singular) threshold'
        ).toBe('a month ago');
        moment.relativeTimeThreshold('d', 26);

        // months to years threshold
        moment.relativeTimeThreshold('M', 9);
        a = moment();
        a.subtract(8, 'months');
        expect(a.fromNow(), 'Below custom days to years threshold').toBe(
            '8 months ago'
        );
        a.subtract(1, 'months');
        expect(a.fromNow(), 'Above custom days to years threshold').toBe(
            'a year ago'
        );
        moment.relativeTimeThreshold('M', 11);

        // multiple thresholds
        moment.relativeTimeThreshold('ss', 3);
        a = moment();
        a.subtract(4, 'seconds');
        expect(a.fromNow(), 'Before setting s relative time threshold').toBe(
            '4 seconds ago'
        );
        moment.relativeTimeThreshold('s', 59);
        expect(a.fromNow(), 'After setting s relative time threshold').toBe(
            'a few seconds ago'
        );
        moment.relativeTimeThreshold('ss', 44);
        moment.relativeTimeThreshold('s', 45);
    });

    test('custom rounding', () => {
        var roundingDefault = moment.relativeTimeRounding(),
            a,
            retainValue;

        // Round relative time evaluation down
        moment.relativeTimeRounding(Math.floor);

        moment.relativeTimeThreshold('s', 60);
        moment.relativeTimeThreshold('m', 60);
        moment.relativeTimeThreshold('h', 24);
        moment.relativeTimeThreshold('d', 27);
        moment.relativeTimeThreshold('M', 12);

        a = moment.utc();
        a.subtract({ minutes: 59, seconds: 59 });
        expect(a.toNow(), 'Round down towards the nearest minute').toBe(
            'in 59 minutes'
        );

        a = moment.utc();
        a.subtract({ hours: 23, minutes: 59, seconds: 59 });
        expect(a.toNow(), 'Round down towards the nearest hour').toBe(
            'in 23 hours'
        );

        a = moment.utc();
        a.subtract({ days: 26, hours: 23, minutes: 59 });
        expect(
            a.toNow(),
            'Round down towards the nearest day (just under)'
        ).toBe('in 26 days');

        a = moment.utc();
        a.subtract({ days: 27 });
        expect(
            a.toNow(),
            'Round down towards the nearest day (just over)'
        ).toBe('in a month');

        a = moment.utc();
        a.subtract({ days: 364 });
        expect(a.toNow(), 'Round down towards the nearest month').toBe(
            'in 11 months'
        );

        a = moment.utc();
        a.subtract({ years: 1, days: 364 });
        expect(a.toNow(), 'Round down towards the nearest year').toBe(
            'in a year'
        );

        // Do not round relative time evaluation
        retainValue = function (value) {
            return value.toFixed(3);
        };
        moment.relativeTimeRounding(retainValue);

        a = moment.utc();
        a.subtract({ hours: 39 });
        expect(a.toNow(), 'Round down towards the nearest year').toBe(
            'in 1.625 days'
        );

        // Restore defaults
        moment.relativeTimeThreshold('s', 45);
        moment.relativeTimeThreshold('m', 45);
        moment.relativeTimeThreshold('h', 22);
        moment.relativeTimeThreshold('d', 26);
        moment.relativeTimeThreshold('M', 11);
        moment.relativeTimeRounding(roundingDefault);
    });

    test('retrieve rounding settings', () => {
        moment.relativeTimeRounding(Math.round);
        var roundingFunction = moment.relativeTimeRounding();

        expect(roundingFunction, 'Can retrieve rounding setting').toBe(
            Math.round
        );
    });

    test('retrieve threshold settings', () => {
        moment.relativeTimeThreshold('m', 45);
        var minuteThreshold = moment.relativeTimeThreshold('m');

        expect(minuteThreshold, 'Can retrieve minute setting').toBe(45);
    });
});
