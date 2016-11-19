import { module, test } from '../qunit';
import moment from '../../moment';

module('duration');

test('Basic Use', function (assert) {
    assert.equal(moment.duration(1, 'milliseconds').format('S'), '1');
    assert.equal(moment.duration(1, 'seconds').format('s'), '1');
    assert.equal(moment.duration(1, 'minutes').format('m'), '1');
    assert.equal(moment.duration(1, 'hours').format('h'), '1');
    assert.equal(moment.duration(1, 'hours').format('H'), '1');
    assert.equal(moment.duration(1, 'days').format('d'), '1');
    assert.equal(moment.duration(1, 'days').format('D'), '1');
    assert.equal(moment.duration(1, 'weeks').format('w'), '1');
    assert.equal(moment.duration(1, 'weeks').format('W'), '1');
    assert.equal(moment.duration(1, 'months').format('M'), '1');
    assert.equal(moment.duration(1, 'years').format('y'), '1');
    assert.equal(moment.duration(1, 'years').format('Y'), '1');
});

// test('Trim Left', function (assert) {
//     assert.equal(moment.duration(1, 'seconds').format('m s'), '1');
//     assert.equal(moment.duration(1, 'minutes').format('h m s'), '1 0');
// });

// test('Trim Right', function (assert) {
//     assert.equal(moment.duration(1, 'seconds').format('s m', {trim: 'right'}), '1');
//     assert.equal(moment.duration(1, 'minutes').format('s m h', {trim: 'right'}), '0 1');
// });

test('No trim', function (assert) {
    assert.equal(moment.duration(1, 'seconds').format('m s'), '0 1');
    assert.equal(moment.duration(1, 'minutes').format('h m s'), '0 1 0');
    assert.equal(moment.duration(1, 'seconds').format('mm ss'), '00 01');
    assert.equal(moment.duration(1, 'seconds').format('m ss'), '0 01');
});

test('Token Length', function (assert) {
    assert.equal(moment.duration(1, 'seconds').format('ss'), '01');
    assert.equal(moment.duration(1, 'minutes').format('mm ss'), '01 00');
})

// test('Left Trimmed First Token Length', function (assert) {
//     assert.equal(moment.duration(1, 'seconds').format('mm ss'), '0 01');
//     assert.equal(moment.duration(1, 'seconds').format('m ss'), '1');
//     // assert.equal(moment.duration(1, 'seconds').format('m ss', {forceLength: true}), '01');
// });

// test('Right Trimmed First Token Length', function (assert) {
//     assert.equal(moment.duration(1, 'seconds').format('ss mm', {trim: 'right'}), '01');
//     assert.equal(moment.duration(1, 'seconds').format('ss m', {trim: 'right'}), '1');
//     // assert.equal(moment.duration(1, 'seconds').format('ss m', {trim: 'right', forceLength: true}), '01');
// });

test('Positive Precision', function (assert) {
    assert.equal(moment.duration(15, 'seconds').format('m', 2), '0.25');
    assert.equal(moment.duration(20, 'seconds').format('m', 3), '0.333');
    assert.equal(moment.duration(30, 'seconds').format('m', 4), '0.5000');
    assert.equal(moment.duration(40, 'seconds').format('m', 5), '0.66667');
    assert.equal(moment.duration(59, 'seconds').format('m', 0), '1');
    assert.equal(moment.duration(59, 'seconds').format('m'), '1');
});

test('Negative Precision', function (assert) {
    assert.equal(moment.duration(15, 'seconds').format('s', -1), '20');
    assert.equal(moment.duration(123, 'seconds').format('s', -2), '100');
});

test('Positive Precision with Trunc', function (assert) {
    assert.equal(moment.duration(15, 'seconds').format('m', 2, {trunc: true}), '0.25');
    assert.equal(moment.duration(20, 'seconds').format('m', 3, {trunc: true}), '0.333');
    assert.equal(moment.duration(30, 'seconds').format('m', 4, {trunc: true}), '0.5000');
    assert.equal(moment.duration(40, 'seconds').format('m', 5, {trunc: true}), '0.66666');
    assert.equal(moment.duration(59, 'seconds').format('m', 0, {trunc: true}), '0');
    assert.equal(moment.duration(59, 'seconds').format('m', {trunc: true}), '0');
});

