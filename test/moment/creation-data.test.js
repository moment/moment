import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('creation data', () => {
    test('valid date', () => {
        var dat = moment('1992-10-22'),
            orig = dat.creationData();

        expect(dat.isValid(), '1992-10-22 is valid').toBe(true);
        expect(orig.input, 'original input is not correct.').toBe('1992-10-22');
        expect(orig.format, 'original format is defined.').toBe('YYYY-MM-DD');
        expect(orig.locale._abbr, 'default locale is en').toBe('en');
        expect(orig.isUTC, 'not a UTC date').toBe(false);
    });

    test('valid date at fr locale', () => {
        var dat = moment('1992-10-22', 'YYYY-MM-DD', 'fr'),
            orig = dat.creationData();

        expect(orig.locale._abbr, 'locale is fr').toBe('fr');
    });

    test('valid date with formats', () => {
        var dat = moment('29-06-1995', ['MM-DD-YYYY', 'DD-MM', 'DD-MM-YYYY']),
            orig = dat.creationData();

        expect(orig.format, 'DD-MM-YYYY format is defined.').toBe('DD-MM-YYYY');
    });

    test('strict', () => {
        expect(
            moment('2015-01-02', 'YYYY-MM-DD', true).creationData().strict,
            'strict is true'
        ).toBeTruthy();
        expect(
            !moment('2015-01-02', 'YYYY-MM-DD').creationData().strict,
            'strict is false'
        ).toBeTruthy();
    });
});
