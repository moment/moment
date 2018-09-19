import {module, test} from '../qunit';
import fpMath from '../../lib/utils/fp-math';

module('fpMath');

// function to avoid floating point rounding errors
// https://github.com/moment/moment/issues/2978
// https://github.com/moment/moment/issues/1867
test('js floating point calculations are notEqual for basic math', function(assert) {
    assert.notEqual(0.1 + 0.2, 0.3,  'js: 0.1 + 0.2 !== 0.3');
    assert.notEqual(0.3 - 0.1, 0.2,  'js: 0.3 - 0.1 !== 0.2');
    assert.notEqual(0.1 * 0.2, 0.02, 'js: 0.1 * 0.2 !== 0.02');
    assert.notEqual(0.3 / 0.1, 3,    'js: 0.1 / 0.3 !== 3');
});

test('fpMath floating point calculations are equal for basic math', function(assert) {
    assert.equal(fpMath(0.1, '+', 0.2), 0.3,  'fp: 0.1 + 0.2 === 0.3');
    assert.equal(fpMath(0.3, '-', 0.1), 0.2,  'fp: 0.3 - 0.1 === 0.2');
    assert.equal(fpMath(0.1, '*', 0.2), 0.02, 'fp: 0.1 * 0.2 === 0.02');
    assert.equal(fpMath(0.3, '/', 0.1), 3,    'fp: 0.1 / 0.3 === 3');
});

test('js vs fpMath (more examples)', function(assert) {
    assert.equal(60 * 60 * 1000,              3600000,  'js: int * int works');
    assert.equal(2.3 * 60 * 60 * 1000,        8280000,  'js: fp * int sometimes equal');
    assert.notEqual(2.3 * 3600000,            8280000,  'js: fp * int sometimes notEqual');
    assert.equal(2.3 * 60,                    138,      'js: fp * int sometimes equal');
    assert.notEqual(4.1 * 3600 * 1000,        14760000, 'js: fp * int sometimes notEqual');
    assert.notEqual(4.17123 * 1000 * 60 * 60, 15016428, 'js: fp * int sometimes notEqual');

    assert.equal(fpMath(fpMath(60, '*', 60), '*', 1000),                       3600000,  'fp: int * int works');
    assert.equal(fpMath(fpMath(fpMath(2.3, '*', 60), '*', 60),  '*', 1000),    8280000,  'fp: fp * int always equal');
    assert.equal(fpMath(2.3, '*', 3600000),                                    8280000,  'fp: fp * int always equal');
    assert.equal(fpMath(2.3, '*', 60),                                         138,      'fp: fp * int always equal');
    assert.equal(fpMath(fpMath(4.1, '*', 3600), '*', 1000),                    14760000, 'fp: fp * int always equal');
    assert.equal(fpMath(fpMath(fpMath(4.17123, '*', 1000), '*', 60), '*', 60), 15016428, 'fp: fp * int always equal');
    assert.equal(fpMath(4.17123, '*', 1000),                                   4171.23,  'fp: fp * int always equal');
    assert.equal(fpMath(4171.23, '*', 60),                                     250273.8, 'fp: fp * int always equal');
    assert.equal(fpMath(250273.8, '*', 60),                                    15016428, 'fp: fp * int always equal');
});
