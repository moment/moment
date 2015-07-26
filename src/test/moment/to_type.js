import { module, test } from '../qunit';
import moment from '../../moment';

module('to type');

test('toObject', function (assert) {
    var expected = {
        years:2010,
        months:3,
        date:5,
        hours:15,
        minutes:10,
        seconds:3,
        milliseconds:123
    };
    assert.deepEqual(moment(expected).toObject(), expected, 'toObject invalid');
});

test('toArray', function (assert) {
    var expected = [2014, 11, 26, 11, 46, 58, 17];
    assert.deepEqual(moment(expected).toArray(), expected, 'toArray invalid');
});
