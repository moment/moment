import { test } from '../qunit';
import isArray from '../../lib/utils/is-array.js';

test('isArray recognizes Array objects', function (assert) {
    assert.ok(isArray([1, 2, 3]), 'array args');
    assert.ok(isArray([]), 'empty array');
    assert.ok(isArray(new Array(1, 2, 3)), 'array constructor');
});

test('isArray rejects non-Array objects', function (assert) {
    assert.ok(!isArray(), 'nothing');
    assert.ok(!isArray(undefined), 'undefined');
    assert.ok(!isArray(null), 'null');
    assert.ok(!isArray(123), 'number');
    assert.ok(!isArray('[1,2,3]'), 'string');
    assert.ok(!isArray(new Date()), 'date');
    assert.ok(!isArray({ a: 1, b: 2 }), 'object');
});
