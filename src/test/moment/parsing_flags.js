import { module, test } from '../qunit';
import moment from '../../moment';

module('parsing flags');

function flags() {
    return moment.apply(null, arguments).parsingFlags();
}

test('overflow with array', function (assert) {
    //months
    assert.equal(flags([2010, 0]).overflow, -1, 'month 0 valid');
    assert.equal(flags([2010, 1]).overflow, -1, 'month 1 valid');
    assert.equal(flags([2010, -1]).overflow, 1, 'month -1 invalid');
    assert.equal(flags([2100, 12]).overflow, 1, 'month 12 invalid');

    //days
    assert.equal(flags([2010, 1, 16]).overflow, -1, 'date valid');
    assert.equal(flags([2010, 1, -1]).overflow, 2, 'date -1 invalid');
    assert.equal(flags([2010, 1, 0]).overflow, 2, 'date 0 invalid');
    assert.equal(flags([2010, 1, 32]).overflow, 2, 'date 32 invalid');
    assert.equal(flags([2012, 1, 29]).overflow, -1, 'date leap year valid');
    assert.equal(flags([2010, 1, 29]).overflow, 2, 'date leap year invalid');

    //hours
    assert.equal(flags([2010, 1, 1, 8]).overflow, -1, 'hour valid');
    assert.equal(flags([2010, 1, 1, 0]).overflow, -1, 'hour 0 valid');
    assert.equal(flags([2010, 1, 1, -1]).overflow, 3, 'hour -1 invalid');
    assert.equal(flags([2010, 1, 1, 25]).overflow, 3, 'hour 25 invalid');
    assert.equal(flags([2010, 1, 1, 24, 1]).overflow, 3, 'hour 24:01 invalid');

    //minutes
    assert.equal(flags([2010, 1, 1, 8, 15]).overflow, -1, 'minute valid');
    assert.equal(flags([2010, 1, 1, 8, 0]).overflow, -1, 'minute 0 valid');
    assert.equal(flags([2010, 1, 1, 8, -1]).overflow, 4, 'minute -1 invalid');
    assert.equal(flags([2010, 1, 1, 8, 60]).overflow, 4, 'minute 60 invalid');

    //seconds
    assert.equal(flags([2010, 1, 1, 8, 15, 12]).overflow, -1, 'second valid');
    assert.equal(flags([2010, 1, 1, 8, 15, 0]).overflow, -1, 'second 0 valid');
    assert.equal(
        flags([2010, 1, 1, 8, 15, -1]).overflow,
        5,
        'second -1 invalid'
    );
    assert.equal(
        flags([2010, 1, 1, 8, 15, 60]).overflow,
        5,
        'second 60 invalid'
    );

    //milliseconds
    assert.equal(
        flags([2010, 1, 1, 8, 15, 12, 345]).overflow,
        -1,
        'millisecond valid'
    );
    assert.equal(
        flags([2010, 1, 1, 8, 15, 12, 0]).overflow,
        -1,
        'millisecond 0 valid'
    );
    assert.equal(
        flags([2010, 1, 1, 8, 15, 12, -1]).overflow,
        6,
        'millisecond -1 invalid'
    );
    assert.equal(
        flags([2010, 1, 1, 8, 15, 12, 1000]).overflow,
        6,
        'millisecond 1000 invalid'
    );

    // 24 hrs
    assert.equal(
        flags([2010, 1, 1, 24, 0, 0, 0]).overflow,
        -1,
        '24:00:00.000 is fine'
    );
    assert.equal(
        flags([2010, 1, 1, 24, 1, 0, 0]).overflow,
        3,
        '24:01:00.000 is wrong hour'
    );
    assert.equal(
        flags([2010, 1, 1, 24, 0, 1, 0]).overflow,
        3,
        '24:00:01.000 is wrong hour'
    );
    assert.equal(
        flags([2010, 1, 1, 24, 0, 0, 1]).overflow,
        3,
        '24:00:00.001 is wrong hour'
    );
});