test('Negative Precision with Trunc', function (assert) {
    assert.equal(moment.duration(15, 'seconds').format('s', -1, {trunc: true}), '10');
    assert.equal(moment.duration(159, 'seconds').format('s', -1, {trunc: true}), '150');
});

test('Multiple Token Instances', function (assert) {
    assert.equal(moment.duration(123, 'seconds').format('s s s'), '123 123 123');
    assert.equal(moment.duration(123, 'seconds').format('s s ssssss'), '123 123 000123');
});

test('Escape Tokens', function (assert) {
    assert.equal(moment.duration(123, 'seconds').format('[All] [tokens] [escaped]'), 'All tokens escaped');
    assert.equal(moment.duration(123, 'seconds').format('s[s]'), '123s');
});

test('All Moment Tokens', function (assert) {
    // obviously a duration of 100,000,000,013 ms will vary in the number of days based on leap years, etc.
    // this test ensures the internal duration/format math remains consistent
    // TODO days will fail!
    assert.equal(moment.duration(100000000013, 'ms').format('y[y] M[mo] w[w] h[h] m[m] s[s] S[ms]'), '3y 2mo 0w 9h 46m 40s 13ms');
});

test('Output To Lesser Units', function (assert) {
    assert.equal(moment.duration(1, 'years').format('y'), '1');
    assert.equal(moment.duration(1, 'years').format('M'), '12');
    assert.equal(moment.duration(1, 'years').format('w'), '52');
    assert.equal(moment.duration(1, 'years').format('d'), '365');
    assert.equal(moment.duration(1, 'years').format('h'), '8760');
    assert.equal(moment.duration(1, 'years').format('m'), '525600');
    assert.equal(moment.duration(1, 'years').format('s'), '31536000');
    assert.equal(moment.duration(1, 'years').format('S'), '31536000000');
});

test('Output To Greater Units', function (assert) {
    assert.equal(moment.duration(1, 'milliseconds').format('y', 13), '0.0000000000317');
    assert.equal(moment.duration(1, 'milliseconds').format('M', 12), '0.000000000386');
    assert.equal(moment.duration(1, 'milliseconds').format('w', 11), '0.00000000164');
    assert.equal(moment.duration(1, 'milliseconds').format('d', 10), '0.0000000116');
    assert.equal(moment.duration(1, 'milliseconds').format('h', 9), '0.000000278');
    assert.equal(moment.duration(1, 'milliseconds').format('m', 7), '0.0000167');
    assert.equal(moment.duration(1, 'milliseconds').format('s', 3), '0.001');
    assert.equal(moment.duration(1, 'milliseconds').format('S'), '1');
});

test('Custom Token Types List', function (assert) {
    assert.equal(moment.duration(12345, 'seconds').format('d [days] m [minutes] h [(hours is not a token type now)]', 2, {
        types: 'escape years months weeks days minutes seconds milliseconds general'
    }), '205.75 minutes h (hours is not a token type now)');
});

test('Custom Escape RegExp', function (assert) {
    assert.equal(moment.duration(1234, 'hours').format('d (days), h (hours)', {
        escape: /\((.+?)\)/
    }), '51 days, 10 hours');
});

test('Custom Moment Token RegExp', function (assert) {
    assert.equal(moment.duration(1234, 'days').format('x yrs', {
        years: /x+/,
        seconds: /z+/,
        precision: 2
    }), '3.38 yrs');
});

test('Using Only Settings Argument', function (assert) {
    assert.equal(moment.duration(1234.55, 'hours').format({
        template: 'd (days), h (hours)',
        escape: /\((.+?)\)/,
        precision: 1
    }), '51 days, 10.6 hours');
});

test('Zero Value Duration', function (assert) {
    assert.equal(moment.duration(0, 'minutes').format('m'), '0');
    assert.equal(moment.duration(0, 'minutes').format('mm'), '00');
    assert.equal(moment.duration(0, 'minutes').format('m', -1), '0');
    assert.equal(moment.duration(0, 'minutes').format('mm', -1), '00');
    assert.equal(moment.duration(0, 'minutes').format('m', 1), '0.0');
});

