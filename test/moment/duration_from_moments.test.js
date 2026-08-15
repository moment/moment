import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('duration from moments', () => {
    test('pure year diff', () => {
        var m1 = moment('2012-01-01T00:00:00.000Z'),
            m2 = moment('2013-01-01T00:00:00.000Z');

        expect(
            moment.duration({ from: m1, to: m2 }).as('years'),
            'year moment difference'
        ).toBe(1);
        expect(
            moment.duration({ from: m2, to: m1 }).as('years'),
            'negative year moment difference'
        ).toBe(-1);
    });

    test('month and day diff', () => {
        var m1 = moment('2012-01-15T00:00:00.000Z'),
            m2 = moment('2012-02-17T00:00:00.000Z'),
            d = moment.duration({ from: m1, to: m2 });

        expect(d.get('days')).toBe(2);
        expect(d.get('months')).toBe(1);
    });

    test('day diff, separate months', () => {
        var m1 = moment('2012-01-15T00:00:00.000Z'),
            m2 = moment('2012-02-13T00:00:00.000Z'),
            d = moment.duration({ from: m1, to: m2 });

        expect(d.as('days')).toBe(29);
    });

    test('hour diff', () => {
        var m1 = moment('2012-01-15T17:00:00.000Z'),
            m2 = moment('2012-01-16T03:00:00.000Z'),
            d = moment.duration({ from: m1, to: m2 });

        expect(d.as('hours')).toBe(10);
    });

    test('minute diff', () => {
        var m1 = moment('2012-01-15T17:45:00.000Z'),
            m2 = moment('2012-01-16T03:15:00.000Z'),
            d = moment.duration({ from: m1, to: m2 });

        expect(d.as('hours')).toBe(9.5);
    });
});
