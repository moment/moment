import { module, test } from '../qunit';
import moment from '../../moment';

module('is date');

test('isDate recognizes Date objects', function (assert) {
    assert.ok(moment.isDate(new Date()), 'no args (now)');
    assert.ok(moment.isDate(new Date([2014, 2, 15])), 'array args');
    assert.ok(moment.isDate(new Date('2014-03-15')), 'string args');
    assert.ok(
        moment.isDate(new Date('does NOT look like a date')),
        'invalid date'
    );
});

test('isDate rejects non-Date objects', function (assert) {
    assert.ok(!moment.isDate(), 'nothing');
    assert.ok(!moment.isDate(undefined), 'undefined');
    assert.ok(!moment.isDate(null), 'string args');
    assert.ok(!moment.isDate(42), 'number');
    assert.ok(!moment.isDate('2014-03-15'), 'string');
    assert.ok(!moment.isDate([2014, 2, 15]), 'array');
    assert.ok(!moment.isDate({ year: 2014, month: 2, day: 15 }), 'object');
    assert.ok(
        !moment.isDate({
            toString: function () {
                return '[object Date]';
            },
        }),
        'lying object'
    );
});
