import { describe, expect, test } from 'vitest';
import moment from '../../src/moment';

describe('parsing flags', () => {
    function flags() {
        return moment.apply(null, arguments).parsingFlags();
    }

    test('overflow with array', () => {
        //months
        expect(flags([2010, 0]).overflow, 'month 0 valid').toBe(-1);
        expect(flags([2010, 1]).overflow, 'month 1 valid').toBe(-1);
        expect(flags([2010, -1]).overflow, 'month -1 invalid').toBe(1);
        expect(flags([2100, 12]).overflow, 'month 12 invalid').toBe(1);

        //days
        expect(flags([2010, 1, 16]).overflow, 'date valid').toBe(-1);
        expect(flags([2010, 1, -1]).overflow, 'date -1 invalid').toBe(2);
        expect(flags([2010, 1, 0]).overflow, 'date 0 invalid').toBe(2);
        expect(flags([2010, 1, 32]).overflow, 'date 32 invalid').toBe(2);
        expect(flags([2012, 1, 29]).overflow, 'date leap year valid').toBe(-1);
        expect(flags([2010, 1, 29]).overflow, 'date leap year invalid').toBe(2);

        //hours
        expect(flags([2010, 1, 1, 8]).overflow, 'hour valid').toBe(-1);
        expect(flags([2010, 1, 1, 0]).overflow, 'hour 0 valid').toBe(-1);
        expect(flags([2010, 1, 1, -1]).overflow, 'hour -1 invalid').toBe(3);
        expect(flags([2010, 1, 1, 25]).overflow, 'hour 25 invalid').toBe(3);
        expect(flags([2010, 1, 1, 24, 1]).overflow, 'hour 24:01 invalid').toBe(
            3
        );

        //minutes
        expect(flags([2010, 1, 1, 8, 15]).overflow, 'minute valid').toBe(-1);
        expect(flags([2010, 1, 1, 8, 0]).overflow, 'minute 0 valid').toBe(-1);
        expect(flags([2010, 1, 1, 8, -1]).overflow, 'minute -1 invalid').toBe(
            4
        );
        expect(flags([2010, 1, 1, 8, 60]).overflow, 'minute 60 invalid').toBe(
            4
        );

        //seconds
        expect(flags([2010, 1, 1, 8, 15, 12]).overflow, 'second valid').toBe(
            -1
        );
        expect(flags([2010, 1, 1, 8, 15, 0]).overflow, 'second 0 valid').toBe(
            -1
        );
        expect(
            flags([2010, 1, 1, 8, 15, -1]).overflow,
            'second -1 invalid'
        ).toBe(5);
        expect(
            flags([2010, 1, 1, 8, 15, 60]).overflow,
            'second 60 invalid'
        ).toBe(5);

        //milliseconds
        expect(
            flags([2010, 1, 1, 8, 15, 12, 345]).overflow,
            'millisecond valid'
        ).toBe(-1);
        expect(
            flags([2010, 1, 1, 8, 15, 12, 0]).overflow,
            'millisecond 0 valid'
        ).toBe(-1);
        expect(
            flags([2010, 1, 1, 8, 15, 12, -1]).overflow,
            'millisecond -1 invalid'
        ).toBe(6);
        expect(
            flags([2010, 1, 1, 8, 15, 12, 1000]).overflow,
            'millisecond 1000 invalid'
        ).toBe(6);

        // 24 hrs
        expect(
            flags([2010, 1, 1, 24, 0, 0, 0]).overflow,
            '24:00:00.000 is fine'
        ).toBe(-1);
        expect(
            flags([2010, 1, 1, 24, 1, 0, 0]).overflow,
            '24:01:00.000 is wrong hour'
        ).toBe(3);
        expect(
            flags([2010, 1, 1, 24, 0, 1, 0]).overflow,
            '24:00:01.000 is wrong hour'
        ).toBe(3);
        expect(
            flags([2010, 1, 1, 24, 0, 0, 1]).overflow,
            '24:00:00.001 is wrong hour'
        ).toBe(3);
    });

    test('overflow without format', () => {
        //months
        expect(flags('2001-01', 'YYYY-MM').overflow, 'month 1 valid').toBe(-1);
        expect(flags('2001-12', 'YYYY-MM').overflow, 'month 12 valid').toBe(-1);
        expect(flags('2001-13', 'YYYY-MM').overflow, 'month 13 invalid').toBe(
            1
        );

        //days
        expect(
            flags('2010-01-16', 'YYYY-MM-DD').overflow,
            'date 16 valid'
        ).toBe(-1);
        expect(
            flags('2010-01-0', 'YYYY-MM-DD').overflow,
            'date 0 invalid'
        ).toBe(2);
        expect(
            flags('2010-01-32', 'YYYY-MM-DD').overflow,
            'date 32 invalid'
        ).toBe(2);
        expect(
            flags('2012-02-29', 'YYYY-MM-DD').overflow,
            'date leap year valid'
        ).toBe(-1);
        expect(
            flags('2010-02-29', 'YYYY-MM-DD').overflow,
            'date leap year invalid'
        ).toBe(2);

        //days of the year
        expect(
            flags('2010 300', 'YYYY DDDD').overflow,
            'day 300 of year valid'
        ).toBe(-1);
        expect(
            flags('2010 365', 'YYYY DDDD').overflow,
            'day 365 of year valid'
        ).toBe(-1);
        expect(
            flags('2010 366', 'YYYY DDDD').overflow,
            'day 366 of year invalid'
        ).toBe(2);
        expect(
            flags('2012 366', 'YYYY DDDD').overflow,
            'day 366 of leap year valid'
        ).toBe(-1);
        expect(
            flags('2012 367', 'YYYY DDDD').overflow,
            'day 367 of leap year invalid'
        ).toBe(2);

        //hours
        expect(flags('08', 'HH').overflow, 'hour valid').toBe(-1);
        expect(flags('00', 'HH').overflow, 'hour 0 valid').toBe(-1);
        expect(flags('25', 'HH').overflow, 'hour 25 invalid').toBe(3);
        expect(flags('24:01', 'HH:mm').overflow, 'hour 24:01 invalid').toBe(3);

        //minutes
        expect(flags('08:15', 'HH:mm').overflow, 'minute valid').toBe(-1);
        expect(flags('08:00', 'HH:mm').overflow, 'minute 0 valid').toBe(-1);
        expect(flags('08:60', 'HH:mm').overflow, 'minute 60 invalid').toBe(4);

        //seconds
        expect(flags('08:15:12', 'HH:mm:ss').overflow, 'second valid').toBe(-1);
        expect(flags('08:15:00', 'HH:mm:ss').overflow, 'second 0 valid').toBe(
            -1
        );
        expect(
            flags('08:15:60', 'HH:mm:ss').overflow,
            'second 60 invalid'
        ).toBe(5);

        //milliseconds
        expect(
            flags('08:15:12:345', 'HH:mm:ss:SSSS').overflow,
            'millisecond valid'
        ).toBe(-1);
        expect(
            flags('08:15:12:000', 'HH:mm:ss:SSSS').overflow,
            'millisecond 0 valid'
        ).toBe(-1);

        //this is OK because we don't match the last digit, so it's 100 ms
        expect(
            flags('08:15:12:1000', 'HH:mm:ss:SSSS').overflow,
            'millisecond 1000 actually valid'
        ).toBe(-1);
    });

    test('extra tokens', () => {
        expect(
            flags('1982-05-25', 'YYYY-MM-DD').unusedTokens,
            'nothing extra'
        ).toEqual([]);
        expect(
            flags('1982-05', 'YYYY-MM-DD').unusedTokens,
            'extra formatting token'
        ).toEqual(['DD']);
        expect(
            flags('1982', 'YYYY-MM-DD').unusedTokens,
            'multiple extra formatting tokens'
        ).toEqual(['MM', 'DD']);
        expect(
            flags('1982-05', 'YYYY-MM-').unusedTokens,
            'extra non-formatting token'
        ).toEqual([]);
        expect(
            flags('1982-05-', 'YYYY-MM-DD').unusedTokens,
            'non-extra non-formatting token'
        ).toEqual(['DD']);
        expect(
            flags('1982 05 1982', 'YYYY-MM-DD').unusedTokens,
            'different non-formatting token'
        ).toEqual([]);
    });

    test('extra tokens strict', () => {
        expect(
            flags('1982-05-25', 'YYYY-MM-DD', true).unusedTokens,
            'nothing extra'
        ).toEqual([]);
        expect(
            flags('1982-05', 'YYYY-MM-DD', true).unusedTokens,
            'extra formatting token'
        ).toEqual(['-', 'DD']);
        expect(
            flags('1982', 'YYYY-MM-DD', true).unusedTokens,
            'multiple extra formatting tokens'
        ).toEqual(['-', 'MM', '-', 'DD']);
        expect(
            flags('1982-05', 'YYYY-MM-', true).unusedTokens,
            'extra non-formatting token'
        ).toEqual(['-']);
        expect(
            flags('1982-05-', 'YYYY-MM-DD', true).unusedTokens,
            'non-extra non-formatting token'
        ).toEqual(['DD']);
        expect(
            flags('1982 05 1982', 'YYYY-MM-DD', true).unusedTokens,
            'different non-formatting token'
        ).toEqual(['-', '-']);
    });

    test('unused input', () => {
        expect(
            flags('1982-05-25', 'YYYY-MM-DD').unusedInput,
            'normal input'
        ).toEqual([]);
        expect(
            flags('1982-05-25 this is more stuff', 'YYYY-MM-DD').unusedInput,
            'trailing nonsense'
        ).toEqual([' this is more stuff']);
        expect(flags('1982-05-25 09:30', 'YYYY-MM-DD').unusedInput, [
            'trailing legit-looking input',
        ]).toEqual([' 09:30']);
        expect(
            flags('1982-05-25 some junk', 'YYYY-MM-DD [some junk]').unusedInput,
            'junk that actually gets matched'
        ).toEqual([]);
        expect(
            flags('stuff at beginning 1982-05-25', 'YYYY-MM-DD').unusedInput,
            'leading junk'
        ).toEqual(['stuff at beginning ']);
        expect(
            flags('junk 1982 more junk 05 yet more junk25', 'YYYY-MM-DD')
                .unusedInput,
            'interstitial junk'
        ).toEqual(['junk ', ' more junk ', ' yet more junk']);
    });

    test('unused input strict', () => {
        expect(
            flags('1982-05-25', 'YYYY-MM-DD', true).unusedInput,
            'normal input'
        ).toEqual([]);
        expect(
            flags('1982-05-25 this is more stuff', 'YYYY-MM-DD', true)
                .unusedInput,
            'trailing nonsense'
        ).toEqual([' this is more stuff']);
        expect(flags('1982-05-25 09:30', 'YYYY-MM-DD', true).unusedInput, [
            'trailing legit-looking input',
        ]).toEqual([' 09:30']);
        expect(
            flags('1982-05-25 some junk', 'YYYY-MM-DD [some junk]', true)
                .unusedInput,
            'junk that actually gets matched'
        ).toEqual([]);
        expect(
            flags('stuff at beginning 1982-05-25', 'YYYY-MM-DD', true)
                .unusedInput,
            'leading junk'
        ).toEqual(['stuff at beginning ']);
        expect(
            flags('junk 1982 more junk 05 yet more junk25', 'YYYY-MM-DD', true)
                .unusedInput,
            'interstitial junk'
        ).toEqual(['junk ', ' more junk ', ' yet more junk']);
    });

    test('chars left over', () => {
        expect(
            flags('1982-05-25', 'YYYY-MM-DD').charsLeftOver,
            'normal input'
        ).toBe(0);
        expect(
            flags('1982-05-25 this is more stuff', 'YYYY-MM-DD').charsLeftOver,
            'trailing nonsense'
        ).toBe(' this is more stuff'.length);
        expect(
            flags('1982-05-25 09:30', 'YYYY-MM-DD').charsLeftOver,
            'trailing legit-looking input'
        ).toBe(' 09:30'.length);
        expect(
            flags('stuff at beginning 1982-05-25', 'YYYY-MM-DD').charsLeftOver,
            'leading junk'
        ).toBe('stuff at beginning '.length);
        expect(
            flags('1982 junk 05 more junk25', 'YYYY-MM-DD').charsLeftOver,
            'interstitial junk'
        ).toBe([' junk ', ' more junk'].join('').length);
        expect(
            flags('stuff at beginning 1982 junk 05 more junk25', 'YYYY-MM-DD')
                .charsLeftOver,
            'leading and interstitial junk'
        ).toBe(['stuff at beginning ', ' junk ', ' more junk'].join('').length);
    });

    test('empty', () => {
        expect(flags('1982-05-25', 'YYYY-MM-DD').empty, 'normal input').toBe(
            false
        );
        expect(flags('nothing here', 'YYYY-MM-DD').empty, 'pure garbage').toBe(
            true
        );
        expect(
            flags('junk but has the number 2000 in it', 'YYYY-MM-DD').empty,
            'only mostly garbage'
        ).toBe(false);
        expect(flags('', 'YYYY-MM-DD').empty, 'empty string').toBe(true);
        expect(flags('', 'YYYY-MM-DD').empty, 'blank string').toBe(true);
    });

    test('null', () => {
        expect(
            flags('1982-05-25', 'YYYY-MM-DD').nullInput,
            'normal input'
        ).toBe(false);
        expect(flags(null).nullInput, 'just null').toBe(true);
        expect(flags(null, 'YYYY-MM-DD').nullInput, 'null with format').toBe(
            true
        );
    });

    test('invalid month', () => {
        expect(
            flags('1982 May', 'YYYY MMMM').invalidMonth,
            'normal input'
        ).toBe(null);
        expect(
            flags('1982 Laser', 'YYYY MMMM').invalidMonth,
            'bad month name'
        ).toBe('Laser');
    });

    test('empty format array', () => {
        expect(
            flags('1982 May', ['YYYY MMM']).invalidFormat,
            'empty format array'
        ).toBe(false);
        expect(flags('1982 May', []).invalidFormat, 'empty format array').toBe(
            true
        );
    });

    test('weekday mismatch', () => {
        // string with format
        expect(
            flags('Wed 08-10-2017', 'ddd MM-DD-YYYY').weekdayMismatch,
            'day of week does not match date'
        ).toBe(true);
        expect(
            flags('Thu 08-10-2017', 'ddd MM-DD-YYYY').weekdayMismatch,
            'day of week matches date'
        ).toBe(false);
    });
});
