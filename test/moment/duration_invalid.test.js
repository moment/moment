import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('invalid', () => {
    test('invalid duration', () => {
        var m = moment.duration.invalid(); // should be invalid
        expect(m.isValid()).toBe(false);
        expect(isNaN(m.valueOf())).toBeTruthy();
    });

    test('valid duration', () => {
        var m = moment.duration({ d: null }); // should be valid, for now
        expect(m.isValid()).toBe(true);
        expect(m.valueOf()).toBe(0);
    });

    test('invalid duration - clone of invalid duration', () => {
        var m = moment.duration.invalid().clone(); // should be invalid
        expect(m.isValid()).toBe(false);
        expect(isNaN(m.valueOf())).toBeTruthy();
    });

    test('valid duration - clone of valid duration', () => {
        var m = moment.duration({ d: null }).clone(); // should be valid, for now
        expect(m.isValid()).toBe(true);
        expect(m.valueOf()).toBe(0);
    });

    test('invalid duration - wrapper of invalid duration', () => {
        var m = moment.duration(moment.duration.invalid()); // should be invalid
        expect(m.isValid()).toBe(false);
        expect(isNaN(m.valueOf())).toBeTruthy();
    });

    test('valid duration - wrapper of valid duration', () => {
        var m = moment.duration(moment.duration({ d: null })); // should be valid, for now
        expect(m.isValid()).toBe(true);
        expect(m.valueOf()).toBe(0);
    });

    test('invalid duration - only smallest unit can have decimal', () => {
        var m = moment.duration({ days: 3.5, hours: 1.1 }); // should be invalid
        expect(m.isValid()).toBe(false);
        expect(isNaN(m.valueOf())).toBeTruthy(); // .valueOf() returns NaN for invalid durations
    });

    test('valid duration - smallest unit can have decimal', () => {
        var m = moment.duration({ days: 3, hours: 1.1 }); // should be valid
        expect(m.isValid()).toBe(true);
        expect(m.asHours()).toBe(73.1);
    });

    test('invalid duration with two arguments', () => {
        var m = moment.duration(NaN, 'days');
        expect(m.isValid()).toBe(false);
        expect(isNaN(m.valueOf())).toBeTruthy();
    });

    test('invalid duration operations', () => {
        var invalids = [
                moment.duration(NaN),
                moment.duration(NaN, 'days'),
                moment.duration.invalid(),
            ],
            i,
            invalid;

        for (i = 0; i < invalids.length; ++i) {
            invalid = invalids[i];

            expect(
                !invalid.add(5, 'hours').isValid(),
                'invalid.add is invalid; i=' + i
            ).toBeTruthy();
            expect(
                !invalid.subtract(30, 'days').isValid(),
                'invalid.subtract is invalid; i=' + i
            ).toBeTruthy();
            expect(
                !invalid.abs().isValid(),
                'invalid.abs is invalid; i=' + i
            ).toBeTruthy();
            expect(
                isNaN(invalid.as('years')),
                'invalid.as is NaN; i=' + i
            ).toBeTruthy();
            expect(
                isNaN(invalid.asMilliseconds()),
                'invalid.asMilliseconds is NaN; i=' + i
            ).toBeTruthy();
            expect(
                isNaN(invalid.asSeconds()),
                'invalid.asSeconds is NaN; i=' + i
            ).toBeTruthy();
            expect(
                isNaN(invalid.asMinutes()),
                'invalid.asMinutes is NaN; i=' + i
            ).toBeTruthy();
            expect(
                isNaN(invalid.asHours()),
                'invalid.asHours is NaN; i=' + i
            ).toBeTruthy();
            expect(
                isNaN(invalid.asDays()),
                'invalid.asDays is NaN; i=' + i
            ).toBeTruthy();
            expect(
                isNaN(invalid.asWeeks()),
                'invalid.asWeeks is NaN; i=' + i
            ).toBeTruthy();
            expect(
                isNaN(invalid.asMonths()),
                'invalid.asMonths is NaN; i=' + i
            ).toBeTruthy();
            expect(
                isNaN(invalid.asQuarters()),
                'invalid.asQuarters is NaN; i=' + i
            ).toBeTruthy();
            expect(
                isNaN(invalid.asYears()),
                'invalid.asYears is NaN; i=' + i
            ).toBeTruthy();
            expect(
                isNaN(invalid.valueOf()),
                'invalid.valueOf is NaN; i=' + i
            ).toBeTruthy();
            expect(
                isNaN(invalid.get('hours')),
                'invalid.get is NaN; i=' + i
            ).toBeTruthy();

            expect(
                isNaN(invalid.milliseconds()),
                'invalid.milliseconds is NaN; i=' + i
            ).toBeTruthy();
            expect(
                isNaN(invalid.seconds()),
                'invalid.seconds is NaN; i=' + i
            ).toBeTruthy();
            expect(
                isNaN(invalid.minutes()),
                'invalid.minutes is NaN; i=' + i
            ).toBeTruthy();
            expect(
                isNaN(invalid.hours()),
                'invalid.hours is NaN; i=' + i
            ).toBeTruthy();
            expect(
                isNaN(invalid.days()),
                'invalid.days is NaN; i=' + i
            ).toBeTruthy();
            expect(
                isNaN(invalid.weeks()),
                'invalid.weeks is NaN; i=' + i
            ).toBeTruthy();
            expect(
                isNaN(invalid.months()),
                'invalid.months is NaN; i=' + i
            ).toBeTruthy();
            expect(
                isNaN(invalid.years()),
                'invalid.years is NaN; i=' + i
            ).toBeTruthy();

            expect(
                invalid.humanize(),
                'invalid.humanize is localized invalid duration string; i=' + i
            ).toBe(invalid.localeData().invalidDate());
            expect(
                invalid.toISOString(),
                'invalid.toISOString is localized invalid duration string; i=' +
                    i
            ).toBe(invalid.localeData().invalidDate());
            expect(
                invalid.toString(),
                'invalid.toString is localized invalid duration string; i=' + i
            ).toBe(invalid.localeData().invalidDate());
            expect(invalid.toJSON(), 'invalid.toJSON is null; i=' + i).toBe(
                invalid.localeData().invalidDate()
            );
            expect(invalid.locale(), 'invalid.locale; i=' + i).toBe('en');
            expect(
                invalid.localeData()._abbr,
                'invalid.localeData()._abbr; i=' + i
            ).toBe('en');
        }
    });
});