test('overflow without format', function (assert) {
    //months
    assert.equal(flags('2001-01', 'YYYY-MM').overflow, -1, 'month 1 valid');
    assert.equal(flags('2001-12', 'YYYY-MM').overflow, -1, 'month 12 valid');
    assert.equal(flags('2001-13', 'YYYY-MM').overflow, 1, 'month 13 invalid');

    //days
    assert.equal(
        flags('2010-01-16', 'YYYY-MM-DD').overflow,
        -1,
        'date 16 valid'
    );
    assert.equal(
        flags('2010-01-0', 'YYYY-MM-DD').overflow,
        2,
        'date 0 invalid'
    );
    assert.equal(
        flags('2010-01-32', 'YYYY-MM-DD').overflow,
        2,
        'date 32 invalid'
    );
    assert.equal(
        flags('2012-02-29', 'YYYY-MM-DD').overflow,
        -1,
        'date leap year valid'
    );
    assert.equal(
        flags('2010-02-29', 'YYYY-MM-DD').overflow,
        2,
        'date leap year invalid'
    );

    //days of the year
    assert.equal(
        flags('2010 300', 'YYYY DDDD').overflow,
        -1,
        'day 300 of year valid'
    );
    assert.equal(
        flags('2010 365', 'YYYY DDDD').overflow,
        -1,
        'day 365 of year valid'
    );
    assert.equal(
        flags('2010 366', 'YYYY DDDD').overflow,
        2,
        'day 366 of year invalid'
    );
    assert.equal(
        flags('2012 366', 'YYYY DDDD').overflow,
        -1,
        'day 366 of leap year valid'
    );
    assert.equal(
        flags('2012 367', 'YYYY DDDD').overflow,
        2,
        'day 367 of leap year invalid'
    );

    //hours
    assert.equal(flags('08', 'HH').overflow, -1, 'hour valid');
    assert.equal(flags('00', 'HH').overflow, -1, 'hour 0 valid');
    assert.equal(flags('25', 'HH').overflow, 3, 'hour 25 invalid');
    assert.equal(flags('24:01', 'HH:mm').overflow, 3, 'hour 24:01 invalid');

    //minutes
    assert.equal(flags('08:15', 'HH:mm').overflow, -1, 'minute valid');
    assert.equal(flags('08:00', 'HH:mm').overflow, -1, 'minute 0 valid');
    assert.equal(flags('08:60', 'HH:mm').overflow, 4, 'minute 60 invalid');

    //seconds
    assert.equal(flags('08:15:12', 'HH:mm:ss').overflow, -1, 'second valid');
    assert.equal(flags('08:15:00', 'HH:mm:ss').overflow, -1, 'second 0 valid');
    assert.equal(
        flags('08:15:60', 'HH:mm:ss').overflow,
        5,
        'second 60 invalid'
    );

    //milliseconds
    assert.equal(
        flags('08:15:12:345', 'HH:mm:ss:SSSS').overflow,
        -1,
        'millisecond valid'
    );
    assert.equal(
        flags('08:15:12:000', 'HH:mm:ss:SSSS').overflow,
        -1,
        'millisecond 0 valid'
    );

    //this is OK because we don't match the last digit, so it's 100 ms
    assert.equal(
        flags('08:15:12:1000', 'HH:mm:ss:SSSS').overflow,
        -1,
        'millisecond 1000 actually valid'
    );
});

test('extra tokens', function (assert) {
    assert.deepEqual(
        flags('1982-05-25', 'YYYY-MM-DD').unusedTokens,
        [],
        'nothing extra'
    );
    assert.deepEqual(
        flags('1982-05', 'YYYY-MM-DD').unusedTokens,
        ['DD'],
        'extra formatting token'
    );
    assert.deepEqual(
        flags('1982', 'YYYY-MM-DD').unusedTokens,
        ['MM', 'DD'],
        'multiple extra formatting tokens'
    );
    assert.deepEqual(
        flags('1982-05', 'YYYY-MM-').unusedTokens,
        [],
        'extra non-formatting token'
    );
    assert.deepEqual(
        flags('1982-05-', 'YYYY-MM-DD').unusedTokens,
        ['DD'],
        'non-extra non-formatting token'
    );
    assert.deepEqual(
        flags('1982 05 1982', 'YYYY-MM-DD').unusedTokens,
        [],
        'different non-formatting token'
    );
});

test('extra tokens strict', function (assert) {
    assert.deepEqual(
        flags('1982-05-25', 'YYYY-MM-DD', true).unusedTokens,
        [],
        'nothing extra'
    );
    assert.deepEqual(
        flags('1982-05', 'YYYY-MM-DD', true).unusedTokens,
        ['-', 'DD'],
        'extra formatting token'
    );
    assert.deepEqual(
        flags('1982', 'YYYY-MM-DD', true).unusedTokens,
        ['-', 'MM', '-', 'DD'],
        'multiple extra formatting tokens'
    );
    assert.deepEqual(
        flags('1982-05', 'YYYY-MM-', true).unusedTokens,
        ['-'],
        'extra non-formatting token'
    );
    assert.deepEqual(
        flags('1982-05-', 'YYYY-MM-DD', true).unusedTokens,
        ['DD'],
        'non-extra non-formatting token'
    );
    assert.deepEqual(
        flags('1982 05 1982', 'YYYY-MM-DD', true).unusedTokens,
        ['-', '-'],
        'different non-formatting token'
    );
});

