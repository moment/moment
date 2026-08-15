import { expect, test } from 'vitest';
import isArray from '../../src/lib/utils/is-array.js';

test('isArray recognizes Array objects', () => {
    expect(isArray([1, 2, 3]), 'array args').toBeTruthy();
    expect(isArray([]), 'empty array').toBeTruthy();
    expect(isArray(new Array(1, 2, 3)), 'array constructor').toBeTruthy();
});

test('isArray rejects non-Array objects', () => {
    expect(!isArray(), 'nothing').toBeTruthy();
    expect(!isArray(undefined), 'undefined').toBeTruthy();
    expect(!isArray(null), 'null').toBeTruthy();
    expect(!isArray(123), 'number').toBeTruthy();
    expect(!isArray('[1,2,3]'), 'string').toBeTruthy();
    expect(!isArray(new Date()), 'date').toBeTruthy();
    expect(!isArray({ a: 1, b: 2 }), 'object').toBeTruthy();
});
