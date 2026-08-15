import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('from_to', () => {
    test('from', () => {
        var start = moment();
        moment.locale('en');
        expect(
            start.from(start.clone().add(5, 'seconds')),
            '5 seconds = a few seconds ago'
        ).toBe('a few seconds ago');
        expect(
            start.from(start.clone().add(1, 'minute')),
            '1 minute = a minute ago'
        ).toBe('a minute ago');
        expect(
            start.from(start.clone().add(5, 'minutes')),
            '5 minutes = 5 minutes ago'
        ).toBe('5 minutes ago');

        expect(
            start.from(start.clone().subtract(5, 'seconds')),
            '5 seconds = in a few seconds'
        ).toBe('in a few seconds');
        expect(
            start.from(start.clone().subtract(1, 'minute')),
            '1 minute = in a minute'
        ).toBe('in a minute');
        expect(
            start.from(start.clone().subtract(5, 'minutes')),
            '5 minutes = in 5 minutes'
        ).toBe('in 5 minutes');
    });

    test('from with absolute duration', () => {
        var start = moment();
        moment.locale('en');
        expect(
            start.from(start.clone().add(5, 'seconds'), true),
            '5 seconds = a few seconds'
        ).toBe('a few seconds');
        expect(
            start.from(start.clone().add(1, 'minute'), true),
            '1 minute = a minute'
        ).toBe('a minute');
        expect(
            start.from(start.clone().add(5, 'minutes'), true),
            '5 minutes = 5 minutes'
        ).toBe('5 minutes');

        expect(
            start.from(start.clone().subtract(5, 'seconds'), true),
            '5 seconds = a few seconds'
        ).toBe('a few seconds');
        expect(
            start.from(start.clone().subtract(1, 'minute'), true),
            '1 minute = a minute'
        ).toBe('a minute');
        expect(
            start.from(start.clone().subtract(5, 'minutes'), true),
            '5 minutes = 5 minutes'
        ).toBe('5 minutes');
    });

    test('to', () => {
        var start = moment();
        moment.locale('en');
        expect(
            start.to(start.clone().subtract(5, 'seconds')),
            '5 seconds = a few seconds ago'
        ).toBe('a few seconds ago');
        expect(
            start.to(start.clone().subtract(1, 'minute')),
            '1 minute = a minute ago'
        ).toBe('a minute ago');
        expect(
            start.to(start.clone().subtract(5, 'minutes')),
            '5 minutes = 5 minutes ago'
        ).toBe('5 minutes ago');

        expect(
            start.to(start.clone().add(5, 'seconds')),
            '5 seconds = in a few seconds'
        ).toBe('in a few seconds');
        expect(
            start.to(start.clone().add(1, 'minute')),
            '1 minute = in a minute'
        ).toBe('in a minute');
        expect(
            start.to(start.clone().add(5, 'minutes')),
            '5 minutes = in 5 minutes'
        ).toBe('in 5 minutes');
    });

    test('to with absolute duration', () => {
        var start = moment();
        moment.locale('en');
        expect(
            start.to(start.clone().add(5, 'seconds'), true),
            '5 seconds = a few seconds'
        ).toBe('a few seconds');
        expect(
            start.to(start.clone().add(1, 'minute'), true),
            '1 minute = a minute'
        ).toBe('a minute');
        expect(
            start.to(start.clone().add(5, 'minutes'), true),
            '5 minutes = 5 minutes'
        ).toBe('5 minutes');

        expect(
            start.to(start.clone().subtract(5, 'seconds'), true),
            '5 seconds = a few seconds'
        ).toBe('a few seconds');
        expect(
            start.to(start.clone().subtract(1, 'minute'), true),
            '1 minute = a minute'
        ).toBe('a minute');
        expect(
            start.to(start.clone().subtract(5, 'minutes'), true),
            '5 minutes = 5 minutes'
        ).toBe('5 minutes');
    });
});
