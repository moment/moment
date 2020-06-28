import { test } from '../qunit';
import isNumber from '../../lib/utils/is-number.js';

test('isNumber recognizes numbers', function (assert) {
    assert.ok(isNumber(1), 'simple integer');
    assert.ok(isNumber(0), 'simple number');
    assert.ok(isNumber(-0), 'silly number');
    assert.ok(isNumber(1010010293029), 'large number');
    assert.ok(isNumber(Infinity), 'largest number');
    assert.ok(isNumber(-Infinity), 'smallest number');
    assert.ok(isNumber(NaN), 'not number');
    assert.ok(isNumber(1.10039383), 'decimal numbers');
    assert.ok(isNumber(Math.LN2), 'natural log of two');
    assert.ok(isNumber(Math.PI), 'delicious number');
    assert.ok(isNumber(5e10), 'scientifically notated number');
    assert.ok(isNumber(new Number(1)), 'number primitive wrapped in an object');
});

test('isNumber rejects non-numbers', function (assert) {
    assert.ok(!isNumber(), 'nothing');
    assert.ok(!isNumber(undefined), 'undefined');
    assert.ok(!isNumber(null), 'null');
    assert.ok(!isNumber([1]), 'array');
    assert.ok(!isNumber('[1,2,3]'), 'string');
    assert.ok(!isNumber(new Date()), 'date');
    assert.ok(!isNumber({ a: 1, b: 2 }), 'object');
});
