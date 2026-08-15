import { expect, test } from 'vitest';
import isNumber from '../../src/lib/utils/is-number.js';

test('isNumber recognizes numbers', () => {
    expect(isNumber(1), 'simple integer').toBeTruthy();
    expect(isNumber(0), 'simple number').toBeTruthy();
    expect(isNumber(-0), 'silly number').toBeTruthy();
    expect(isNumber(1010010293029), 'large number').toBeTruthy();
    expect(isNumber(Infinity), 'largest number').toBeTruthy();
    expect(isNumber(-Infinity), 'smallest number').toBeTruthy();
    expect(isNumber(NaN), 'not number').toBeTruthy();
    expect(isNumber(1.10039383), 'decimal numbers').toBeTruthy();
    expect(isNumber(Math.LN2), 'natural log of two').toBeTruthy();
    expect(isNumber(Math.PI), 'delicious number').toBeTruthy();
    expect(isNumber(5e10), 'scientifically notated number').toBeTruthy();
    expect(
        isNumber(new Number(1)),
        'number primitive wrapped in an object'
    ).toBeTruthy();
});

test('isNumber rejects non-numbers', () => {
    expect(!isNumber(), 'nothing').toBeTruthy();
    expect(!isNumber(undefined), 'undefined').toBeTruthy();
    expect(!isNumber(null), 'null').toBeTruthy();
    expect(!isNumber([1]), 'array').toBeTruthy();
    expect(!isNumber('[1,2,3]'), 'string').toBeTruthy();
    expect(!isNumber(new Date()), 'date').toBeTruthy();
    expect(!isNumber({ a: 1, b: 2 }), 'object').toBeTruthy();
});