test('unused input', function (assert) {
    assert.deepEqual(
        flags('1982-05-25', 'YYYY-MM-DD').unusedInput,
        [],
        'normal input'
    );
    assert.deepEqual(
        flags('1982-05-25 this is more stuff', 'YYYY-MM-DD').unusedInput,
        [' this is more stuff'],
        'trailing nonsense'
    );
    assert.deepEqual(
        flags('1982-05-25 09:30', 'YYYY-MM-DD').unusedInput,
        [' 09:30'],
        ['trailing legit-looking input']
    );
    assert.deepEqual(
        flags('1982-05-25 some junk', 'YYYY-MM-DD [some junk]').unusedInput,
        [],
        'junk that actually gets matched'
    );
    assert.deepEqual(
        flags('stuff at beginning 1982-05-25', 'YYYY-MM-DD').unusedInput,
        ['stuff at beginning '],
        'leading junk'
    );
    assert.deepEqual(
        flags('junk 1982 more junk 05 yet more junk25', 'YYYY-MM-DD')
            .unusedInput,
        ['junk ', ' more junk ', ' yet more junk'],
        'interstitial junk'
    );
});

test('unused input strict', function (assert) {
    assert.deepEqual(
        flags('1982-05-25', 'YYYY-MM-DD', true).unusedInput,
        [],
        'normal input'
    );
    assert.deepEqual(
        flags('1982-05-25 this is more stuff', 'YYYY-MM-DD', true).unusedInput,
        [' this is more stuff'],
        'trailing nonsense'
    );
    assert.deepEqual(
        flags('1982-05-25 09:30', 'YYYY-MM-DD', true).unusedInput,
        [' 09:30'],
        ['trailing legit-looking input']
    );
    assert.deepEqual(
        flags('1982-05-25 some junk', 'YYYY-MM-DD [some junk]', true)
            .unusedInput,
        [],
        'junk that actually gets matched'
    );
    assert.deepEqual(
        flags('stuff at beginning 1982-05-25', 'YYYY-MM-DD', true).unusedInput,
        ['stuff at beginning '],
        'leading junk'
    );
    assert.deepEqual(
        flags('junk 1982 more junk 05 yet more junk25', 'YYYY-MM-DD', true)
            .unusedInput,
        ['junk ', ' more junk ', ' yet more junk'],
        'interstitial junk'
    );
});

test('chars left over', function (assert) {
    assert.equal(
        flags('1982-05-25', 'YYYY-MM-DD').charsLeftOver,
        0,
        'normal input'
    );
    assert.equal(
        flags('1982-05-25 this is more stuff', 'YYYY-MM-DD').charsLeftOver,
        ' this is more stuff'.length,
        'trailing nonsense'
    );
    assert.equal(
        flags('1982-05-25 09:30', 'YYYY-MM-DD').charsLeftOver,
        ' 09:30'.length,
        'trailing legit-looking input'
    );
    assert.equal(
        flags('stuff at beginning 1982-05-25', 'YYYY-MM-DD').charsLeftOver,
        'stuff at beginning '.length,
        'leading junk'
    );
    assert.equal(
        flags('1982 junk 05 more junk25', 'YYYY-MM-DD').charsLeftOver,
        [' junk ', ' more junk'].join('').length,
        'interstitial junk'
    );
    assert.equal(
        flags('stuff at beginning 1982 junk 05 more junk25', 'YYYY-MM-DD')
            .charsLeftOver,
        ['stuff at beginning ', ' junk ', ' more junk'].join('').length,
        'leading and interstitial junk'
    );
});

test('empty', function (assert) {
    assert.equal(
        flags('1982-05-25', 'YYYY-MM-DD').empty,
        false,
        'normal input'
    );
    assert.equal(
        flags('nothing here', 'YYYY-MM-DD').empty,
        true,
        'pure garbage'
    );
    assert.equal(
        flags('junk but has the number 2000 in it', 'YYYY-MM-DD').empty,
        false,
        'only mostly garbage'
    );
    assert.equal(flags('', 'YYYY-MM-DD').empty, true, 'empty string');
    assert.equal(flags('', 'YYYY-MM-DD').empty, true, 'blank string');
});

test('null', function (assert) {
    assert.equal(
        flags('1982-05-25', 'YYYY-MM-DD').nullInput,
        false,
        'normal input'
    );
    assert.equal(flags(null).nullInput, true, 'just null');
    assert.equal(flags(null, 'YYYY-MM-DD').nullInput, true, 'null with format');
});

test('invalid month', function (assert) {
    assert.equal(
        flags('1982 May', 'YYYY MMMM').invalidMonth,
        null,
        'normal input'
    );
    assert.equal(
        flags('1982 Laser', 'YYYY MMMM').invalidMonth,
        'Laser',
        'bad month name'
    );
});

test('empty format array', function (assert) {
    assert.equal(
        flags('1982 May', ['YYYY MMM']).invalidFormat,
        false,
        'empty format array'
    );
    assert.equal(
        flags('1982 May', []).invalidFormat,
        true,
        'empty format array'
    );
});

test('weekday mismatch', function (assert) {
    // string with format
    assert.equal(
        flags('Wed 08-10-2017', 'ddd MM-DD-YYYY').weekdayMismatch,
        true,
        'day of week does not match date'
    );
    assert.equal(
        flags('Thu 08-10-2017', 'ddd MM-DD-YYYY').weekdayMismatch,
        false,
        'day of week matches date'
    );
});
