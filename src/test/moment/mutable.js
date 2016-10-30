import { module, test } from '../qunit';
import moment from '../../moment';

module('mutable');

test('manipulation methods', function (assert) {
    var m = moment();

    assert.notEqual(m, moment(m), 'constructor should return a new moment');
    assert.notEqual(m, m.year(2011), 'year() should return a new moment');
    assert.notEqual(m, m.month(1), 'month() should return a new moment');
    assert.notEqual(m, m.hours(7), 'hours() should return a new moment');
    assert.notEqual(m, m.minutes(33), 'minutes() should return a new moment');
    assert.notEqual(m, m.seconds(44), 'seconds() should return a new moment');
    assert.notEqual(m, m.milliseconds(55), 'milliseconds() should return a new moment');
    assert.notEqual(m, m.day(2), 'day() should return a new moment');
    assert.notEqual(m, m.startOf('week'), 'startOf() should return a new moment');
    assert.notEqual(m, m.add(1, 'days'), 'add() should return a new moment');
    assert.notEqual(m, m.subtract(2, 'years'), 'subtract() should return a new moment');
    assert.notEqual(m, m.local(), 'local() should return a new moment');
    assert.notEqual(m, m.utc(), 'utc() should return a new moment');
});
