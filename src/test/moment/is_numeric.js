import { module, test } from '../qunit';
import isNumeric from '../../lib/utils/is-numeric.js';

test('isNumeric recognizes numeric things', function (assert) {
    assert.ok(isNumeric(1), 'simple integer');
    assert.ok(isNumeric(0), 'simple number');
    assert.ok(isNumeric(-0), 'silly number');
    assert.ok(isNumeric(1010010293029), 'large number');
    assert.ok(isNumeric(1.100393830000), 'decimal numbers');
    assert.ok(isNumeric(Math.LN2), 'natural log of two');
    assert.ok(isNumeric(Math.PI), 'delicious number');
    assert.ok(isNumeric(5e10), 'scientifically notated number');
});

test('isNumeric rejects non-numeric things', function (assert) {
    assert.ok(!isNumeric(NaN), 'not number');
    assert.ok(!isNumeric(Infinity), 'largest number');
    assert.ok(!isNumeric(-Infinity), 'smallest number');
    assert.ok(!isNumeric(), 'nothing');
    assert.ok(!isNumeric(undefined), 'undefined');
    assert.ok(!isNumeric(null), 'null');
    assert.ok(!isNumeric([1]), 'array');
    assert.ok(!isNumeric('[1,2,3]'), 'string');
    assert.ok(!isNumeric(new Date()), 'date');
    assert.ok(!isNumeric({a:1,b:2}), 'object');
});