test('Default Template Function', function (assert) {
    assert.equal(moment.duration(100, 'milliseconds').format(), '0');
    assert.equal(moment.duration(100, 'seconds').format(), '1:40');
    assert.equal(moment.duration(100, 'minutes').format(), '1:40');
    assert.equal(moment.duration(100, 'hours').format(), '4d 4h');
    assert.equal(moment.duration(100, 'days').format(), '3m 10d');
    assert.equal(moment.duration(100, 'weeks').format(), '23m 5d');
    assert.equal(moment.duration(100, 'months').format(), '8y 4m');
    assert.equal(moment.duration(100, 'years').format(), '100y');
});

test('Custom Template Function', function (assert) {
    assert.equal(moment.duration(100, 'days').format(function (assert) {
        // map
        function map(array, callback) {
            var index = 0,
                max = array.length,
                ret = [];

            if (!array || !max) {
                return ret;
            }

            while (index < max) {
                ret[index] = callback(array[index], index);
                index += 1;
            }

            return ret;
        }

        var types = this.types,
            dur = this.duration;

        return map(types.slice(1, -2), function (type) {
            return ((type === 'months' || type === 'milliseconds') ? type[0].toUpperCase() : type[0]) + ' [' + type + ']';
        }).join(', ');
    }), '3 months, 1 weeks, 3 days, 0 hours, 0 minutes, 0 seconds');
});

test('Negative Durations', function (assert) {
    assert.equal(moment.duration(-1, 'years').format('y'), '-1');
    assert.equal(moment.duration(-1, 'months').format('M'), '-1');
    assert.equal(moment.duration(-1, 'weeks').format('w'), '-1');
    assert.equal(moment.duration(-1, 'days').format('d'), '-1');
    assert.equal(moment.duration(-1, 'hours').format('h'), '-1');
    assert.equal(moment.duration(-1, 'minutes').format('m'), '-1');
    assert.equal(moment.duration(-1, 'seconds').format('s'), '-1');
    assert.equal(moment.duration(-1, 'milliseconds').format('S'), '-1');
    assert.equal(moment.duration(-1, 'years').format('s'), '-31536000');
    assert.equal(moment.duration(-1, 'seconds').format('y', 10), '-0.0000000317');
    assert.equal(moment.duration(-65, 'seconds').format('m:ss'), '-1:05');
    assert.equal(moment.duration(-65, 'seconds').format('m:ss', 2), '-1:05.00');
    assert.equal(moment.duration(-65.667, 'seconds').format('m:ss', 2), '-1:05.67');
    assert.equal(moment.duration(-65.667, 'days').format('d', 2), '-65.67');
    assert.equal(moment.duration(-65.667, 'days').format('d [days], h [hours]'), '-65 days, 16 hours');
});

test('Negative Durations and Trimming', function (assert) {
    assert.equal(moment.duration(-42, 'seconds').format('h:mm:ss'), '-42');
});

test('Stop Trimming with the * Character', function (assert) {
    assert.equal(moment.duration(15, 'seconds').format('h:*mm:ss'), '0:15');
    // assert.equal(moment.duration(15, 'seconds').format('h:*mm:ss', {forceLength: true}), '00:15');
    assert.equal(moment.duration(15, 'seconds').format('hh:*mm:ss'), '00:15');
    assert.equal(moment.duration(15, 'seconds').format('*h:mm:ss'), '0:00:15');
});

test('Decimal Separator', function (assert) {
    assert.equal(moment.duration(1000, 'seconds').format('h', {precision: 2}), '0.28');
    assert.equal(moment.duration(1000, 'seconds').format('h', {precision: 2, decimalSeparator: ','}), '0,28');
    assert.equal(moment.duration(1000, 'seconds').format('h', {precision: 2, decimalSeparator: 'abc'}), '0abc28');
    assert.equal(moment.duration(1000, 'seconds').format('h', {precision: 2, decimalSeparator: function (assert) {
            return this.template;
        }}), '0h28');
    assert.equal(moment.duration(1000, 'seconds').format('h', {precision: 2, decimalSeparator: function (assert) {
            return 'abc';
        }}), '0abc28');
});
