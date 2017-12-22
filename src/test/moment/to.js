import { module, test, expect } from '../qunit';
import moment from '../../moment';
module('to');


const expiredAt = moment('2017-07-16T21:01:54.249Z');
const now = moment('2017-08-16T00:02:01.249Z');
const tomorrow = moment('2017-08-17T00:02:01.249Z');


test('Expected to be one month ago', function (assert) {
    assert.ok(now.to(expiredAt) === 'a month ago');
    assert.ok(tomorrow.to(expiredAt) === 'a month ago');
    moment.relativeTimeThreshold('d', 180);
    now.to(expiredAt);
    tomorrow.to(expiredAt);
});


test('Expected to be 30 days ago', function (assert) {
    moment.relativeTimeThreshold('d', 180);
    assert.ok(now.to(expiredAt) === '30 days ago');
});


test('Expected to be 31 days ago', function (assert) {
    moment.relativeTimeThreshold('d', 180);

    assert.ok(tomorrow.to(expiredAt) === '31 days ago');
});

test('Expected to be 34 years ago',function (assert) {
    const to = moment('1983-09-20');
    const from = moment('2017-08-23');
    assert.ok(from.to(to) === '34 years ago');
});
